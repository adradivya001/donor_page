import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DonorExperience from './pages/DonorExperience';
import Campaigns from './pages/Campaigns';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DonorExperience />} />
                <Route path="/campaigns" element={<Campaigns />} />
            </Routes>
        </Router>
    );
}

export default App;
