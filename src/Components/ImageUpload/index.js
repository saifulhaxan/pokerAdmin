import React, { useState } from 'react';
import { base_url } from '../../Api/apiConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const ImageUpload = ({ onUpload, title, maxWidth, maxHeight }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const LogoutData = localStorage.getItem('login');

    // Handle file selection
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('Please select a valid image file.');
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
                id="image"
                className="d-none"
                accept="image/*"
                onChange={handleFileChange}
            />
            <label htmlFor="image" className="bg-warning btn" disabled={uploading}>
                {title} <FontAwesomeIcon icon={faUpload} />
            </label>

            {/* Show dynamic recommended image size */}
            {maxWidth && maxHeight && (
                <p>Recommended Image Size: {maxWidth} x {maxHeight}px</p>
            )}

            {uploading && <p>Uploading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ImageUpload;
