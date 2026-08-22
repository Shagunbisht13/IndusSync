import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard Analytics';
      case '/catalog': return 'Parts Catalog';
      case '/import': return 'Bulk Import';
      case '/suppliers': return 'Suppliers Directory';
      case '/audit': return 'Audit Log';
      case '/settings': return 'Settings';
      default: return 'IndusSync';
    }
  };

  return (
    <header className="top-header">
      <div className="header-title">
        <h2>{getPageTitle()}</h2>
      </div>
      
      <div className="header-actions">
        <div className="search-container-small">
          <Search size={16} />
          <input type="text" placeholder="Search anything..." className="search-input-small" />
        </div>
        
        <button className="icon-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>
        
        <div className="user-profile">
          <div className="avatar">
            <User size={18} />
          </div>
          <span className="user-name">Admin</span>
        </div>
      </div>
    </header>
  );
}
