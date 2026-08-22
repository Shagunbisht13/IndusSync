import React from 'react';
import { Clock, Edit, FileUp, Sparkles } from 'lucide-react';

export default function AuditLog() {
  const logs = [
    { type: 'ai', action: 'AI Enriched Part P-1001', user: 'System', time: '10 mins ago', icon: <Sparkles size={16} className="text-blue-500"/> },
    { type: 'manual', action: 'Admin approved classification for P-1012', user: 'Admin', time: '1 hour ago', icon: <Edit size={16} className="text-orange-500"/> },
    { type: 'upload', action: 'New batch uploaded from Fastenal', user: 'John Doe', time: 'Yesterday', icon: <FileUp size={16} className="text-green-500"/> },
    { type: 'ai', action: 'AI Enriched Part P-1003', user: 'System', time: 'Yesterday', icon: <Sparkles size={16} className="text-blue-500"/> },
    { type: 'ai', action: 'AI Enriched Part P-1016', user: 'System', time: '2 days ago', icon: <Sparkles size={16} className="text-blue-500"/> }
  ];

  return (
    <div className="fade-in max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 tracking-tight">Audit Log</h1>
          <p className="text-[var(--text-secondary)] text-lg">History of AI enrichments and manual edits across your organization.</p>
        </div>
      </div>

      <div className="panel p-8 relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-12 top-10 bottom-10 w-0.5 bg-[var(--border-color)] z-0 hidden md:block"></div>
        
        <div className="space-y-8 relative z-10">
          {logs.map((log, i) => (
            <div key={i} className="flex flex-col md:flex-row items-start gap-6 group">
              <div className="hidden md:flex shrink-0 mt-1 bg-white p-3 rounded-2xl border border-[var(--border-color)] shadow-sm group-hover:shadow-md group-hover:border-[var(--accent)] transition-all duration-300">
                {log.icon}
              </div>
              
              <div className="flex-1 bg-white border border-[var(--border-color)] p-5 rounded-2xl shadow-sm group-hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                  <p className="font-semibold text-[var(--text-primary)] text-base">{log.action}</p>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] bg-[var(--bg-hover)] px-2.5 py-1 rounded-full">
                    <Clock size={12} /> {log.time}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                  <span className="font-medium text-[var(--text-primary)]">By: {log.user}</span>
                  {log.type === 'ai' && (
                    <span className="text-[var(--accent)] bg-[var(--accent-light)] px-2 py-0.5 rounded text-xs font-semibold">Automated</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
