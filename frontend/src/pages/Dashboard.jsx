import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { completionHistory, errorCategories } from '../data/mockData';
import useAppStore from '../store/useAppStore';
import { CheckCircle, AlertTriangle, Zap, Database, Calendar, Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [dateRange, setDateRange] = useState('Last 7 Days');
  const parts = useAppStore(state => state.parts);

  // Live Metrics from Store
  const totalItems = parts.length;
  const readyCount = parts.filter(p => p.status === 'export_ready').length;
  const needsFixCount = parts.filter(p => p.status === 'needs_fixing').length;
  const aiFixedCount = parts.filter(p => p.status === 'fixed_by_ai').length;

  // Mock recent activity (we'll just take the top 5 parts from store)
  const recentActivity = parts.slice(0, 5);

  return (
    <div className="fade-in max-w-7xl mx-auto py-8">
      
      {/* Header & Date Filter */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 tracking-tight">Overview Dashboard</h1>
          <p className="text-[var(--text-secondary)]">Monitor your catalog enrichment progress and data health.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="appearance-none bg-[var(--bg-panel)] border border-[var(--border-color)] rounded-xl py-2 pl-10 pr-10 shadow-sm focus:outline-none focus:border-[var(--accent)] font-medium cursor-pointer"
            >
              <option>Today</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Quarter</option>
              <option>Year to Date</option>
            </select>
            <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)]" />
          </div>
          <Link to="/import" className="btn-primary">Upload Data</Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-[var(--bg-panel)] rounded-2xl border border-[var(--border-color)] p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="relative z-10">
            <div className="text-[var(--text-secondary)] font-semibold uppercase tracking-wider text-xs mb-1">Total Items</div>
            <div className="text-4xl font-bold text-[var(--text-primary)]">{totalItems.toLocaleString()}</div>
          </div>
          <Database className="absolute right-[-10px] bottom-[-10px] text-[var(--text-secondary)] opacity-10 group-hover:scale-110 transition-transform" size={100} />
        </div>
        
        <div className="bg-[var(--bg-panel)] rounded-2xl border border-[var(--border-color)] p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="relative z-10">
            <div className="text-[var(--text-secondary)] font-semibold uppercase tracking-wider text-xs mb-1">Export Ready</div>
            <div className="text-4xl font-bold text-[var(--success)]">{readyCount.toLocaleString()}</div>
          </div>
          <CheckCircle className="absolute right-[-10px] bottom-[-10px] text-[var(--success)] opacity-10 group-hover:scale-110 transition-transform" size={100} />
        </div>

        <div className="bg-[var(--bg-panel)] rounded-2xl border border-[var(--border-color)] p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="relative z-10">
            <div className="text-[var(--text-secondary)] font-semibold uppercase tracking-wider text-xs mb-1">Needs Fixing</div>
            <div className="text-4xl font-bold text-red-500">{needsFixCount.toLocaleString()}</div>
          </div>
          <AlertTriangle className="absolute right-[-10px] bottom-[-10px] text-red-500 opacity-10 group-hover:scale-110 transition-transform" size={100} />
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="relative z-10">
            <div className="text-blue-600 font-semibold uppercase tracking-wider text-xs mb-1">AI Fixed (Needs Review)</div>
            <div className="text-4xl font-bold text-blue-700">{aiFixedCount.toLocaleString()}</div>
          </div>
          <Zap className="absolute right-[-10px] bottom-[-10px] text-blue-500 opacity-20 group-hover:scale-110 transition-transform" size={100} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Charts */}
        <div className="col-span-2 space-y-6">
          <div className="bg-[var(--bg-panel)] rounded-2xl border border-[var(--border-color)] p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">AI Enrichment Volume ({dateRange})</h3>
            </div>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={completionHistory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="var(--text-secondary)" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                  <YAxis stroke="var(--text-secondary)" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--bg-panel)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="completed" stroke="var(--accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorCompleted)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[var(--bg-panel)] rounded-2xl border border-[var(--border-color)] p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-6">Common Data Anomalies Detected</h3>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={errorCategories} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border-color)" />
                  <XAxis type="number" stroke="var(--text-secondary)" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                  <YAxis dataKey="name" type="category" width={150} stroke="var(--text-secondary)" fontSize={12} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: 'var(--bg-hover)'}} contentStyle={{ backgroundColor: 'var(--bg-panel)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="count" fill="var(--warning)" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="col-span-1">
          <div className="bg-[var(--bg-panel)] rounded-2xl border border-[var(--border-color)] shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2"><Activity size={20} className="text-[var(--accent)]"/> Recent Activity</h3>
            </div>
            
            <div className="p-4 flex-1 overflow-auto">
              <div className="space-y-4">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-[var(--bg-hover)] transition-colors group cursor-pointer">
                    <div className="mt-1">
                      {item.status === 'export_ready' && <CheckCircle size={18} className="text-[var(--success)]" />}
                      {item.status === 'fixed_by_ai' && <Zap size={18} className="text-blue-500" />}
                      {item.status === 'needs_fixing' && <AlertTriangle size={18} className="text-red-500" />}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[var(--text-primary)]">{item.Mfg_Part_Num}</p>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-1">{item.Part_Desc}</p>
                      <p className="text-xs font-medium mt-1">
                        {item.status === 'export_ready' && <span className="text-[var(--success)]">Marked as Ready</span>}
                        {item.status === 'fixed_by_ai' && <span className="text-blue-500">AI Fix Proposed</span>}
                        {item.status === 'needs_fixing' && <span className="text-red-500">Flagged for Errors</span>}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t border-[var(--border-color)] bg-[var(--bg-hover)]">
              <Link to="/catalog" className="w-full btn-secondary flex items-center justify-center gap-2">
                View Full Catalog <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
