import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Database, Network, BarChart, Settings, FileUp, ClipboardList } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <Database size={24} className="text-accent" />
        <span>IndusSync</span>
      </div>
      
      <div className="nav-group">
        <div className="nav-group-title">Main</div>
        <nav className="nav-tabs">
          <NavLink to="/" end className={({ isActive }) => isActive ? "nav-tab active" : "nav-tab"}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          <NavLink to="/catalog" className={({ isActive }) => isActive ? "nav-tab active" : "nav-tab"}>
            <Database size={18} /> Parts Catalog
          </NavLink>
          <NavLink to="/import" className={({ isActive }) => isActive ? "nav-tab active" : "nav-tab"}>
            <FileUp size={18} /> Bulk Import
          </NavLink>
        </nav>
      </div>

      <div className="nav-group" style={{ marginTop: '2rem' }}>
        <div className="nav-group-title">Network</div>
        <nav className="nav-tabs">
          <NavLink to="/suppliers" className={({ isActive }) => isActive ? "nav-tab active" : "nav-tab"}>
            <Network size={18} /> Suppliers
          </NavLink>
          <NavLink to="/audit" className={({ isActive }) => isActive ? "nav-tab active" : "nav-tab"}>
            <ClipboardList size={18} /> Audit Log
          </NavLink>
        </nav>
      </div>
      
      <div style={{ marginTop: 'auto' }}>
        <nav className="nav-tabs">
          <NavLink to="/settings" className={({ isActive }) => isActive ? "nav-tab active" : "nav-tab"}>
            <Settings size={18} /> Settings
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}
