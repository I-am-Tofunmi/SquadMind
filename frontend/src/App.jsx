import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Connection from './pages/Connection';
import CashFlow from './pages/CashFlow';
import FraudDetection from './pages/FraudDetection';
import Alerts from './pages/Alerts';
import TrustScore from './pages/TrustScore';
import Settings from './pages/Settings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/connect" element={<Connection />} />
      <Route path="/dashboard" element={<Dashboard onLogout={() => {}} onNavigate={() => {}} />} />
      <Route path="/cashflow" element={<CashFlow onLogout={() => {}} onNavigate={() => {}} />} />
      <Route path="/frauddetection" element={<FraudDetection onLogout={() => {}} onNavigate={() => {}} />} />
      <Route path="/alerts" element={<Alerts onLogout={() => {}} onNavigate={() => {}} />} />
      <Route path="/trustscore" element={<TrustScore onLogout={() => {}} onNavigate={() => {}} />} />
      <Route path="/settings" element={<Settings onLogout={() => {}} onNavigate={() => {}} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
