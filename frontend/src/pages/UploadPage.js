import React, { useState } from 'react';
import axios from 'axios';

export default function UploadPage() {
    // Returns landing page of the app
    const [videoFile, setVideoFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!videoFile) return;

        const formData = new FormData();
        formData.append('video', videoFile);

        try {
            const response = await axios.post('http://localhost:3001/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setMessage("Video uploaded successfully!");
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };


    return (
        <div className="flexBoxColumnGrow background login-page column-center">
            <h1 className="greeting-colour">Video Upload</h1>
            <form className="flexBoxColumnGrow column-center" onSubmit={handleUpload}>
               
                <input id="file-upload" style={{size:"100"}}size="100" type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} />
                
                
                <button className="small-button" type="submit">Upload</button>
                {message && <><p>{message}</p><p>Go to the User page to view and transcode your videos.</p></>}
            </form>
            
        </div>
    );
}