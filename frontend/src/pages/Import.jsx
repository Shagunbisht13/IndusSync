import React from 'react';
import { UploadCloud, CheckCircle, Database } from 'lucide-react';

export default function Import() {
  return (
    <div className="fade-in max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Upload Supplier Data</h1>
        <p className="text-[var(--text-secondary)]">Drag and drop your messy CSV or Excel files here to let IndusSync clean them.</p>
      </div>
      
      <div className="border-2 border-dashed border-[var(--border-color)] bg-[var(--bg-panel)] rounded-2xl p-16 text-center hover:bg-[var(--bg-hover)] hover:border-[var(--accent)] transition-all cursor-pointer group">
        <UploadCloud size={64} className="mx-auto text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors mb-4" />
        <h3 className="text-lg font-semibold mb-2">Click or drag file to this area to upload</h3>
        <p className="text-[var(--text-secondary)] text-sm mb-6">Support for a single or bulk upload. Strictly CSV, XLSX up to 50MB.</p>
        <button className="btn-primary pointer-events-none">Select Files</button>
      </div>

      <div className="mt-12">
        <h3 className="text-lg font-semibold mb-4">Recent Uploads</h3>
        <div className="panel overflow-hidden">
          <div className="p-4 border-b border-[var(--border-color)] flex items-center justify-between hover:bg-[var(--bg-hover)]">
            <div className="flex items-center gap-3">
              <Database className="text-[var(--text-secondary)]" size={20} />
              <div>
                <p className="font-medium text-sm">skf_bearings_q3_messy.csv</p>
                <p className="text-xs text-[var(--text-secondary)]">2.4 MB • Uploaded 2 hours ago</p>
              </div>
            </div>
            <span className="badge success"><CheckCircle size={14} className="mr-1" /> Processed</span>
          </div>
          <div className="p-4 flex items-center justify-between hover:bg-[var(--bg-hover)]">
            <div className="flex items-center gap-3">
              <Database className="text-[var(--text-secondary)]" size={20} />
              <div>
                <p className="font-medium text-sm">fastenal_screws_batch_4.xlsx</p>
                <p className="text-xs text-[var(--text-secondary)]">8.1 MB • Uploaded yesterday</p>
              </div>
            </div>
            <span className="badge success"><CheckCircle size={14} className="mr-1" /> Processed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
