import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import useAppStore from '../store/useAppStore';
import { Activity, Database, TrendingUp, AlertCircle, Info, Inbox } from 'lucide-react';

// Simple hover tooltip component for microcopy
const InfoTooltip = ({ text }) => (
  <div className="group relative flex items-center">
    <Info size={14} className="text-[var(--text-secondary)] hover:text-[var(--accent)] cursor-help transition-colors" />
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 text-center shadow-xl">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
    </div>
  </div>
);

export default function Analytics() {
  const parts = useAppStore(state => state.parts);

  if (!parts || parts.length === 0) {
    return (
      <div className="fade-in max-w-6xl mx-auto py-8 flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-24 h-24 bg-[var(--bg-hover)] rounded-full flex items-center justify-center mb-6">
          <Inbox size={48} className="text-[var(--text-secondary)]" />
        </div>
        <h2 className="text-2xl font-bold mb-2">No Data Available</h2>
        <p className="text-[var(--text-secondary)] mb-6 max-w-md">Upload a catalog to start tracking data quality and AI enrichment performance metrics.</p>
        <a href="/import" className="btn-primary">Upload Catalog Data</a>
      </div>
    );
  }

  const readyCount = parts.filter(p => p.status === 'export_ready').length;
  const needsFixCount = parts.filter(p => p.status === 'needs_fixing').length;
  const aiFixedCount = parts.filter(p => p.status === 'fixed_by_ai').length;

  const qualityData = [
    { name: 'Export Ready', value: readyCount, color: '#10b981' },
    { name: 'Needs Fix', value: needsFixCount, color: '#ef4444' },
    { name: 'AI Fixed', value: aiFixedCount, color: '#f59e0b' },
  ];

  const processingData = [
    { name: 'Mon', enriched: 120, flagged: 45 },
    { name: 'Tue', enriched: 180, flagged: 30 },
    { name: 'Wed', enriched: 250, flagged: 55 },
    { name: 'Thu', enriched: 210, flagged: 20 },
    { name: 'Fri', enriched: 300, flagged: 60 },
    { name: 'Sat', enriched: 90, flagged: 15 },
    { name: 'Sun', enriched: 40, flagged: 5 },
  ];

  const categoryData = [
    { name: 'Fasteners', count: 450 },
    { name: 'Bearings', count: 320 },
    { name: 'Valves', count: 210 },
    { name: 'Motors', count: 180 },
    { name: 'Sensors', count: 150 },
  ];

  // Custom label for Pie chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null; // Don't show label for very small slices
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-xs font-bold shadow-sm">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="fade-in max-w-7xl mx-auto py-8 space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 tracking-tight">Analytics Dashboard</h1>
          <p className="text-[var(--text-secondary)]">Monitor catalog health and AI performance metrics.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary">Last 7 Days</button>
          <button className="btn-primary">Export Report</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-[var(--bg-panel)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[var(--text-secondary)] font-semibold">Total SKUs</h3>
            <Database size={20} className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold">{parts.length}</p>
          <p className="text-xs text-[var(--success)] mt-2 flex items-center gap-1"><TrendingUp size={12}/> +12% this week</p>
        </div>
        
        {/* Healthy Card */}
        <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-emerald-800 font-semibold">Data Quality Score</h3>
            <Activity size={20} className="text-emerald-500" />
          </div>
          <p className="text-3xl font-bold text-emerald-600">{Math.round((readyCount / parts.length) * 100) || 0}%</p>
          <p className="text-xs text-emerald-700/70 mt-2 font-medium">Export-ready items</p>
        </div>
        
        {/* Accent/Info Card */}
        <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-purple-800 font-semibold">AI Automation Rate</h3>
              <InfoTooltip text="Percentage of data anomalies resolved autonomously by AI without manual intervention." />
            </div>
            <Activity size={20} className="text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-purple-600">84%</p>
          <p className="text-xs text-purple-700/70 mt-2 font-medium">Issues resolved autonomously</p>
        </div>
        
        {/* Urgent/Critical Card */}
        <div className="bg-rose-50 p-6 rounded-2xl border border-rose-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-rose-800 font-bold">Critical Errors</h3>
            <AlertCircle size={20} className="text-rose-500" />
          </div>
          <p className="text-3xl font-bold text-rose-600">{needsFixCount}</p>
          <p className="text-xs text-rose-700/80 mt-2 font-medium">Require manual intervention</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[var(--bg-panel)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm">
          <h3 className="text-lg font-bold mb-6">Enrichment Volume (Last 7 Days)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={processingData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEnriched" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorFlagged" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" strokeOpacity={0.4} />
                <XAxis dataKey="name" tick={{fontSize: 12, fill: 'var(--text-secondary)'}} axisLine={false} tickLine={false} dy={10} />
                <YAxis tick={{fontSize: 12, fill: 'var(--text-secondary)'}} axisLine={false} tickLine={false} dx={-10} />
                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="top" height={36} wrapperStyle={{ paddingBottom: '20px' }} iconType="circle"/>
                <Area type="monotone" dataKey="enriched" name="Successfully Enriched" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorEnriched)" />
                <Area type="monotone" dataKey="flagged" name="Flagged Issues" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorFlagged)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[var(--bg-panel)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm flex flex-col">
          <h3 className="text-lg font-bold mb-2">Catalog Composition</h3>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={qualityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {qualityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="bg-[var(--bg-panel)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm">
        <h3 className="text-lg font-bold mb-6">Top Product Categories</h3>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border-color)" strokeOpacity={0.4} />
              <XAxis type="number" tick={{fontSize: 12, fill: 'var(--text-secondary)'}} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={{fontSize: 12, fill: 'var(--text-secondary)'}} axisLine={false} tickLine={false} dx={-10} />
              <RechartsTooltip cursor={{fill: 'var(--bg-hover)'}} contentStyle={{ borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="count" fill="var(--accent)" radius={[0, 4, 4, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
