import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Database, Network, BarChart, Settings, FileUp, ClipboardList, Box, ShoppingCart, Users, Cable } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="sidebar overflow-y-auto">
      <div className="brand shrink-0">
        <Database size={24} className="text-[var(--accent)]" />
        <span>IndusSync</span>
      </div>
      
      <div className="space-y-6">
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

        <div className="nav-group">
          <div className="nav-group-title">Inventory</div>
          <nav className="nav-tabs">
            <NavLink to="/inventory" className={({ isActive }) => isActive ? "nav-tab active" : "nav-tab"}>
              <Box size={18} /> Stock Levels
            </NavLink>
            <NavLink to="/pos" className={({ isActive }) => isActive ? "nav-tab active" : "nav-tab"}>
              <ShoppingCart size={18} /> Purchase Orders
            </NavLink>
          </nav>
        </div>

        <div className="nav-group">
          <div className="nav-group-title">Network</div>
          <nav className="nav-tabs">
            <NavLink to="/suppliers" className={({ isActive }) => isActive ? "nav-tab active" : "nav-tab"}>
              <Network size={18} /> Suppliers
            </NavLink>
            <NavLink to="/integrations" className={({ isActive }) => isActive ? "nav-tab active" : "nav-tab"}>
              <Cable size={18} /> Integrations
            </NavLink>
          </nav>
        </div>

        <div className="nav-group">
          <div className="nav-group-title">Team & System</div>
          <nav className="nav-tabs">
            <NavLink to="/analytics" className={({ isActive }) => isActive ? "nav-tab active" : "nav-tab"}>
              <BarChart size={18} /> Analytics
            </NavLink>
            <NavLink to="/audit" className={({ isActive }) => isActive ? "nav-tab active" : "nav-tab"}>
              <ClipboardList size={18} /> Audit Log
            </NavLink>
          </nav>
        </div>
      </div>
      
      <div className="mt-auto pt-6 border-t border-[var(--border-color)]">
        <nav className="nav-tabs">
          <NavLink to="/settings" className={({ isActive }) => isActive ? "nav-tab active" : "nav-tab"}>
            <Settings size={18} /> Settings
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}
