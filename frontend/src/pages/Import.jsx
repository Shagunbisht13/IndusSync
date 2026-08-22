import React from 'react';
import { UploadCloud, CheckCircle, Database } from 'lucide-react';

export default function Import() {
  return (
    <div className="fade-in max-w-4xl mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3 tracking-tight">Upload Supplier Data</h1>
        <p className="text-[var(--text-secondary)] text-lg">Drag and drop your messy CSV or Excel files here to let IndusSync clean them.</p>
      </div>
      
      <div className="border-2 border-dashed border-[var(--border-color)] bg-[var(--bg-panel)] rounded-3xl p-20 text-center hover:bg-[var(--bg-hover)] hover:border-[var(--accent)] hover:shadow-glow transition-all duration-300 cursor-pointer group">
        <div className="w-20 h-20 bg-[var(--bg-hover)] group-hover:bg-[var(--accent-light)] rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
          <UploadCloud size={40} className="text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors duration-300" />
        </div>
        <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">Click or drag file to this area to upload</h3>
        <p className="text-[var(--text-secondary)] text-sm mb-8">Support for a single or bulk upload. Strictly CSV, XLSX up to 50MB.</p>
        <button className="btn-primary shadow-md group-hover:shadow-lg transform group-hover:-translate-y-0.5 transition-all">Select Files to Upload</button>
      </div>

      <div className="mt-16">
        <h3 className="text-xl font-bold mb-6 tracking-tight">Recent Uploads</h3>
        <div className="grid gap-4">
          <div className="panel p-5 flex items-center justify-between hover:shadow-md transition-shadow duration-300 group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[var(--bg-hover)] rounded-xl group-hover:bg-[var(--accent-light)] transition-colors">
                <Database className="text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors" size={24} />
              </div>
              <div>
                <p className="font-semibold text-[var(--text-primary)]">skf_bearings_q3_messy.csv</p>
                <p className="text-sm text-[var(--text-secondary)] mt-0.5">2.4 MB • Uploaded 2 hours ago</p>
              </div>
            </div>
            <span className="badge success px-3 py-1.5"><CheckCircle size={14} className="mr-1.5" /> Processed</span>
          </div>
          
          <div className="panel p-5 flex items-center justify-between hover:shadow-md transition-shadow duration-300 group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[var(--bg-hover)] rounded-xl group-hover:bg-[var(--accent-light)] transition-colors">
                <Database className="text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors" size={24} />
              </div>
              <div>
                <p className="font-semibold text-[var(--text-primary)]">fastenal_screws_batch_4.xlsx</p>
                <p className="text-sm text-[var(--text-secondary)] mt-0.5">8.1 MB • Uploaded yesterday</p>
              </div>
            </div>
            <span className="badge success px-3 py-1.5"><CheckCircle size={14} className="mr-1.5" /> Processed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
