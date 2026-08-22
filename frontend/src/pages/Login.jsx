import React, { useState } from 'react';
import { Database, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAppStore from '../store/useAppStore';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const login = useAppStore(state => state.login);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password.length >= 6) {
      // Mock login validation
      login({
        name: email.split('@')[0],
        email: email,
        role: email.includes('admin') ? 'Admin' : 'Editor'
      });
      toast.success('Logged in successfully!');
      navigate('/');
    } else {
      toast.error('Invalid credentials. Password must be at least 6 characters.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)] fade-in">
      <div className="w-full max-w-md bg-[var(--bg-panel)] p-8 rounded-2xl shadow-lg border border-[var(--border-color)]">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[var(--accent-light)] rounded-2xl flex items-center justify-center mb-4 text-[var(--accent)] shadow-sm">
            <Database size={32} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">IndusSync</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Sign in to your workspace</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-[var(--bg-hover)] border border-[var(--border-color)] rounded-xl px-4 py-2.5 focus:bg-[var(--bg-panel)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)] transition-all outline-none" 
              placeholder="admin@indussync.com" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[var(--bg-hover)] border border-[var(--border-color)] rounded-xl px-4 py-2.5 focus:bg-[var(--bg-panel)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)] transition-all outline-none" 
                placeholder="••••••••" 
              />
              <button 
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              <input type="checkbox" className="rounded border-[var(--border-color)] text-[var(--accent)] focus:ring-[var(--accent-light)]" />
              Remember me
            </label>
            <a href="#" className="text-[var(--accent)] font-medium hover:underline">Forgot Password?</a>
          </div>

          <button type="submit" className="w-full btn-primary justify-center py-3 text-base shadow-md hover:shadow-lg mt-2">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
