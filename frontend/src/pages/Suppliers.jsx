import React from 'react';

export default function Suppliers() {
  const suppliers = [
    { name: 'SKF Bearings Ltd.', status: 'Active', items: 1245 },
    { name: 'Fastenal', status: 'Syncing...', items: 8430 },
    { name: 'Siemens Industrial', status: 'Active', items: 450 },
    { name: 'McMaster-Carr', status: 'Attention Required', items: 12050 }
  ];

  return (
    <div className="fade-in max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Supplier Directory</h1>
          <p className="text-[var(--text-secondary)]">Manage your connected vendors and their data sync status.</p>
        </div>
        <button className="btn-primary">Add Supplier</button>
      </div>

      <div className="panel overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-4 border-b border-[var(--border-color)] bg-[var(--bg-hover)] text-xs font-semibold uppercase text-[var(--text-secondary)] tracking-wider">Supplier Name</th>
              <th className="p-4 border-b border-[var(--border-color)] bg-[var(--bg-hover)] text-xs font-semibold uppercase text-[var(--text-secondary)] tracking-wider">Status</th>
              <th className="p-4 border-b border-[var(--border-color)] bg-[var(--bg-hover)] text-xs font-semibold uppercase text-[var(--text-secondary)] tracking-wider">Items in Catalog</th>
              <th className="p-4 border-b border-[var(--border-color)] bg-[var(--bg-hover)] text-xs font-semibold uppercase text-[var(--text-secondary)] tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((s, i) => (
              <tr key={i} className="hover:bg-[var(--bg-hover)] border-b border-[var(--border-color)] last:border-0">
                <td className="p-4 font-medium">{s.name}</td>
                <td className="p-4">
                  <span className={`badge ${s.status === 'Active' ? 'success' : s.status === 'Syncing...' ? 'warning' : 'error'}`}>
                    {s.status}
                  </span>
                </td>
                <td className="p-4 text-[var(--text-secondary)]">{s.items.toLocaleString()}</td>
                <td className="p-4 text-right">
                  <button className="text-[var(--accent)] hover:underline text-sm font-medium">Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
