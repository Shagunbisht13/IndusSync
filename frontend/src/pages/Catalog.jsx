import React, { useState } from 'react';
import useAppStore from '../store/useAppStore';
import { Search, Filter, ChevronLeft, ChevronRight, CheckCircle, AlertTriangle, Zap, X } from 'lucide-react';
import ItemDrawer from '../components/ItemDrawer';
import toast from 'react-hot-toast';

export default function Catalog() {
  const { parts, updatePartStatus } = useAppStore(state => ({ parts: state.parts, updatePartStatus: state.updatePartStatus }));
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const itemsPerPage = 10;

  const filteredData = parts.filter(item => 
    item.Mfg_Part_Num.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.Part_Desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.Part_Manuf.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'export_ready':
        return <span className="badge success"><CheckCircle size={14} className="mr-1"/> Ready</span>;
      case 'fixed_by_ai':
        return <span className="badge warning" style={{backgroundColor: '#e0f2fe', color: '#0284c7'}}><Zap size={14} className="mr-1"/> AI Fixed</span>;
      case 'needs_fixing':
        return <span className="badge error"><AlertTriangle size={14} className="mr-1"/> Needs Fix</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  const handleFixWithAI = (e, item) => {
    e.stopPropagation();
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)),
      {
        loading: 'Running AI enrichment...',
        success: () => {
          updatePartStatus(item.id, 'fixed_by_ai');
          return `Successfully enriched ${item.Mfg_Part_Num}`;
        },
        error: 'Failed to enrich data.',
      }
    );
  };

  return (
    <div className="fade-in">
      <div className="panel flex flex-col h-[calc(100vh-12rem)]">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--border-color)]">
          <div className="search-container mb-0 w-1/3">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search MPN, description, or manufacturer..." 
              className="search-bar"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <button className="btn-secondary">
            <Filter size={16} /> Filter
          </button>
        </div>

        {/* Table */}
        <div className="data-table-container flex-1 overflow-auto">
          <table>
            <thead className="sticky top-0 bg-[var(--bg-hover)] z-10 shadow-sm">
              <tr>
                <th>Status</th>
                <th>Part Number</th>
                <th>Description</th>
                <th>Manufacturer</th>
                <th>Errors</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id} onClick={() => setSelectedItem(item)}>
                  <td>{getStatusBadge(item.status)}</td>
                  <td className="font-mono font-semibold text-sm">{item.Mfg_Part_Num}</td>
                  <td className="max-w-md truncate">{item.Part_Desc}</td>
                  <td>{item.Part_Manuf}</td>
                  <td>
                    {item.errors.length > 0 ? (
                      <span className="text-[var(--error)] text-sm font-medium flex items-center gap-1">
                        <AlertTriangle size={14}/> {item.errors.length} Issue{item.errors.length > 1 ? 's' : ''}
                      </span>
                    ) : (
                      <span className="text-[var(--success)] text-sm font-medium flex items-center gap-1">
                        <CheckCircle size={14}/> Clean
                      </span>
                    )}
                  </td>
                  <td>
                    {item.status === 'needs_fixing' && (
                      <button 
                        onClick={(e) => handleFixWithAI(e, item)}
                        className="btn-secondary text-xs py-1 px-2 flex items-center gap-1 border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-colors"
                      >
                        <Zap size={12} /> Fix
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-[var(--text-secondary)]">
                    No parts found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-[var(--border-color)] bg-[var(--bg-panel)]">
          <div className="text-sm text-[var(--text-secondary)]">
            Showing {filteredData.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
          </div>
          <div className="flex items-center gap-2">
            <button 
              className="btn-icon" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm font-medium px-2">Page {currentPage} of {totalPages || 1}</span>
            <button 
              className="btn-icon" 
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <ItemDrawer item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
