import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CandidateApplicationForm from './pages/CandidateApplicationForm';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CandidateApplicationForm />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
