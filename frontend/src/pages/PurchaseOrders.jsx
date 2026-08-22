import React from 'react';
import { ShoppingCart, FileText, CheckCircle, Clock, Plus } from 'lucide-react';

export default function PurchaseOrders() {
  const mockPOs = [
    { id: 'PO-2024-089', supplier: 'Fastenal Industrial', items: 12, total: '$4,250.00', status: 'approved', date: 'Oct 12, 2024' },
    { id: 'PO-2024-090', supplier: 'SKF Bearings', items: 3, total: '$1,120.00', status: 'pending', date: 'Oct 14, 2024' },
    { id: 'PO-2024-091', supplier: 'Grainger', items: 45, total: '$12,800.00', status: 'draft', date: 'Oct 15, 2024' },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'approved': return <span className="badge success"><CheckCircle size={14} className="mr-1"/> Approved</span>;
      case 'pending': return <span className="badge warning"><Clock size={14} className="mr-1"/> Pending Approval</span>;
      case 'draft': return <span className="badge"><FileText size={14} className="mr-1"/> Draft</span>;
      default: return <span className="badge">{status}</span>;
    }
  };

  return (
    <div className="fade-in max-w-6xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 tracking-tight">Purchase Orders</h1>
          <p className="text-[var(--text-secondary)]">Manage procurement and automate PO generation for low-stock items.</p>
        </div>
        <button className="btn-primary"><Plus size={18} className="mr-1"/> Create PO</button>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-[var(--bg-panel)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
            <ShoppingCart size={24} />
          </div>
          <h3 className="text-[var(--text-secondary)] text-sm font-semibold uppercase tracking-wider mb-1">Active Orders</h3>
          <p className="text-3xl font-bold text-[var(--text-primary)]">24</p>
        </div>
        
        <div className="bg-[var(--bg-panel)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
            <Clock size={24} />
          </div>
          <h3 className="text-[var(--text-secondary)] text-sm font-semibold uppercase tracking-wider mb-1">Pending Approval</h3>
          <p className="text-3xl font-bold text-[var(--text-primary)]">7</p>
        </div>

        <div className="bg-gradient-to-br from-[var(--accent)] to-blue-700 p-6 rounded-2xl shadow-md text-white relative overflow-hidden group cursor-pointer">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
              <FileText size={24} />
            </div>
            <h3 className="text-white/80 text-sm font-semibold uppercase tracking-wider mb-1">Auto-Generate from Low Stock</h3>
            <p className="text-xl font-bold">12 Items suggest reorder</p>
            <div className="mt-4 inline-flex items-center text-sm font-semibold bg-white/20 px-3 py-1.5 rounded-lg hover:bg-white/30 transition-colors">
              Review Suggestions &rarr;
            </div>
          </div>
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl transform group-hover:scale-150 transition-transform duration-700"></div>
        </div>
      </div>

      <div className="panel flex flex-col">
        <div className="p-5 border-b border-[var(--border-color)] font-semibold text-lg">
          Recent Purchase Orders
        </div>
        <div className="data-table-container">
          <table>
            <thead>
              <tr>
                <th>PO Number</th>
                <th>Supplier</th>
                <th>Date Created</th>
                <th>Items</th>
                <th>Total Value</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockPOs.map((po, i) => (
                <tr key={i} className="cursor-pointer hover:bg-[var(--bg-hover)]">
                  <td className="font-mono font-semibold text-[var(--accent)]">{po.id}</td>
                  <td className="font-medium">{po.supplier}</td>
                  <td className="text-[var(--text-secondary)]">{po.date}</td>
                  <td>{po.items} SKUs</td>
                  <td className="font-mono">{po.total}</td>
                  <td>{getStatusBadge(po.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
