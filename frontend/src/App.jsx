import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Connection from './pages/Connection';
import CashFlow from './pages/CashFlow';
import FraudDetection from './pages/FraudDetection';
import Alerts from './pages/Alerts';
import TrustScore from './pages/TrustScore';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import { removeToken } from './services/api';

function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/connect" element={<Connection />} />
      <Route 
        path="/dashboard" 
        element={
          <Dashboard 
            onLogout={handleLogout} 
            onNavigate={handleNavigate} 
          />
        } 
      />
      <Route 
        path="/cashflow" 
        element={
          <CashFlow 
            onLogout={handleLogout} 
            onNavigate={handleNavigate} 
          />
        } 
      />
      <Route 
        path="/frauddetection" 
        element={
          <FraudDetection 
            onLogout={handleLogout} 
            onNavigate={handleNavigate} 
          />
        } 
      />
      <Route 
        path="/alerts" 
        element={
          <Alerts 
            onLogout={handleLogout} 
            onNavigate={handleNavigate} 
          />
        } 
      />
      <Route 
        path="/trustscore" 
        element={
          <TrustScore 
            onLogout={handleLogout} 
            onNavigate={handleNavigate} 
          />
        } 
      />
      <Route 
        path="/settings" 
        element={
          <Settings 
            onLogout={handleLogout} 
            onNavigate={handleNavigate} 
          />
        } 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;