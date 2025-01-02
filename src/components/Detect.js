
// import React, { useState } from "react";
// import axios from "axios";
// import { Particles } from "react-tsparticles";
// import { loadFull } from "tsparticles";
// import "./Detect.css";


// function Detect() {
//   const [file, setFile] = useState(null);
//   const [anomalyIndices, setAnomalyIndices] = useState([]);
//   const [anomalyPlot, setAnomalyPlot] = useState(null);
//   const [histogramPlot, setHistogramPlot] = useState(null);
//   const [pieChart, setPieChart] = useState(null); // State for pie chart
//   const [isProcessing, setIsProcessing] = useState(false);

//   const particlesInit = async (main) => {
//     await loadFull(main);
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select a file first!");
//       return;
//     }

//     setIsProcessing(true); // Start processing
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setAnomalyIndices(response.data.anomaly_indices);
//       setAnomalyPlot(response.data.anomaly_plot);
//       setHistogramPlot(response.data.histogram_plot);
//       setPieChart(response.data.pie_chart); // Set pie chart
//     } catch (error) {
//       alert("Error uploading file!");
//       console.error(error);
//     } finally {
//       setIsProcessing(false); // Stop processing
//     }
//   };

//   return (
//     <div className="detect-container">
//       <Particles
//         id="tsparticles"
//         init={particlesInit}
//         options={{
//           background: { color: { value: "#101010" } },
//           fpsLimit: 60,
//           particles: {
//             number: { value: 50 },
//             color: { value: "#ffffff" },
//             links: { enable: true, color: "#ffffff", distance: 120 },
//             move: { enable: true, speed: 1 },
//             size: { value: 3 },
//           },
//         }}
//       />
//       <div className="detect-box">
//         <h1>Detect Anomalies</h1>
//         <div className="upload-section">
//           <input type="file" onChange={handleFileChange} />
//           <button onClick={handleUpload}>Upload</button>
//         </div>
//         {isProcessing && <p className="processing">Processing... Please wait.</p>}
//         {!isProcessing && (
//           <div className="dashboard">
//             <div className="dashboard-top">
//               <h2>Detected Anomalies</h2>
//               <div className="anomaly-list">
//                 {anomalyIndices.length > 0 ? (
//                   <p>{anomalyIndices.join(", ")}</p>
//                 ) : (
//                   <p>No anomalies detected yet.</p>
//                 )}
//               </div>
//             </div>
//             <div className="dashboard-grid">
//               <div className="dashboard-item">
//                 <h2>Anomaly Scores</h2>
//                 {anomalyPlot ? (
//                   <img src={`data:image/png;base64,${anomalyPlot}`} alt="Anomaly Scores" />
//                 ) : (
//                   <p>Graph will appear here after upload.</p>
//                 )}
//               </div>
//               <div className="dashboard-item">
//                 <h2>Score Histogram</h2>
//                 {histogramPlot ? (
//                   <img src={`data:image/png;base64,${histogramPlot}`} alt="Score Histogram" />
//                 ) : (
//                   <p>Histogram will appear here after upload.</p>
//                 )}
//               </div>
//               <div className="dashboard-item">
//                 <h2>Anomaly vs Normal Data</h2>
//                 {pieChart ? (
//                   <img src={`data:image/png;base64,${pieChart}`} alt="Pie Chart" />
//                 ) : (
//                   <p>Pie chart will appear here after upload.</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Detect;



import React, { useState } from "react";
import axios from "axios";
import "./Detect.css";

function Detect() {
  const [file, setFile] = useState(null);
  const [anomalyIndices, setAnomalyIndices] = useState([]);
  const [anomalyPlot, setAnomalyPlot] = useState(null);
  const [histogramPlot, setHistogramPlot] = useState(null);
  const [pieChart, setPieChart] = useState(null); // State for pie chart
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    setIsProcessing(true); // Start processing
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAnomalyIndices(response.data.anomaly_indices);
      setAnomalyPlot(response.data.anomaly_plot);
      setHistogramPlot(response.data.histogram_plot);
      setPieChart(response.data.pie_chart); // Set pie chart
    } catch (error) {
      alert("Error uploading file!");
      console.error(error);
    } finally {
      setIsProcessing(false); // Stop processing
    }
  };

  return (
    <div className="detect-container">
      <div className="detect-box">
        <h1>Detect Anomalies</h1>
        <div className="upload-section">
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
        </div>
        {isProcessing && <p className="processing">Processing... Please wait.</p>}
        {!isProcessing && (
          <div className="dashboard">
            <div className="dashboard-top">
              <h2>Detected Anomalies</h2>
              <div className="anomaly-list">
                {anomalyIndices.length > 0 ? (
                  <p>{anomalyIndices.join(", ")}</p>
                ) : (
                  <p>No anomalies detected yet.</p>
                )}
              </div>
            </div>
            <div className="dashboard-grid">
              <div className="dashboard-item">
                <h2>Anomaly Scores</h2>
                {anomalyPlot ? (
                  <img src={`data:image/png;base64,${anomalyPlot}`} alt="Anomaly Scores" />
                ) : (
                  <p>Graph will appear here after upload.</p>
                )}
              </div>
              <div className="dashboard-item">
                <h2>Score Histogram</h2>
                {histogramPlot ? (
                  <img src={`data:image/png;base64,${histogramPlot}`} alt="Score Histogram" />
                ) : (
                  <p>Histogram will appear here after upload.</p>
                )}
              </div>
              <div className="dashboard-item">
                <h2>Anomaly vs Normal Data</h2>
                {pieChart ? (
                  <img src={`data:image/png;base64,${pieChart}`} alt="Pie Chart" />
                ) : (
                  <p>Pie chart will appear here after upload.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Detect;
