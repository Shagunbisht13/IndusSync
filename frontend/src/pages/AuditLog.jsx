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
      <h1 className="text-2xl font-bold mb-2">Audit Log</h1>
      <p className="text-[var(--text-secondary)] mb-8">History of AI enrichments and manual edits across your organization.</p>

      <div className="panel p-0">
        {logs.map((log, i) => (
          <div key={i} className="flex items-start gap-4 p-5 border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--bg-hover)] transition-colors">
            <div className="mt-1 bg-white p-2 rounded-full border border-[var(--border-color)] shadow-sm">
              {log.icon}
            </div>
            <div>
              <p className="font-medium text-[var(--text-primary)]">{log.action}</p>
              <div className="flex items-center gap-3 mt-1 text-sm text-[var(--text-secondary)]">
                <span>By: {log.user}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {log.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
