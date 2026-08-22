import React from 'react';
import { X, Sparkles, Check, AlertTriangle, ChevronRight, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import useAppStore from '../store/useAppStore';
import toast from 'react-hot-toast';

export default function ItemDrawer({ item, onClose }) {
  const acceptAIFix = useAppStore(state => state.acceptAIFix);

  if (!item) return null;

  const handleAccept = () => {
    acceptAIFix(item.id);
    toast.success(`AI Enrichment accepted for ${item.Mfg_Part_Num}`);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={onClose} />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-[600px] bg-[var(--bg-panel)] shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out border-l border-[var(--border-color)]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              {item.Mfg_Part_Num}
              {item.status === 'export_ready' && <span className="badge success ml-2">Ready</span>}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">{item.E1_Brand} / {item.Part_Manuf}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[var(--bg-hover)] rounded-full transition-colors">
            <X size={24} className="text-[var(--text-secondary)]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Quick Actions & QR */}
          <div className="flex gap-6">
            <div className="p-3 bg-white border border-[var(--border-color)] rounded-xl shadow-sm inline-flex">
              <QRCodeSVG value={JSON.stringify({ sku: item.Mfg_Part_Num, mfg: item.Part_Manuf })} size={80} />
            </div>
            <div className="flex-1 flex flex-col justify-center">
               <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">Part 360 View</h3>
               <p className="text-xs text-[var(--text-secondary)] mb-3">Scan QR code for mobile inventory lookup.</p>
               <div className="flex gap-2">
                 <button className="text-xs btn-secondary py-1 px-3">View Supplier</button>
                 <button className="text-xs btn-secondary py-1 px-3">Stock History</button>
               </div>
            </div>
          </div>

          {/* Raw Input Section */}
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-4">Raw Input Data</h3>
            <div className="bg-[var(--bg-hover)] border border-[var(--border-color)] rounded-xl p-4 space-y-3">
              <div>
                <span className="text-xs text-[var(--text-secondary)] block">Original Description</span>
                <span className="font-mono text-sm">{item.Part_Desc}</span>
              </div>
              {item.errors && item.errors.length > 0 && (
                <div className="pt-3 mt-3 border-t border-[var(--border-color)]">
                  <span className="text-xs text-[var(--error)] font-semibold uppercase block mb-2">Detected Issues</span>
                  <ul className="space-y-1">
                    {item.errors.map((err, i) => (
                      <li key={i} className="text-sm flex items-center gap-2 text-[var(--error)]">
                        <AlertTriangle size={14} /> {err}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* AI Enrichment Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-2">
                <Sparkles size={16} /> AI Enriched Data
              </h3>
              {item.ai_confidence > 0 && (
                <span className="text-xs font-semibold bg-[var(--accent-light)] text-[var(--accent)] px-2 py-1 rounded-full">
                  {item.ai_confidence}% Confidence
                </span>
              )}
            </div>

            {item.enriched_data ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[var(--bg-panel)] border border-[var(--border-color)] rounded-xl p-4 shadow-sm">
                    <span className="text-xs text-[var(--text-secondary)] block mb-1">Short Title (Web)</span>
                    <span className="text-sm font-medium">{item.enriched_data.short_desc}</span>
                  </div>
                  <div className="bg-[var(--bg-panel)] border border-[var(--border-color)] rounded-xl p-4 shadow-sm">
                    <span className="text-xs text-[var(--text-secondary)] block mb-1">Invoice Desc (ERP)</span>
                    <span className="text-sm font-mono">{item.enriched_data.invoice_desc}</span>
                  </div>
                </div>
                
                <div className="bg-[var(--bg-panel)] border border-[var(--border-color)] rounded-xl p-4 shadow-sm">
                  <span className="text-xs text-[var(--text-secondary)] block mb-1">Master Category Path</span>
                  <span className="text-sm font-medium flex items-center gap-1 text-[var(--accent)]">
                    {item.enriched_data.classpath.split('/').map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part.trim()}
                        {i < arr.length - 1 && <ChevronRight size={14} className="text-[var(--text-secondary)]" />}
                      </React.Fragment>
                    ))}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-3">Extracted Specifications</h4>
                  <div className="bg-[var(--bg-panel)] border border-[var(--border-color)] rounded-xl overflow-hidden shadow-sm">
                    {item.enriched_data.attributes.map((attr, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border-b border-[var(--border-color)] last:border-0 bg-[var(--bg-hover)]">
                        <span className="text-sm text-[var(--text-secondary)]">{attr.label}</span>
                        <span className="text-sm font-bold">{attr.value} {attr.uom}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-[var(--bg-hover)] rounded-xl border border-[var(--border-color)] border-dashed">
                <p className="text-[var(--text-secondary)]">No AI enrichment data available yet.</p>
                <button className="btn-primary mt-4">
                  <Sparkles size={16} /> Run Enrichment
                </button>
              </div>
            )}
          </section>

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-[var(--border-color)] bg-[var(--bg-hover)] flex justify-end gap-3">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          {item.status === 'fixed_by_ai' && (
            <button onClick={handleAccept} className="btn-primary bg-green-600 hover:bg-green-700 shadow-green-600/20">
              <Check size={16} /> Accept & Mark Ready
            </button>
          )}
        </div>
      </div>
    </>
  );
}
