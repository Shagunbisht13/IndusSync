import React, { useState } from 'react';
import { Clock, Edit, FileUp, Sparkles, Filter, Search, ClipboardList } from 'lucide-react';
import useAppStore from '../store/useAppStore';
import { isToday, isYesterday, formatDistanceToNow, parseISO } from 'date-fns';

export default function AuditLog() {
  const storeLogs = useAppStore(state => state.auditLogs);
  const [filter, setFilter] = useState('all'); // 'all', 'ai', 'manual'
  const [searchTerm, setSearchTerm] = useState('');

  // Filtering
  const filteredLogs = storeLogs.filter(log => {
    if (filter !== 'all' && log.type !== filter) return false;
    if (searchTerm && !log.action.toLowerCase().includes(searchTerm.toLowerCase()) && !log.user.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  // Grouping by Date
  const groupedLogs = filteredLogs.reduce((groups, log) => {
    const date = parseISO(log.time);
    let groupName = 'Older';
    if (isToday(date)) groupName = 'Today';
    else if (isYesterday(date)) groupName = 'Yesterday';
    
    if (!groups[groupName]) groups[groupName] = [];
    groups[groupName].push(log);
    return groups;
  }, {});

  const getLogStyle = (type) => {
    switch (type) {
      case 'ai': return { icon: <Sparkles size={18} className="text-blue-600" />, bgClass: 'bg-blue-50/50', borderClass: 'border-blue-200', textClass: 'text-blue-700', badgeClass: 'bg-blue-100 text-blue-700' };
      case 'upload': return { icon: <FileUp size={18} className="text-emerald-600" />, bgClass: 'bg-emerald-50/50', borderClass: 'border-emerald-200', textClass: 'text-emerald-700', badgeClass: 'bg-emerald-100 text-emerald-700' };
      case 'manual': default: return { icon: <Edit size={18} className="text-amber-600" />, bgClass: 'bg-amber-50/50', borderClass: 'border-amber-200', textClass: 'text-amber-700', badgeClass: 'bg-amber-100 text-amber-700' };
    }
  };

  if (!storeLogs || storeLogs.length === 0) {
    return (
      <div className="fade-in max-w-4xl mx-auto py-8 flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-24 h-24 bg-[var(--bg-hover)] rounded-full flex items-center justify-center mb-6">
          <ClipboardList size={48} className="text-[var(--text-secondary)]" />
        </div>
        <h2 className="text-2xl font-bold mb-2">No Activity Yet</h2>
        <p className="text-[var(--text-secondary)] mb-6 max-w-md">Import data or trigger AI enrichments to start generating an audit trail.</p>
        <a href="/import" className="btn-primary">Import Data</a>
      </div>
    );
  }

  return (
    <div className="fade-in max-w-4xl mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 tracking-tight">Audit Log</h1>
          <p className="text-[var(--text-secondary)] text-lg">History of AI enrichments and manual edits across your organization.</p>
        </div>
        <div className="flex gap-2">
          <div className="search-container mb-0 w-48">
            <Search size={16} />
            <input 
              type="text" 
              placeholder="Search logs..." 
              className="search-bar py-1.5"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="appearance-none bg-[var(--bg-panel)] border border-[var(--border-color)] rounded-xl py-1.5 px-4 focus:outline-none focus:border-[var(--accent)] font-medium cursor-pointer"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Actions</option>
            <option value="ai">Automated (AI)</option>
            <option value="manual">Human (Manual)</option>
          </select>
        </div>
      </div>

      <div className="relative pb-10">
        {/* Vertical Timeline Line */}
        <div className="absolute left-[28px] top-6 bottom-0 w-0.5 bg-gray-200 z-0 hidden sm:block"></div>
        
        {Object.keys(groupedLogs).length === 0 ? (
          <div className="text-center py-12 text-[var(--text-secondary)]">No logs match your filters.</div>
        ) : (
          Object.entries(groupedLogs).map(([dateGroup, logs]) => (
            <div key={dateGroup} className="mb-10 relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="hidden sm:block w-3 h-3 rounded-full bg-gray-300 ml-[23px] outline outline-4 outline-[var(--bg-app)]"></div>
                <h3 className="font-bold text-lg text-[var(--text-primary)]">{dateGroup}</h3>
              </div>
              
              <div className="space-y-6 sm:pl-16">
                {logs.map((log, i) => {
                  const style = getLogStyle(log.type);
                  return (
                    <div key={i} className="flex flex-col sm:flex-row items-start gap-4 group">
                      <div className={`hidden sm:flex shrink-0 mt-1 bg-white p-2.5 rounded-xl border shadow-sm transition-all duration-300 ${style.borderClass} group-hover:shadow-md`}>
                        {style.icon}
                      </div>
                      
                      <div className={`flex-1 border p-5 rounded-2xl shadow-sm transition-shadow duration-300 group-hover:shadow-md ${style.bgClass} ${style.borderClass}`}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                          <p className={`font-semibold text-base ${style.textClass}`}>{log.action}</p>
                          <span className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] bg-white/60 px-2.5 py-1 rounded-full border border-white">
                            <Clock size={12} /> {formatDistanceToNow(parseISO(log.time), { addSuffix: true })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mt-3">
                          <span className="font-medium text-[var(--text-primary)]">Actor: {log.user}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${style.badgeClass}`}>
                            {log.type === 'ai' ? 'Automated' : 'Manual'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
