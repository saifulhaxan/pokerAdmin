import React, { useState } from 'react';
import { base_url } from '../../Api/apiConfig';

const ImageUpload = ({ onUpload, title, maxWidth, maxHeight }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const LogoutData = localStorage.getItem('login');

    // Validate image dimensions
    const validateImageDimensions = (file) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                if (maxWidth && img.width > maxWidth) {
                    reject(`Image width should not exceed ${maxWidth}px.`);
                } else if (maxHeight && img.height > maxHeight) {
                    reject(`Image height should not exceed ${maxHeight}px.`);
                } else {
                    resolve();
                }
            };
            img.onerror = () => reject('Error loading image.');
        });
    };

    // Handle file selection
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('Please select a valid image file.');
            return;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            setError('File size exceeds 5MB.');
            return;
        }

        try {
            await validateImageDimensions(file);
        } catch (dimensionError) {
            setError(dimensionError);
            return;
        }

        setSelectedFile(file);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            setUploading(true);
            const response = await fetch(`${base_url}image-upload`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${LogoutData}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            onUpload(data);
            setSelectedFile(null);
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
                accept="image/*"
                onChange={handleFileChange}
            />
            <label htmlFor="image" disabled={uploading}>{title}</label>
            <p>Max file size: 5MB{maxWidth && maxHeight ? `, Max dimensions: ${maxWidth} x ${maxHeight}px` : ''}</p>
            {uploading && <p>Uploading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ImageUpload;
