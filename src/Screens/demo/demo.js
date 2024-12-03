import React, { useState, useEffect } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadInfo, setUploadInfo] = useState('Upload Progress: 0%');
  const [remainingTime, setRemainingTime] = useState(null);
  const clientId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  let eventSource = null;

  const chunkSize = 5 * 1024 * 1024; // 5 MB

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a video file to upload.');
      return;
    }

    const totalChunks = Math.ceil(file.size / chunkSize);
    const fileName = file.name;

    setProgress(0);
    setUploadInfo('Starting upload...');
    setRemainingTime(null);

    const startTime = Date.now(); // Start timing the upload

    // Initialize SSE
    if (!eventSource) {
      eventSource = new EventSource('https://156.67.218.73:3030/lecture-upload/progress');
      eventSource.onmessage = (event) => {
        const progressData = JSON.parse(event.data);
        if (progressData.clientId === clientId) {
          updateProgress(progressData.progress);
        }
      };
    }

    try {
      for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
        const start = chunkIndex * chunkSize;
        const end = Math.min(start + chunkSize, file.size);
        const chunk = file.slice(start, end);

        const chunkStartTime = Date.now(); // Measure time for this chunk
        const success = await uploadChunkWithRetry(chunk, chunkIndex, totalChunks, fileName, clientId);
        if (!success) {
          alert(`Upload failed at chunk ${chunkIndex + 1}. Please try again.`);
          return;
        }

        const chunkEndTime = Date.now();
        const elapsedTime = chunkEndTime - startTime;

        // Calculate average time per chunk
        const avgChunkTime = elapsedTime / (chunkIndex + 1);
        const remainingChunks = totalChunks - (chunkIndex + 1);

        // Estimate remaining time
        const estimatedRemainingTime = avgChunkTime * remainingChunks;

        updateProgress(((chunkIndex + 1) / totalChunks) * 100, estimatedRemainingTime);
      }

      setUploadInfo('Upload complete!');
      setRemainingTime(null);
    } catch (error) {
      console.error('Error during upload:', error);
      setUploadInfo('Upload failed. Please try again.');
    } finally {
      // Close SSE
      if (eventSource) {
        eventSource.close();
        eventSource = null;
      }
    }
  };

  const uploadChunkWithRetry = async (chunk, chunkIndex, totalChunks, fileName, clientId, retries = 3) => {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const formData = new FormData();
        formData.append('file', chunk);
        formData.append('chunkIndex', chunkIndex);
        formData.append('totalChunks', totalChunks);
        formData.append('fileName', fileName);
        formData.append('clientId', clientId);

        const response = await fetch('https://156.67.218.73:3030/lecture-upload/', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Failed to upload chunk ${chunkIndex + 1}`);
        }

        const result = await response.json();

        if (result.success) {
          return true;
        } else {
          throw new Error(result.error || `Unknown error for chunk ${chunkIndex + 1}`);
        }
      } catch (error) {
        console.error(`Error on attempt ${attempt + 1} for chunk ${chunkIndex + 1}:`, error);
      }
    }

    return false;
  };

  const updateProgress = (progressValue, estimatedTime) => {
    setProgress(progressValue);
    setUploadInfo(`Upload Progress: ${progressValue.toFixed(2)}%`);
    if (estimatedTime !== undefined) {
      setRemainingTime(estimatedTime);
    }
  };

  const formatTime = (milliseconds) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    return `${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Video Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Video</button>

      <div style={{
        width: '100%',
        backgroundColor: '#f3f3f3',
        borderRadius: '5px',
        marginTop: '20px',
        overflow: 'hidden',
      }}>
        <div
          style={{
            height: '20px',
            backgroundColor: '#4caf50',
            width: `${progress}%`,
            borderRadius: '5px',
          }}
        ></div>
      </div>
      <div style={{ marginTop: '10px' }}>{uploadInfo}</div>
      {remainingTime !== null && (
        <div style={{ marginTop: '10px' }}>
          Estimated Time Remaining: {formatTime(remainingTime)}
        </div>
      )}

      <video src={`https://res.cloudinary.com/dpjop4dvs/raw/upload/NLHE%20Preflop%20Module%20Raise%20Sizings%20Part%203%20of%2010.mp4?_a=BAMCkGfi0`} type="mp4"></video>
    </div>
  );
};

export default FileUpload;
