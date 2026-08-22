import React, { useState } from 'react';
import { UploadCloud, CheckCircle, Database, ArrowRight, FileText, Loader } from 'lucide-react';
import useAppStore from '../store/useAppStore';
import toast from 'react-hot-toast';

export default function Import() {
  const [step, setStep] = useState('upload'); // upload -> preview -> success
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const addParts = useAppStore(state => state.addParts);

  const mockExtractedData = [
    { Mfg_Part_Num: 'NEW-881', Part_Desc: 'STEEL BOLT M10', Part_Manuf: 'FASTENAL', status: 'needs_fixing', errors: ['Missing Dimensions'] },
    { Mfg_Part_Num: 'VALVE-99X', Part_Desc: 'BRASS VALVE', Part_Manuf: 'UNKNOWN', status: 'needs_fixing', errors: ['Ambiguous Description'] }
  ];

  const handleDrag = (e) => { e.preventDefault(); e.stopPropagation(); };
  const handleDragIn = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
  const handleDragOut = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    simulateUpload();
  };

  const simulateUpload = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('preview');
    }, 1500);
  };

  const commitImport = () => {
    const newParts = mockExtractedData.map(p => ({
      ...p,
      id: `P-NEW-${Math.floor(Math.random() * 10000)}`,
      E1_Brand: 'Industrial',
      ai_confidence: 0,
      enriched_data: null
    }));
    addParts(newParts);
    toast.success('Successfully imported 2 records');
    setStep('success');
  };

  return (
    <div className="fade-in max-w-4xl mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3 tracking-tight">Upload Supplier Data</h1>
        <p className="text-[var(--text-secondary)] text-lg">Drag and drop your messy CSV or Excel files here to let IndusSync clean them.</p>
      </div>
      
      {step === 'upload' && (
        <div 
          className={`border-2 border-dashed rounded-3xl p-20 text-center transition-all duration-300 cursor-pointer group
            ${isDragging ? 'border-[var(--accent)] bg-[var(--accent-light)]' : 'border-[var(--border-color)] bg-[var(--bg-panel)] hover:bg-[var(--bg-hover)] hover:border-[var(--accent)]'}
          `}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={simulateUpload}
        >
          {isLoading ? (
            <div className="flex flex-col items-center">
              <Loader size={40} className="text-[var(--accent)] animate-spin mb-6" />
              <h3 className="text-xl font-semibold text-[var(--text-primary)]">Parsing Document...</h3>
            </div>
          ) : (
            <>
              <div className="w-20 h-20 bg-[var(--bg-hover)] group-hover:bg-[var(--accent-light)] rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300 pointer-events-none">
                <UploadCloud size={40} className="text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors pointer-events-none">Click or drag file to this area to upload</h3>
              <p className="text-[var(--text-secondary)] text-sm mb-8 pointer-events-none">Support for a single or bulk upload. Strictly CSV, XLSX up to 50MB.</p>
              <button className="btn-primary shadow-md pointer-events-none">Select Files to Upload</button>
            </>
          )}
        </div>
      )}

      {step === 'preview' && (
        <div className="fade-in">
          <div className="bg-[var(--bg-panel)] border border-[var(--border-color)] rounded-2xl overflow-hidden shadow-sm mb-8">
            <div className="p-5 border-b border-[var(--border-color)] bg-[var(--bg-hover)] flex justify-between items-center">
              <div className="flex items-center gap-3">
                <FileText className="text-[var(--accent)]" size={24} />
                <div>
                  <h3 className="font-bold text-[var(--text-primary)]">Data Preview (mock_data.csv)</h3>
                  <p className="text-xs text-[var(--text-secondary)]">2 records identified • Auto-mapped 5 columns</p>
                </div>
              </div>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--bg-hover)] text-[var(--text-secondary)] text-sm border-b border-[var(--border-color)]">
                  <th className="p-3 font-medium">MPN</th>
                  <th className="p-3 font-medium">Description</th>
                  <th className="p-3 font-medium">Manufacturer</th>
                  <th className="p-3 font-medium">Issues Detected</th>
                </tr>
              </thead>
              <tbody>
                {mockExtractedData.map((row, i) => (
                  <tr key={i} className="border-b border-[var(--border-color)] last:border-0 text-sm">
                    <td className="p-3 font-mono font-medium">{row.Mfg_Part_Num}</td>
                    <td className="p-3">{row.Part_Desc}</td>
                    <td className="p-3">{row.Part_Manuf}</td>
                    <td className="p-3 text-[var(--error)] flex items-center gap-1"><AlertTriangle size={14}/> {row.errors[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end gap-4">
            <button className="btn-secondary" onClick={() => setStep('upload')}>Cancel</button>
            <button className="btn-primary" onClick={commitImport}>Import & Queue for AI <ArrowRight size={16}/></button>
          </div>
        </div>
      )}

      {step === 'success' && (
        <div className="fade-in text-center p-12 bg-[var(--bg-panel)] border border-[var(--border-color)] rounded-3xl shadow-sm">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Import Successful!</h2>
          <p className="text-[var(--text-secondary)] mb-8">2 records have been added to your catalog and flagged for AI enrichment.</p>
          <div className="flex justify-center gap-4">
            <button className="btn-secondary" onClick={() => setStep('upload')}>Upload Another File</button>
            <a href="/catalog" className="btn-primary">View in Catalog</a>
          </div>
        </div>
      )}

      {step === 'upload' && (
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
          </div>
        </div>
      )}
    </div>
  );
}
