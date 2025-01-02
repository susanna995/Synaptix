

// import React, { useState } from 'react';
// import './FileUpload.css'; 
// const FileUpload = ({ onFileUpload }) => {
//     const [file, setFile] = useState(null);

//     const handleFileChange = (event) => {
//         const selectedFile = event.target.files[0];
//         if (selectedFile && selectedFile.name.endsWith('.csv')) {
//             setFile(selectedFile);
//         } else {
//             alert('Please upload a valid CSV file.');
//         }
//     };

//     const handleFileUpload = () => {
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 const fileContent = e.target.result;
//                 onFileUpload(fileContent);
//             };
//             reader.readAsText(file);
//         }
//     };

//     return (
//         <div>
//             <input type="file" accept=".csv" onChange={handleFileChange} />
//             <button onClick={handleFileUpload}>Upload and Start Detection</button>
//         </div>
//     );
// };

// export default FileUpload;

/* <div className="upload-container">
    <h2>Upload Your File</h2>
    <div className="file-input-wrapper">
        <label htmlFor="file-upload">Choose File</label>
        <input type="file" id="file-upload" onChange={handleFileChange} />
        <button className="upload-btn" onClick={handleUpload}>Upload and Start Detection</button>
    </div>
</div> */

import React, { useState } from 'react';
import './FileUpload.css';

const FileUpload = ({ onFileUpload }) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(''); // Add state for file name

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.name.endsWith('.csv')) {
            setFile(selectedFile);
            setFileName(selectedFile.name); // Store the file name
        } else {
            alert('Please upload a valid CSV file.');
        }
    };

    const handleFileUpload = () => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;
                onFileUpload(fileContent);
            };
            reader.readAsText(file);
        } else {
            alert('No file selected. Please choose a CSV file first.');
        }
    };

    return (
        <div className="upload-container">
            <h2>Upload Your File</h2>
            <div className="file-input-wrapper">
                <label htmlFor="file-upload">Choose File</label>
                <input
                    type="file"
                    id="file-upload"
                    accept=".csv"
                    onChange={handleFileChange}
                />
                <button className="upload-btn" onClick={handleFileUpload}>
                    Upload and Start Detection
                </button>
            </div>
            {/* Display the file name below the buttons */}
            {fileName && <p className="file-name">Selected File: {fileName}</p>}
        </div>
    );
};

export default FileUpload;


