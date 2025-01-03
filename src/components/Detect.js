
// import React, { useState } from "react";
// import axios from "axios";
// import "./Detect.css";

// function Detect() {
//   const [file, setFile] = useState(null);
//   const [anomalyIndices, setAnomalyIndices] = useState([]);
//   const [anomalyPlot, setAnomalyPlot] = useState(null);
//   const [histogramPlot, setHistogramPlot] = useState(null);
//   const [pieChart, setPieChart] = useState(null); // State for pie chart
//   const [isProcessing, setIsProcessing] = useState(false);

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
import jsPDF from "jspdf";
import "./Detect.css";

function Detect() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(""); // New state for file name
  const [anomalyIndices, setAnomalyIndices] = useState([]);
  const [anomalyPlot, setAnomalyPlot] = useState(null);
  const [histogramPlot, setHistogramPlot] = useState(null);
  const [pieChart, setPieChart] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultsReady, setResultsReady] = useState(false);

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.name.endsWith(".csv")) {
      setFile(selectedFile);
      setFileName(selectedFile.name); // Set the file name
    } else {
      alert("Please upload a valid CSV file.");
      setFile(null);
      setFileName(""); // Reset file name
    }
  };

  // Handle file upload
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

      setAnomalyIndices(response.data.anomaly_indices || []);
      setAnomalyPlot(response.data.anomaly_plot || null);
      setHistogramPlot(response.data.histogram_plot || null);
      setPieChart(response.data.pie_chart || null);
      setResultsReady(true); // Enable download button
    } catch (error) {
      alert("Error uploading file!");
      console.error(error);
    } finally {
      setIsProcessing(false); // Stop processing
    }
  };

  // Handle PDF download
  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text("Anomaly Detection Results", 10, 10);

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text("Detected Anomalies:", 10, 20);

    // Add anomaly indices
    const anomalies = anomalyIndices.join(", ");
    pdf.text(anomalies || "No anomalies detected.", 10, 30);

    // Add Anomaly Plot
    if (anomalyPlot) {
      pdf.text("Anomaly Scores:", 10, 50);
      pdf.addImage(`data:image/png;base64,${anomalyPlot}`, "PNG", 10, 60, 180, 60);
    }

    // Add Histogram Plot
    if (histogramPlot) {
      pdf.text("Score Histogram:", 10, 130);
      pdf.addImage(`data:image/png;base64,${histogramPlot}`, "PNG", 10, 140, 180, 60);
    }

    // Add Pie Chart
    if (pieChart) {
      pdf.text("Anomaly vs Normal Data:", 10, 210);
      pdf.addImage(`data:image/png;base64,${pieChart}`, "PNG", 10, 220, 180, 60);
    }

    pdf.save("anomaly_results.pdf");
  };

  return (
    <div className="detect-container">
      <div className="detect-box">
        <h1>Detect Anomalies</h1>
        <div className="upload-section">
          <div className="file-input-wrapper">
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              accept=".csv"
            />
            <label htmlFor="file-upload">Choose File</label>
          </div>
          <div className="file-name">
            {fileName ? `Selected File: ${fileName}` : "No file selected"}
          </div>
          <button onClick={handleUpload} disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Upload"}
          </button>
        </div>
        {isProcessing && <p className="processing">Processing... Please wait.</p>}
        {resultsReady && (
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
              <button
                onClick={handleDownloadPDF}
                className="download-button"
                disabled={!resultsReady}
              >
                Download PDF
              </button>
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