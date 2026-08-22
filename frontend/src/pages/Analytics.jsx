import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import useAppStore from '../store/useAppStore';
import { Activity, Database, TrendingUp, AlertCircle } from 'lucide-react';

export default function Analytics() {
  const parts = useAppStore(state => state.parts);

  const readyCount = parts.filter(p => p.status === 'export_ready').length;
  const needsFixCount = parts.filter(p => p.status === 'needs_fixing').length;
  const aiFixedCount = parts.filter(p => p.status === 'fixed_by_ai').length;

  const qualityData = [
    { name: 'Export Ready', value: readyCount, color: '#10b981' },
    { name: 'Needs Fix', value: needsFixCount, color: '#ef4444' },
    { name: 'AI Fixed (Review)', value: aiFixedCount, color: '#f59e0b' },
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

  return (
    <div className="fade-in max-w-6xl mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 tracking-tight">Analytics Dashboard</h1>
          <p className="text-[var(--text-secondary)]">Deep dive into your catalog quality and AI performance metrics.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary">Last 7 Days</button>
          <button className="btn-primary">Export Report</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-[var(--bg-panel)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[var(--text-secondary)] font-semibold">Total SKUs</h3>
            <Database size={20} className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold">{parts.length}</p>
          <p className="text-xs text-[var(--success)] mt-2 flex items-center gap-1"><TrendingUp size={12}/> +12% this week</p>
        </div>
        <div className="bg-[var(--bg-panel)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[var(--text-secondary)] font-semibold">Data Quality Score</h3>
            <Activity size={20} className="text-green-500" />
          </div>
          <p className="text-3xl font-bold text-[var(--success)]">{Math.round((readyCount / parts.length) * 100) || 0}%</p>
          <p className="text-xs text-[var(--text-secondary)] mt-2">Export-ready items</p>
        </div>
        <div className="bg-[var(--bg-panel)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[var(--text-secondary)] font-semibold">AI Automation Rate</h3>
            <Activity size={20} className="text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-purple-600">84%</p>
          <p className="text-xs text-[var(--text-secondary)] mt-2">Issues resolved without human</p>
        </div>
        <div className="bg-[var(--bg-panel)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[var(--text-secondary)] font-semibold">Critical Errors</h3>
            <AlertCircle size={20} className="text-red-500" />
          </div>
          <p className="text-3xl font-bold text-red-600">{needsFixCount}</p>
          <p className="text-xs text-[var(--text-secondary)] mt-2">Require manual intervention</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-[var(--bg-panel)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm">
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
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="name" tick={{fontSize: 12, fill: 'var(--text-secondary)'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 12, fill: 'var(--text-secondary)'}} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend />
                <Area type="monotone" dataKey="enriched" name="Successfully Enriched" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorEnriched)" />
                <Area type="monotone" dataKey="flagged" name="Flagged Issues" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorFlagged)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[var(--bg-panel)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm">
          <h3 className="text-lg font-bold mb-6">Catalog Composition</h3>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={qualityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {qualityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
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
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border-color)" />
              <XAxis type="number" tick={{fontSize: 12, fill: 'var(--text-secondary)'}} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={{fontSize: 12, fill: 'var(--text-secondary)'}} axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: 'var(--bg-hover)'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="count" fill="var(--accent)" radius={[0, 4, 4, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
