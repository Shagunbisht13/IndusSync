import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useAppStore from './store/useAppStore';

import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Catalog from './pages/Catalog';
import Import from './pages/Import';
import Suppliers from './pages/Suppliers';
import AuditLog from './pages/AuditLog';
import Settings from './pages/Settings';
import Inventory from './pages/Inventory';
import PurchaseOrders from './pages/PurchaseOrders';
import Analytics from './pages/Analytics';
import Integrations from './pages/Integrations';

const ProtectedRoute = ({ children }) => {
  const user = useAppStore(state => state.user);
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ className: 'font-medium shadow-lg' }} />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="import" element={<Import />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="pos" element={<PurchaseOrders />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="audit" element={<AuditLog />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
