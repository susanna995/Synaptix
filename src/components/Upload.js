// import React, { useState } from 'react';
// import FileUpload from './FileUpload';
// import Results from './Results';
// import './Upload.css';

// const UploadPage = () => {
//     const [fileData, setFileData] = useState(null);
//     const [anomalies, setAnomalies] = useState([]);
//     const [chartData, setChartData] = useState(null);

//     const handleFileUpload = (file) => {
//         setFileData(file);
//         processFile(file); // Simulate processing the uploaded file
//     };

//     const processFile = (file) => {
//         // Simulate anomaly detection logic and chart data
//         const simulatedAnomalies = [
//             { time: "2024-12-01", value: 100, type: "outlier" },
//             { time: "2024-12-05", value: 150, type: "outlier" }
//         ];

//         const simulatedChartData = {
//             labels: ["2024-12-01", "2024-12-02", "2024-12-03", "2024-12-04", "2024-12-05"],
//             datasets: [
//                 {
//                     label: "Time Series Data",
//                     data: [120, 130, 115, 140, 100],
//                     borderColor: 'rgba(75, 192, 192, 1)',
//                     fill: false,
//                 }
//             ],
//         };

//         setAnomalies(simulatedAnomalies);
//         setChartData(simulatedChartData);
//     };

//     return (
//         <div className="app">
//         {!fileData ? (
//             <FileUpload onFileUpload={handleFileUpload} />
//         ) : (
//             <Results anomalies={anomalies} chartData={chartData} />
//         )}
//     </div>
//     );
// };

// export default UploadPage;

import React, { useState } from 'react';
import FileUpload from './FileUpload';
import Results from './Results';
import './Upload.css';

const UploadPage = () => {
    const [fileData, setFileData] = useState(null);
    const [anomalies, setAnomalies] = useState([]);
    const [chartData, setChartData] = useState(null);

    const handleFileUpload = (file) => {
        setFileData(file);
        processFile(file);
    };

    const processFile = (file) => {
        // Simulate anomaly detection logic and chart data
        const simulatedAnomalies = [
            { time: "2024-12-01", value: 100, type: "outlier" },
            { time: "2024-12-05", value: 150, type: "outlier" }
        ];

        const simulatedChartData = {
            labels: ["2024-12-01", "2024-12-02", "2024-12-03", "2024-12-04", "2024-12-05"],
            datasets: [
                {
                    label: "Time Series Data",
                    data: [120, 130, 115, 140, 100],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    fill: false,
                }
            ],
        };

        setAnomalies(simulatedAnomalies);
        setChartData(simulatedChartData);
    };

    return (
        <div className="upload-page">
            {!fileData ? (
                <FileUpload onFileUpload={handleFileUpload} />
            ) : (
                <Results anomalies={anomalies} chartData={chartData} />
            )}
        </div>
    );
};

export default UploadPage;
