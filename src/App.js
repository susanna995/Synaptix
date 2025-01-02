// import React, { useState } from 'react';
// import './App.css'; // Import global styles
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
// import Navbar from './components/Navbar';
// import HomePage from './components/home';
// import AboutPage from './components/About';
// import ContactPage from './components/Contact';
// import UploadPage from './components/Upload';
// import FileUpload from './components/FileUpload';
// import Results from './components/Results';
// import Detect from './components/Detect';

// const App = () => {
   

//     return (
//         <Router>
//             <Navbar />
//             <Routes>
//                 <Route path="/" element={<HomePage />} />
//                 <Route path="/detect" element={<Detect/>} />
//                 <Route path="/about" element={<AboutPage />} />
//                 <Route path="/contact" element={<ContactPage />} />
                
//             </Routes>
//         </Router>
//     );
// };

// export default App;


import React from 'react'; // Removed unused 'useState'
import './App.css'; // Import global styles
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import HomePage from './components/home';
import AboutPage from './components/About';
import ContactPage from './components/Contact';
import Detect from './components/Detect'; // Removed unused imports

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/detect" element={<Detect />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
            </Routes>
        </Router>
    );
};

export default App;
