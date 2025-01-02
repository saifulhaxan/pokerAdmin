import React, { useState } from 'react';
import { base_url } from '../../Api/apiConfig';

const ImageUpload = ({ onUpload, title }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const LogoutData = localStorage.getItem('login');

    // Handle file selection
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Optional: Validate file type and size
        if (!file.type.startsWith('image/')) {
            setError('Please select a valid image file.');
            return;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            setError('File size exceeds 5MB.');
            return;
        }

        setSelectedFile(file);
        setError(null); // Clear previous errors

        const formData = new FormData();
        formData.append('file', file);

        try {
            setUploading(true);
            const response = await fetch(`${base_url}image-upload`, {
                method: 'POST',
                body: formData,
                headers: {
                    // 'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${LogoutData}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            onUpload(data); // Pass the response data to the parent
            setSelectedFile(null); // Clear the selected file
        } catch (err) {
            setError('An error occurred during the upload. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input
                type="file"
                id='image'
                className='d-none'
                accept="image/*" // Accepts all image types
                onChange={handleFileChange}
               
            />
            <label for="image"  disabled={uploading}>{title}</label>
            {uploading && <p>Uploading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ImageUpload;
