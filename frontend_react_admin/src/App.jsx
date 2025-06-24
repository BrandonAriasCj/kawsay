// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Reportes from './pages/Reportes.jsx';
import Horarios from './pages/Horarios.jsx';
import Alertas from './pages/Alertas.jsx';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/horarios" element={<Horarios />} />
          <Route path="/alertas" element={<Alertas />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;