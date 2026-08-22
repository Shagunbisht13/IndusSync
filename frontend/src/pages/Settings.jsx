import React from 'react';
import { Key, Shield, User, Sliders } from 'lucide-react';

export default function Settings() {
  return (
    <div className="fade-in max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Settings</h1>

      <div className="flex gap-8">
        <div className="w-64 shrink-0 flex flex-col gap-2">
          <button className="flex items-center gap-3 p-3 bg-[var(--bg-hover)] text-[var(--accent)] rounded-lg font-medium">
            <Sliders size={18} /> General
          </button>
          <button className="flex items-center gap-3 p-3 text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] rounded-lg font-medium transition-colors">
            <Key size={18} /> API Keys
          </button>
          <button className="flex items-center gap-3 p-3 text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] rounded-lg font-medium transition-colors">
            <User size={18} /> Team
          </button>
          <button className="flex items-center gap-3 p-3 text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] rounded-lg font-medium transition-colors">
            <Shield size={18} /> Enrichment Rules
          </button>
        </div>

        <div className="flex-1 space-y-6">
          <div className="panel p-6">
            <h2 className="text-lg font-semibold mb-4 border-b border-[var(--border-color)] pb-4">General Configuration</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Company Name</label>
                <input type="text" className="search-bar !pl-4 w-full max-w-md bg-[var(--bg-panel)] border-[var(--border-color)] border" defaultValue="Industrial Corp" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Target ERP System</label>
                <select className="search-bar !pl-4 w-full max-w-md bg-[var(--bg-panel)] border-[var(--border-color)] border appearance-none">
                  <option>SAP S/4HANA</option>
                  <option>Oracle NetSuite</option>
                  <option>Microsoft Dynamics</option>
                  <option>Custom Export</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end">
                <button className="btn-primary">Save Changes</button>
              </div>
            </div>
          </div>
          
          <div className="panel p-6">
            <h2 className="text-lg font-semibold mb-4 border-b border-[var(--border-color)] pb-4">AI Model Settings</h2>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-medium text-sm">Strict Casing Rules</h4>
                <p className="text-xs text-[var(--text-secondary)]">Force UPPERCASE for ERP Invoice Descriptions</p>
              </div>
              <div className="w-12 h-6 bg-[var(--accent)] rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm">Auto-Accept High Confidence</h4>
                <p className="text-xs text-[var(--text-secondary)]">Automatically mark items ready if AI confidence &gt; 95%</p>
              </div>
              <div className="w-12 h-6 bg-[var(--accent)] rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
