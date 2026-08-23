import React, { useState } from 'react';
import { Database, Eye, EyeOff, Sparkles, ShieldCheck, Zap } from 'lucide-react';
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
    <div className="min-h-screen flex bg-white fade-in">
      
      {/* Left Column: Image & Brand */}
      <div className="hidden lg:flex w-1/2 relative bg-[var(--text-primary)] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-[20s] hover:scale-110"
          style={{ backgroundImage: "url('/assets/bg-industry.jpg')" }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent" />
        
        <div className="relative z-10 p-12 flex flex-col justify-between h-full w-full">
          <div className="brand text-white text-2xl font-bold flex items-center gap-3">
            <Database size={32} className="text-blue-400" />
            <span>IndusSync</span>
          </div>

          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              Clean, enrich, and manage<br />industrial parts data with AI.
            </h1>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-300">
                <Sparkles className="text-blue-400 shrink-0" size={20} />
                <span>Automated AI data enrichment and taxonomy</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Zap className="text-blue-400 shrink-0" size={20} />
                <span>Real-time anomaly detection and fixes</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <ShieldCheck className="text-blue-400 shrink-0" size={20} />
                <span>Enterprise-grade audit logging & security</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-[var(--bg-main)]">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex justify-center mb-8">
            <div className="w-16 h-16 bg-[var(--accent-light)] rounded-2xl flex items-center justify-center text-[var(--accent)] shadow-sm">
              <Database size={32} />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Welcome back</h2>
          <p className="text-[var(--text-secondary)] mb-4">Please enter your details to sign in to your workspace.</p>
          <div className="bg-blue-50 text-blue-800 text-sm p-3 rounded-lg border border-blue-200 mb-8 flex items-start gap-2">
            <span className="font-semibold shrink-0">Note:</span>
            <span>This is a prototype. You can log in with any email and password (min 6 characters) for now.</span>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white border border-[var(--border-color)] rounded-xl px-4 py-3 focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-light)] transition-all outline-none shadow-sm" 
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
                  className="w-full bg-white border border-[var(--border-color)] rounded-xl px-4 py-3 focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-light)] transition-all outline-none shadow-sm" 
                  placeholder="••••••••" 
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-2 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                <input type="checkbox" className="rounded border-[var(--border-color)] text-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)] w-4 h-4" />
                Remember me
              </label>
              <a href="#" className="text-[var(--accent)] font-medium hover:underline">Forgot Password?</a>
            </div>

            <button type="submit" className="w-full btn-primary justify-center py-3 text-base shadow-md hover:shadow-lg mt-4 h-12">
              Sign In
            </button>
            
            <div className="text-center mt-6 text-sm text-[var(--text-secondary)]">
              Don't have an account? <a href="#" className="text-[var(--accent)] font-medium hover:underline">Request access</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
