import React, { useState } from 'react';

const FileUpload = () => {
  const chunkSize = 5 * 1024 * 1024; // 5 MB per chunk
  const maxConcurrentUploads = 4; // Max number of concurrent uploads
  const [progress, setProgress] = useState(0);
  const [uploadInfo, setUploadInfo] = useState('Upload Progress: 0%');

  const initiateUpload = async (file) => {
    if (!file) {
      alert('Please select a video file.');
      return;
    }

    const totalChunks = Math.ceil(file.size / chunkSize);

    // Reset progress
    setProgress(0);
    setUploadInfo('Upload Progress: 0%');

    const chunkQueue = [];

    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      const start = chunkIndex * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);

      const chunkFormData = new FormData();
      chunkFormData.append('chunkIndex', chunkIndex);
      chunkFormData.append('totalChunks', totalChunks);
      chunkFormData.append('fileName', file.name);
      chunkFormData.append('file', chunk);

      const uploadTask = () =>
        uploadChunk(chunkFormData, chunkIndex, totalChunks);
      chunkQueue.push(uploadTask);
    }

    while (chunkQueue.length > 0) {
      const batch = chunkQueue.splice(0, maxConcurrentUploads);
      const batchPromises = batch.map((task) => task());
      await Promise.all(batchPromises);
    }
  };

  const uploadChunk = async (formData, chunkIndex, totalChunks) => {
    try {
      const response = await fetch('https://devapi.archcitylms.com/lectures/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Chunk upload failed: ${response.status}`);
      }

      const result = await response.json();
      updateProgress(chunkIndex, totalChunks);
    } catch (error) {
      console.error('Error uploading chunk:', error);
      setUploadInfo('Error uploading video chunk.');
    }
  };

  const updateProgress = (chunkIndex, totalChunks) => {
    const overallProgress = ((chunkIndex + 1) / totalChunks) * 100;
    setProgress(overallProgress);
    setUploadInfo(`Upload Progress: ${overallProgress.toFixed(2)}%`);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) initiateUpload(file);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      <h1>Upload Video in Chunks</h1>
      <input type="file" id="videoInput" accept="video/*" onChange={handleFileChange} />
      <div style={{ marginTop: '20px', width: '100%', backgroundColor: '#f3f3f3', borderRadius: '5px', overflow: 'hidden' }}>
        <div
          style={{
            height: '20px',
            backgroundColor: '#4caf50',
            width: `${progress}%`,
            transition: 'width 0.3s ease',
          }}
        />
      </div>
      <div style={{ marginTop: '10px', fontSize: '16px' }}>{uploadInfo}</div>
    </div>
  );
};

export default FileUpload;
