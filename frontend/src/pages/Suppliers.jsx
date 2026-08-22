import React, { useState } from 'react';
import { Building2, Search, Filter, MoreVertical, Plus, Mail, Phone, ExternalLink, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Suppliers() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const suppliers = [
    { name: 'SKF Bearings Ltd.', type: 'Manufacturer', status: 'Active', items: 1245, contact: 'sarah@skf.com', phone: '+1 (555) 123-4567', rating: 4.8 },
    { name: 'Fastenal', type: 'Distributor', status: 'Syncing', items: 8430, contact: 'orders@fastenal.com', phone: '+1 (800) 333-2222', rating: 4.2 },
    { name: 'Siemens Industrial', type: 'Manufacturer', status: 'Active', items: 450, contact: 'b2b@siemens.com', phone: '+49 89 3800', rating: 4.9 },
    { name: 'McMaster-Carr', type: 'Distributor', status: 'Attention', items: 12050, contact: 'atl.sales@mcmaster.com', phone: '+1 (404) 555-8888', rating: 4.5 },
    { name: 'Grainger', type: 'Distributor', status: 'Active', items: 5600, contact: 'support@grainger.com', phone: '+1 (800) 472-4643', rating: 4.1 },
    { name: 'Parker Hannifin', type: 'Manufacturer', status: 'Active', items: 890, contact: 'sales@parker.com', phone: '+1 (216) 896-3000', rating: 4.7 }
  ];

  const handleAddSupplier = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    toast.success('Supplier onboarding invitation sent!');
  };

  return (
    <div className="fade-in max-w-7xl mx-auto py-8 relative">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 tracking-tight">Supplier Directory</h1>
          <p className="text-[var(--text-secondary)]">Manage vendors, track data sync health, and automate onboarding.</p>
        </div>
        <div className="flex gap-3">
          <div className="search-container mb-0 w-64 hidden md:flex">
            <Search size={18} />
            <input type="text" placeholder="Search suppliers..." className="search-bar" />
          </div>
          <button className="btn-secondary"><Filter size={16} /> Filter</button>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary"><Plus size={18} className="mr-1"/> Add Supplier</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {suppliers.map((s, i) => (
          <div key={i} className="bg-[var(--bg-panel)] rounded-2xl border border-[var(--border-color)] p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[var(--bg-hover)] rounded-xl flex items-center justify-center text-[var(--accent)]">
                  <Building2 size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[var(--text-primary)] leading-tight">{s.name}</h3>
                  <span className="text-xs text-[var(--text-secondary)] uppercase tracking-wider font-semibold">{s.type}</span>
                </div>
              </div>
              <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>

            <div className="flex items-center gap-2 mb-6">
               <span className={`badge ${s.status === 'Active' ? 'success' : s.status === 'Syncing' ? 'warning' : 'error'}`}>
                 {s.status}
               </span>
               <span className="text-sm font-semibold text-[var(--text-secondary)]">⭐ {s.rating}</span>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <Mail size={14} /> {s.contact}
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <Phone size={14} /> {s.phone}
              </div>
            </div>

            <div className="mt-auto border-t border-[var(--border-color)] pt-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-[var(--text-secondary)] mb-0.5">Catalog Items</p>
                <p className="font-bold font-mono">{s.items.toLocaleString()}</p>
              </div>
              <button className="btn-secondary text-xs py-1.5 px-3">View Catalog <ExternalLink size={12} className="ml-1"/></button>
            </div>
          </div>
        ))}
      </div>

      {/* Mock Modal */}
      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={() => setIsModalOpen(false)}></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[var(--bg-panel)] rounded-2xl shadow-2xl z-50 border border-[var(--border-color)]">
            <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">
              <h2 className="text-xl font-bold">Add New Supplier</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><X size={20}/></button>
            </div>
            <form onSubmit={handleAddSupplier} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Company Name</label>
                <input type="text" required className="w-full bg-[var(--bg-hover)] border border-[var(--border-color)] rounded-lg p-2" placeholder="e.g. Acme Corp" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Contact Email</label>
                <input type="email" required className="w-full bg-[var(--bg-hover)] border border-[var(--border-color)] rounded-lg p-2" placeholder="sales@acme.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Integration Method</label>
                <select className="w-full bg-[var(--bg-hover)] border border-[var(--border-color)] rounded-lg p-2">
                  <option>Email Onboarding Link</option>
                  <option>Direct API Connection</option>
                  <option>Manual EDI Setup</option>
                </select>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Send Invite</button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
