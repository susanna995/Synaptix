import React from 'react';
import './About.css';

const About = () => {
    return (
        <section className="about-page">
            <div className="container">
                {/* About Us Section */}
                <div className="section-box">
                    <h2>About Us</h2>
                    <h3>Welcome To Time Series Anomaly Detection Using Transformers!</h3>
                    <p>
                        We are dedicated to revolutionizing anomaly detection in time-series data using  transformer-based models.
                    </p>
                    <p>
                        Our project aims to empower businesses and researchers with accurate, efficient, and interpretable tools for identifying anomalies in diverse datasets.
                    </p>
                </div>

                {/* Our Vision Section */}
                <div className="section-box">
                    <h2>Our Vision</h2>
                    <p>
                        To enhance decision-making and operational efficiency by providing intelligent solutions for detecting and understanding irregular patterns in time-series data.
                    </p>
                </div>

                {/* Our Mission Section */}
                <div className="section-box">
                    <h2>Our Mission</h2>
                    <p>
                        To leverage advanced AI techniques, such as transformers, to tackle complex challenges in anomaly detection while ensuring scalability and adaptability across various domains.
                    </p>
                </div>

                {/* What We Offer Section */}
                <div className="section-box">
                    <h2>What We Offer</h2>
                    <p>State-of-the-Art Models: Utilizing the latest transformer architectures for precise anomaly detection.</p>
                    <p>Intuitive User Interface: Explore and analyze anomalies effortlessly through our React-based front-end.</p>
                </div>

                {/* Why Choose Us Section */}
                <div className="section-box">
                    <h2>Why Choose Us?</h2>
                    <p>
                        Our approach combines deep technical expertise, innovative AI methodologies, and a commitment to creating user-friendly tools.
                    </p>
                </div>

                {/* Technologies Section */}
                <div className="section-box">
                    <h2>Technologies</h2>
                    <p>Backend: Python</p>
                    <p>Frontend: React and JavaScript to create an interactive and dynamic user experience.</p>
                    <p>Visualization Tools: Chart.js for insightful and interactive anomaly visualizations.</p>
                </div>

                {/* Core Features Section */}
                <div className="section-box">
                    <h2>Core Features</h2>
                    <p>Accurate Anomaly Detection: Leverages transformer models for high-precision detection in diverse datasets.</p>
                    <p>Interactive Visualizations: Gain insights through intuitive and detailed data dashboards.</p>
                    <p>Real-Time Monitoring: Identify anomalies as they occur for faster decision-making.</p>
                </div>

                {/* Use Cases Section */}
                <div className="section-box">
                    <h2>Use Cases</h2>
                    <p>Finance: Detect unusual spending patterns or fraudulent transactions.</p>
                    <p>Healthcare: Monitor patient vital signs for irregularities.</p>
                    <p>IoT: Identify sensor failures or irregular equipment behavior.</p>
                    <p>Retail: Track sales trends and spot anomalies in demand forecasting.</p>
                </div>

                {/* Future Goals Section */}
                <div className="section-box">
                    <h2>Future Goals</h2>
                    <p>We aim to continuously enhance and expand our project by:</p>
                        <p>Adding support for additional datasets and anomaly detection algorithms.</p>
                        <p>Incorporating user feedback to improve the front-end experience.</p>
                        <p>Exploring further optimizations to reduce detection latency and enhance scalability.</p>
                </div>
            </div>
        </section>
    );
};

export default About;
