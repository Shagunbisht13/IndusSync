import React from 'react';
import { Bell, Search, User, LogOut } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAppStore from '../store/useAppStore';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAppStore(state => ({ user: state.user, logout: state.logout }));
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard Analytics';
      case '/catalog': return 'Parts Catalog';
      case '/import': return 'Bulk Import';
      case '/inventory': return 'Inventory & Stock';
      case '/pos': return 'Purchase Orders';
      case '/suppliers': return 'Suppliers Directory';
      case '/audit': return 'Audit Log';
      case '/settings': return 'Settings';
      default: return 'IndusSync';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="top-header">
      <div className="header-title">
        <h2>{getPageTitle()}</h2>
      </div>
      
      <div className="header-actions">
        <div className="search-container-small hidden md:block">
          <Search size={16} />
          <input type="text" placeholder="Search anything (Cmd+K)..." className="search-input-small" />
        </div>
        
        <button className="icon-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>
        
        <div className="flex items-center gap-4 pl-4 border-l border-[var(--border-color)]">
          <div className="user-profile">
            <div className="avatar text-sm font-bold">
              {user?.name?.charAt(0).toUpperCase() || <User size={16} />}
            </div>
            <div className="hidden sm:block">
              <span className="user-name block leading-tight">{user?.name || 'Admin'}</span>
              <span className="text-xs text-[var(--text-secondary)] block">{user?.role || 'User'}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="icon-btn text-[var(--text-secondary)] hover:text-[var(--error)] transition-colors" title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
