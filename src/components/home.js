// import React from 'react';
// import './home.css';
// import { Link } from 'react-router-dom';

// const HomePage = () => {
//     return (
//         <div className="home-container">
//             {/* Navigation Bar */}
//             <nav className="navbar">
//                 <ul>
//                     <li><Link to="/" aria-label="Home">Home</Link></li>
//                     <li><Link to="/detect" aria-label="Home">Detect</Link></li>
//                     <li><Link to="/about" aria-label="About">About</Link></li>
//                     <li><Link to="/contact" aria-label="Contact">Contact</Link></li>
//                 </ul>
//             </nav>

//             {/* Main Content */}
//             <div className="content">
//                 <h1>Welcome to Time Series Anomaly Detection</h1>
//                 <p>
//                     Our platform uses state-of-the-art transformer-based models to detect anomalies in time series data.
//                 </p>
//                 <div className="cta">
//                     <p>Start detecting anomalies in your data today.</p>
//                     <Link to="/upload" aria-label="Get Started">
//                         <button>Get Started</button>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HomePage;

import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="home-container">
            {/* Navigation Bar */}
            <nav className="navbar">
                <ul>
                    <li><Link to="/" aria-label="Home">Home</Link></li>
                    <li><Link to="/detect" aria-label="Home">Detect</Link></li>
                    <li><Link to="/about" aria-label="About">About</Link></li>
                    <li><Link to="/contact" aria-label="Contact">Contact</Link></li>
                </ul>
            </nav>

            {/* Main Content */}
            <div className="content">
                <h1>Welcome to Time Series Anomaly Detection</h1>
                <p>
                    Our platform uses state-of-the-art transformer-based model to detect anomalies in time series data.
                </p>
                <div className="cta">
                    <p>Start detecting anomalies in your data today.</p>
                    <Link to="/detect" aria-label="Get Started">
                        <button>Get Started</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
