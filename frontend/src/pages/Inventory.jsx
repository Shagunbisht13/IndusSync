import React, { useState } from 'react';
import useAppStore from '../store/useAppStore';
import { Package, AlertTriangle, ArrowUpRight, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Inventory() {
  const parts = useAppStore(state => state.parts);
  const [searchTerm, setSearchTerm] = useState('');

  // Generate mock inventory data for parts that are export_ready
  const inventoryItems = parts
    .filter(p => p.status === 'export_ready' && (
      p.Mfg_Part_Num.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.Part_Desc.toLowerCase().includes(searchTerm.toLowerCase())
    ))
    .map(p => ({
      ...p,
      stock: Math.floor(Math.random() * 200),
      minStock: 50,
      location: `Aisle ${Math.floor(Math.random() * 10) + 1}, Bin ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`
    }));

  const lowStockItems = inventoryItems.filter(item => item.stock < item.minStock);

  return (
    <div className="fade-in max-w-6xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 tracking-tight">Inventory Management</h1>
          <p className="text-[var(--text-secondary)]">Track stock levels and warehouse locations for your enriched catalog.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-[var(--bg-panel)] p-4 rounded-xl border border-[var(--border-color)] shadow-sm min-w-[150px]">
            <p className="text-sm text-[var(--text-secondary)] mb-1">Total SKUs</p>
            <p className="text-2xl font-bold">{inventoryItems.length}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-xl border border-red-100 shadow-sm min-w-[150px]">
            <p className="text-sm text-red-600 mb-1">Low Stock Alerts</p>
            <p className="text-2xl font-bold text-red-700 flex items-center gap-2">
              <AlertTriangle size={20} />
              {lowStockItems.length}
            </p>
          </div>
        </div>
      </div>

      <div className="panel flex flex-col h-[600px]">
        <div className="flex items-center justify-between p-5 border-b border-[var(--border-color)]">
          <div className="search-container mb-0 w-1/3">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search inventory..." 
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <button className="btn-secondary"><Filter size={16} /> Filter</button>
            <Link to="/pos" className="btn-primary">Generate PO <ArrowUpRight size={16} /></Link>
          </div>
        </div>

        <div className="data-table-container flex-1 overflow-auto">
          <table>
            <thead className="sticky top-0 bg-[var(--bg-hover)] z-10 shadow-sm">
              <tr>
                <th>Status</th>
                <th>Part Number</th>
                <th>Description</th>
                <th>Location</th>
                <th>Stock Level</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map((item, i) => {
                const isLowStock = item.stock < item.minStock;
                return (
                  <tr key={i}>
                    <td>
                      {isLowStock ? (
                        <span className="badge error"><AlertTriangle size={14} className="mr-1"/> Low</span>
                      ) : (
                        <span className="badge success"><Package size={14} className="mr-1"/> Optimal</span>
                      )}
                    </td>
                    <td className="font-mono font-semibold text-sm">{item.Mfg_Part_Num}</td>
                    <td className="max-w-xs truncate">{item.Part_Desc}</td>
                    <td className="text-[var(--text-secondary)] text-sm">{item.location}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <span className={`font-bold ${isLowStock ? 'text-[var(--error)]' : ''}`}>{item.stock}</span>
                        <span className="text-xs text-[var(--text-secondary)]">/ Min {item.minStock}</span>
                        <div className="w-24 h-1.5 bg-[var(--bg-hover)] rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${isLowStock ? 'bg-[var(--error)]' : 'bg-[var(--success)]'}`}
                            style={{ width: `${Math.min((item.stock / (item.minStock * 2)) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <button className="btn-secondary text-xs py-1 px-3">Update</button>
                    </td>
                  </tr>
                );
              })}
              {inventoryItems.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-[var(--text-secondary)]">
                    No active inventory found. Make sure parts are enriched and marked "Ready" in the Catalog.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
