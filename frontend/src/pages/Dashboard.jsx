import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { summaryStats, completionHistory, topManufacturers, errorCategories } from '../data/mockData';
import { CheckCircle, AlertTriangle, Zap, Database } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="fade-in">
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-title">Total Items</div>
          <div className="metric-value">{summaryStats.totalItems}</div>
          <Database className="metric-icon" size={48} />
        </div>
        <div className="metric-card">
          <div className="metric-title">Fixed by AI</div>
          <div className="metric-value text-success">{summaryStats.fixedByAi}</div>
          <Zap className="metric-icon text-success" size={48} />
        </div>
        <div className="metric-card">
          <div className="metric-title">Needs Fixing</div>
          <div className="metric-value text-warning">{summaryStats.needsFixing}</div>
          <AlertTriangle className="metric-icon text-warning" size={48} />
        </div>
        <div className="metric-card">
          <div className="metric-title">Export Ready</div>
          <div className="metric-value text-accent">{summaryStats.exportReady}</div>
          <CheckCircle className="metric-icon text-accent" size={48} />
        </div>
      </div>

      <div className="charts-grid">
        <div className="panel p-6">
          <h3 className="mb-4 text-lg font-semibold">AI Enrichment Completion (Last 7 Days)</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={completionHistory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-panel)', borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }}
                />
                <Area type="monotone" dataKey="completed" stroke="var(--accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorCompleted)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel p-6">
          <h3 className="mb-4 text-lg font-semibold">Common Data Errors</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={errorCategories} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border-color)" />
                <XAxis type="number" stroke="var(--text-secondary)" />
                <YAxis dataKey="name" type="category" width={150} stroke="var(--text-secondary)" fontSize={12} />
                <Tooltip cursor={{fill: 'var(--bg-hover)'}} contentStyle={{ backgroundColor: 'var(--bg-panel)', borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                <Bar dataKey="count" fill="var(--warning)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
