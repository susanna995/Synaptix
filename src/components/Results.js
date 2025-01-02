// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import './Results.css';
// import {
//     Chart as ChartJS,
//     LineElement,
//     PointElement,
//     LinearScale,
//     Title,
//     Tooltip,
//     Legend,
//     CategoryScale,
// } from 'chart.js';

// ChartJS.register(
//     LineElement,
//     PointElement,
//     LinearScale,
//     Title,
//     Tooltip,
//     Legend,
//     CategoryScale
// );


// const Results = ({ anomalies, chartData }) => {
//     return (
//         <div>
//             <h2>Detection Results</h2>
//             <div>
//                 <Line data={chartData} />
//             </div>
//             <h3>Anomaly Details</h3>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Time</th>
//                         <th>Value</th>
//                         <th>Type</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {anomalies.map((anomaly, index) => (
//                         <tr key={index}>
//                             <td>{anomaly.time}</td>
//                             <td>{anomaly.value}</td>
//                             <td>{anomaly.type}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <button onClick={() => downloadResults(anomalies)}>Download Results</button>
//         </div>
//     );
// };

// const downloadResults = (anomalies) => {
//     const csvContent = "data:text/csv;charset=utf-8," 
//         + "Time,Value,Type\n"
//         + anomalies.map(a => `${a.time},${a.value},${a.type}`).join("\n");

//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "anomaly_results.csv");
//     document.body.appendChild(link);
//     link.click();
// };

// export default Results;

import React from 'react';
import { Line } from 'react-chartjs-2';
import './Results.css';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
} from 'chart.js';

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    CategoryScale
);

const Results = ({ anomalies, chartData }) => {
    const downloadResults = () => {
        const csvContent =
            "Time,Value,Type\n" +
            anomalies.map((a) => `${a.time},${a.value},${a.type}`).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'anomaly_results.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="results">
            <div className="results-container">
                {/* Detection Results Section */}
                <h2>Detection Results</h2>
                <div className="chart-container">
                    <Line data={chartData} />
                </div>

                {/* Anomaly Details Section */}
                <div className="details-container">
                    <h3>Anomaly Details</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Value</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {anomalies.map((anomaly, index) => (
                                <tr key={index}>
                                    <td>{anomaly.time}</td>
                                    <td>{anomaly.value}</td>
                                    <td>{anomaly.type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={downloadResults}>Download Results</button>
                </div>
            </div>
        </div>
    );
};

export default Results;

