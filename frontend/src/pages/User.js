import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserPage({ userId }) {
    const [videos, setVideos] = useState([]);
    const [message, setMessage] = useState("");
    const [selectedVideo, setSelectedVideo] = useState("");
    const [selectedFormat, setSelectedFormat] = useState("mp4");

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/user`);
                setVideos(response.data.videos);
            } catch (error) {
                console.error("Error fetching videos:", error);
                setMessage("Failed to load videos.");
            }
        };
        fetchVideos();
    }, []);

    const handleTranscode = async () => {
        if (!selectedVideo) {
            setMessage("Please select a video to transcode.");
            return;
        }
        try {
            const response = await axios.post(`http://localhost:3001/transcode`, {
                videoId: selectedVideo,
                format: selectedFormat,
            },
                { responseType: "blob" }
            );

            // Create a link element to download the file
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `transcoded_video.${selectedFormat}`); // Set file name
            document.body.appendChild(link);
            link.click();
            setMessage("Video transcoded and download started.");
            document.body.removeChild(link); // Clean up
        } catch (error) {
            console.error("Error transcoding video:", error);
            setMessage("Failed to transcode video.");
        }
    };


    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete('http://localhost:3001/delete');
            setMessage("Videos deleted successfully!");
            setVideos([]);
        } catch (error) {
            console.error("Error deleting all videos:", error);
            alert("Failed to delete videos.");
        }

    };
    /* <p>
                            <strong>Filename:</strong> {video.filename} <br />
                            <strong>Size:</strong> {video.size} bytes <br />
                            <strong>Duration:</strong> {video.duration} seconds
                        </p>*/

    return (
        <div className="flexBoxColumnGrow landing-page background column-center">
            <div className="flexBowColumnGrow column-center">
                <h1 className="greeting column-center">Video List</h1>
            </div>
            {message && <p>{message}</p>}
            <ul>
                {videos.map((video) => (
                    <li key={video.id}>
                        {video.filename}
                        <button style={{marginLeft:"20px"}}className="small-button" onClick={() => setSelectedVideo(video.id)}>Select</button>
                    </li>
                ))}
            </ul>

            {selectedVideo && (
        <div>
          <label htmlFor="format">Choose a format:</label>
          <select
            id="format"
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
          >
            <option value="mp4">MP4</option>
            <option value="avi">AVI</option>
            <option value="mov">MOV</option>
          </select>
          <button className="small-button" style={{marginLeft:"20px"}} onClick={handleTranscode}>Transcode and Download</button>
        </div>
      )}

      <button style={{marginTop:"20px"}} className="small-button" onClick={handleDelete}>Delete All Uploads</button>
        </div >
    )
}