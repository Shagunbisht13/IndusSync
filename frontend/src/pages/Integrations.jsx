import React from 'react';
import { Cable, CheckCircle, ExternalLink, Settings, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Integrations() {
  const handleConnect = (name) => {
    toast.success(`Connection initiated for ${name}. Awaiting OAuth callback...`);
  };

  const integrations = [
    { name: 'SAP S/4HANA', type: 'ERP', status: 'connected', description: 'Sync enriched parts, dimensions, and taxonomy directly to SAP Material Master.' },
    { name: 'Oracle NetSuite', type: 'ERP', status: 'disconnected', description: 'Push approved Purchase Orders and pull inventory levels.' },
    { name: 'Akeneo', type: 'PIM', status: 'disconnected', description: 'Export rich product descriptions and attributes for e-commerce.' },
    { name: 'Shopify Plus', type: 'E-Commerce', status: 'disconnected', description: 'Automatically publish export-ready parts as new products.' },
    { name: 'Salesforce Mfg Cloud', type: 'CRM', status: 'disconnected', description: 'Sync customer-specific part pricing and availability.' },
    { name: 'Snowflake', type: 'Data Warehouse', status: 'error', description: 'Nightly backup of all raw and enriched catalog data.' },
  ];

  return (
    <div className="fade-in max-w-6xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 tracking-tight">System Integrations</h1>
          <p className="text-[var(--text-secondary)]">Connect IndusSync to your existing ERP, PIM, and e-commerce platforms.</p>
        </div>
        <button className="btn-primary"><Cable size={18} className="mr-1"/> Add Custom Webhook</button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {integrations.map((integration, i) => (
          <div key={i} className="bg-[var(--bg-panel)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-gray-400 text-xl">
                    {integration.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">{integration.name}</h3>
                    <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">{integration.type}</span>
                  </div>
                </div>
                {integration.status === 'connected' && <span className="badge success px-2.5 py-1"><CheckCircle size={14} className="mr-1"/> Connected</span>}
                {integration.status === 'error' && <span className="badge error px-2.5 py-1"><ShieldAlert size={14} className="mr-1"/> Auth Failed</span>}
                {integration.status === 'disconnected' && <span className="badge px-2.5 py-1 text-gray-500">Not Connected</span>}
              </div>
              <p className="text-[var(--text-secondary)] text-sm mb-6 line-clamp-2">{integration.description}</p>
            </div>
            
            <div className="flex items-center justify-between border-t border-[var(--border-color)] pt-4 mt-auto">
              <button className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1 transition-colors">
                <Settings size={14} /> Configure
              </button>
              
              {integration.status === 'connected' ? (
                <button className="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors">Disconnect</button>
              ) : (
                <button 
                  onClick={() => handleConnect(integration.name)}
                  className="btn-secondary text-sm py-1.5 px-4 flex items-center gap-1 border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-colors"
                >
                  <ExternalLink size={14} /> Connect
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
