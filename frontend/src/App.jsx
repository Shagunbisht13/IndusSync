import React, { useState, useEffect, useMemo } from 'react';
import { Database, Zap, Sparkles, Server, CheckCircle, Loader2, Search, Download, LayoutDashboard, BarChart, CheckSquare, AlertTriangle, Network, ArrowRight } from 'lucide-react';

export default function App() {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [enriching, setEnriching] = useState(false);
  const [results, setResults] = useState({});
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'studio', 'analytics', 'taxonomy'

  useEffect(() => {
    fetch('http://localhost:8000/api/data')
      .then(res => res.json())
      .then(json => setData(json.data || []))
      .catch(err => console.error(err));
  }, []);

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    const lowerQ = searchQuery.toLowerCase();
    return data.filter(r => 
      String(r.Mfg_Part_Num).toLowerCase().includes(lowerQ) ||
      String(r.Part_Desc).toLowerCase().includes(lowerQ) ||
      String(r.Part_Manuf).toLowerCase().includes(lowerQ)
    );
  }, [data, searchQuery]);

  const validateRow = (row) => {
    const issues = [];
    if (!row.Part_Desc || row.Part_Desc.length < 10) issues.push("Description too short");
    if (row.Part_Desc && row.Part_Desc.includes("Unbranded")) issues.push("Contains placeholder 'Unbranded'");
    if (row.Part_Manuf && row.Part_Manuf.includes("-- No")) issues.push("Missing exact Manufacturer");
    return issues;
  };

  const handleEnrich = async (rowToProcess = selectedRow) => {
    if (!rowToProcess) return;
    setEnriching(true);
    setError('');
    
    try {
      const res = await fetch('http://localhost:8000/api/enrich', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ row: rowToProcess, api_key: "" }) 
      });
      const resData = await res.json();
      if (res.ok && resData.success) {
        setResults(prev => ({ ...prev, [rowToProcess.Mfg_Part_Num]: resData.result }));
      } else {
        setError(resData.detail || 'Failed to enrich data');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setEnriching(false);
    }
  };

  const handleBatchEnrich = async () => {
    const unEnriched = data.filter(r => !results[r.Mfg_Part_Num]).slice(0, 3);
    if (unEnriched.length === 0) {
      alert("All items currently loaded are enriched, or dataset is empty.");
      return;
    }
    
    for (const row of unEnriched) {
      await handleEnrich(row);
      await new Promise(r => setTimeout(r, 1500));
    }
  };

  const handleExportCSV = () => {
    const enrichedItems = Object.values(results);
    if (enrichedItems.length === 0) return;

    const headers = Array.from(new Set(enrichedItems.flatMap(Object.keys)));
    const csvContent = [
      headers.join(','),
      ...enrichedItems.map(item => headers.map(h => `"${(item[h] || '').toString().replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "IndusSync_Delivery_Format.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="brand">
          <Database size={24} color="var(--success)" />
          IndusSync
        </div>
        
        <div className="nav-tabs">
          <button className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <LayoutDashboard size={18} /> Catalog Overview
          </button>
          <button className={`nav-tab ${activeTab === 'studio' ? 'active' : ''}`} onClick={() => setActiveTab('studio')}>
            <Zap size={18} /> Enrichment Studio
          </button>
          <button className={`nav-tab ${activeTab === 'taxonomy' ? 'active' : ''}`} onClick={() => setActiveTab('taxonomy')}>
            <Network size={18} /> AI Category Organizer
          </button>
          <button className={`nav-tab ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
            <BarChart size={18} /> Data Health Report
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        
        {/* Header Actions */}
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem'}}>
          <div>
            <h1>
              {activeTab === 'overview' && 'Catalog Overview'}
              {activeTab === 'studio' && 'Enrichment Studio'}
              {activeTab === 'analytics' && 'Data Health Report'}
              {activeTab === 'taxonomy' && 'AI Category Organizer'}
            </h1>
            <p className="subtitle" style={{maxWidth: '800px', lineHeight: '1.6'}}>
              {activeTab === 'overview' && 'Check the health of your raw data and find missing details before they cause problems.'}
              {activeTab === 'studio' && 'Use AI to turn messy text into perfectly formatted, ready-to-sell product listings.'}
              {activeTab === 'analytics' && 'See the big picture: Find errors in your catalog and track how much the AI has fixed.'}
              {activeTab === 'taxonomy' && 'See how the AI automatically organizes messy categories into a clean, easy-to-use structure.'}
            </p>
          </div>
          
          <div style={{display: 'flex', gap: '1rem'}}>
            {activeTab === 'overview' && (
              <>
                <button className="btn-secondary" onClick={handleBatchEnrich} disabled={enriching || data.length === 0}>
                  {enriching ? <Loader2 className="loader" size={16} /> : <Zap size={16} />} 
                  {enriching ? 'Processing...' : 'Batch Enrich (3)'}
                </button>
                <button className="btn-primary" onClick={handleExportCSV} disabled={Object.keys(results).length === 0}>
                  <Download size={16} /> Export Delivery CSV
                </button>
              </>
            )}
          </div>
        </div>

        {error && (
          <div className="validation-error">
            <strong>API Error:</strong> {error}
          </div>
        )}

        {/* --- OVERVIEW TAB --- */}
        {activeTab === 'overview' && (
          <>
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-title" title="Total number of items loaded from the raw vendor dataset.">Total Items</div>
                <div className="metric-value">{data.length}</div>
              </div>
              <div className="metric-card">
                <div className="metric-title" title="Number of items successfully processed by the AI pipeline.">Fixed by AI</div>
                <div className="metric-value" style={{color: 'var(--success)'}}>{Object.keys(results).length}</div>
              </div>
              <div className="metric-card">
                <div className="metric-title" title="Items waiting in the queue to be processed.">Needs Fixing</div>
                <div className="metric-value">{Math.max(0, data.length - Object.keys(results).length)}</div>
              </div>
              <div className="metric-card">
                <div className="metric-title" title="Percentage of catalog ready for export to PIM/Commerce engine.">Export Ready</div>
                <div className="metric-value">{data.length > 0 ? Math.round((Object.keys(results).length / data.length)*100) : 0}%</div>
              </div>
            </div>
            
            <div className="panel">
              <div style={{padding: '1.5rem', borderBottom: '1px solid var(--border-color)'}}>
                <div className="search-container" style={{margin: 0}}>
                  <Search size={18} />
                  <input 
                    type="text" 
                    className="search-bar" 
                    placeholder="Search by Part Number, Brand, or Description..." 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="data-table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Errors</th>
                      <th>Part Number</th>
                      <th>Description</th>
                      <th>Manufacturer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.slice(0, 100).map((row, i) => {
                      const isEnriched = !!results[row.Mfg_Part_Num];
                      const validationIssues = validateRow(row);
                      return (
                        <tr key={i} onClick={() => { setSelectedRow(row); setActiveTab('studio'); }}>
                          <td>
                            {isEnriched ? 
                              <span className="badge success"><CheckCircle size={12} style={{marginRight: 4}}/> Fixed</span> : 
                              <span className="badge" style={{background: 'var(--bg-main)', color: 'var(--text-secondary)'}}>Pending</span>
                            }
                          </td>
                          <td>
                            {validationIssues.length > 0 ? 
                               <span className="badge warning"><AlertTriangle size={12} style={{marginRight: 4}}/> {validationIssues.length} Errors</span> : 
                               <span className="badge success"><CheckSquare size={12} style={{marginRight: 4}}/> Clean</span>
                            }
                          </td>
                          <td><strong style={{fontFamily: 'monospace'}}>{row.Mfg_Part_Num}</strong></td>
                          <td>{row.Part_Desc}</td>
                          <td>{row.Part_Manuf}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* --- ENRICHMENT STUDIO TAB --- */}
        {activeTab === 'studio' && (
          <>
            {!selectedRow ? (
              <div className="panel" style={{padding: '4rem 2rem', textAlign: 'center', borderStyle: 'dashed'}}>
                <Zap size={48} color="var(--border-color)" style={{margin: '0 auto 1rem'}} />
                <h3 style={{fontSize: '1.125rem', marginBottom: '0.5rem'}}>Select an Item</h3>
                <p style={{color: 'var(--text-secondary)'}}>Click on an item from the Overview tab to see the AI fix it.</p>
                <button className="btn-secondary" onClick={() => setActiveTab('overview')} style={{marginTop: '2rem'}}>Go to Overview</button>
              </div>
            ) : (
              <div className="split-view">
                {/* Left side: Raw Input */}
                <div className="panel" style={{padding: '1.5rem', background: 'var(--bg-main)'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
                    <h3 style={{fontSize: '1rem', fontWeight: 600}}>Messy Input Data</h3>
                  </div>

                  <div className="raw-data-panel">
                    <div className="raw-field">
                      <div className="raw-label">Part Number (MPN)</div>
                      <div className="raw-value">{selectedRow.Mfg_Part_Num}</div>
                    </div>
                    <div className="raw-field">
                      <div className="raw-label">Description</div>
                      <div className="raw-value">{selectedRow.Part_Desc}</div>
                    </div>
                    <div className="raw-field">
                      <div className="raw-label">Brand</div>
                      <div className="raw-value">{selectedRow.E1_Brand}</div>
                    </div>
                    <div className="raw-field">
                      <div className="raw-label">Manufacturer</div>
                      <div className="raw-value">{selectedRow.Part_Manuf}</div>
                    </div>

                    <div style={{marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)'}}>
                      <div className="raw-label" style={{marginBottom: '1rem'}}>Errors Found</div>
                      {validateRow(selectedRow).length === 0 ? (
                        <div className="badge success">Looks good!</div>
                      ) : (
                        <ul style={{listStyle: 'none', color: 'var(--warning)', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                          {validateRow(selectedRow).map((issue, idx) => (
                            <li key={idx} style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}><AlertTriangle size={14}/> {issue}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right side: AI Output */}
                <div className="panel" style={{padding: '1.5rem'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
                    <h3 style={{fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <Sparkles size={18} color="var(--success)"/> AI Fixed Output
                    </h3>
                    <button 
                      className="btn-primary" 
                      onClick={() => handleEnrich()}
                      disabled={enriching}
                    >
                      {enriching ? <Loader2 className="loader" size={16} /> : <Zap size={16} />}
                      {enriching ? 'Fixing...' : 'Fix Data with AI'}
                    </button>
                  </div>

                  {!results[selectedRow.Mfg_Part_Num] && !enriching && (
                    <div style={{textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)'}}>
                      <p>Click "Fix Data with AI" to let IndusSync generate perfect text.</p>
                    </div>
                  )}

                  {enriching && (
                    <div style={{textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)'}}>
                      <Loader2 className="loader" size={32} style={{margin: '0 auto 1rem', color: 'var(--accent)'}} />
                      <p>Reading text and finding hidden specs...</p>
                    </div>
                  )}

                  {results[selectedRow.Mfg_Part_Num] && !enriching && (
                    <div className="results-grid" style={{animation: 'fadeIn 0.3s ease-out'}}>
                      <div className="result-section">
                        <h3>New Descriptions</h3>
                        <div className="raw-field">
                          <div className="raw-label" title="Best for search results.">Short Title</div>
                          <div className="raw-value" style={{borderColor: 'var(--success)'}}>{results[selectedRow.Mfg_Part_Num].short_desc}</div>
                        </div>
                        <div className="raw-field">
                          <div className="raw-label" title="Max 40 chars, ALL CAPS for old systems.">Invoice Text</div>
                          <div className="raw-value" style={{borderColor: 'var(--success)'}}>{results[selectedRow.Mfg_Part_Num].invoice_desc}</div>
                        </div>
                        <div className="raw-field">
                          <div className="raw-label" title="Short description for small screens.">Mobile Text</div>
                          <div className="raw-value" style={{borderColor: 'var(--success)'}}>{results[selectedRow.Mfg_Part_Num].mobile_desc}</div>
                        </div>
                        <div className="raw-field">
                          <div className="raw-label" title="Full product overview.">Long Details</div>
                          <div className="raw-value" style={{borderColor: 'var(--success)', whiteSpace: 'pre-wrap'}}>{results[selectedRow.Mfg_Part_Num].long_desc}</div>
                        </div>
                      </div>

                      <div className="result-section">
                        <h3>New Metadata</h3>
                        <div className="raw-field">
                          <div className="raw-label" title="Cleaned up brand name.">Real Manufacturer</div>
                          <div className="raw-value">{results[selectedRow.Mfg_Part_Num].manufacture_name}</div>
                        </div>
                        <div className="raw-field">
                          <div className="raw-label">Real Brand Name</div>
                          <div className="raw-value">{results[selectedRow.Mfg_Part_Num].brand_name}</div>
                        </div>
                        <div className="raw-field">
                          <div className="raw-label" title="Automatically put in the right folder.">Category Path</div>
                          <div className="raw-value">{results[selectedRow.Mfg_Part_Num].classpath}</div>
                        </div>

                        <h3 style={{marginTop: '2rem'}}>Found Specs</h3>
                        {[1, 2, 3].map(i => {
                          const lbl = results[selectedRow.Mfg_Part_Num][`attr_${i}_label`];
                          const val = results[selectedRow.Mfg_Part_Num][`attr_${i}_value`];
                          const uom = results[selectedRow.Mfg_Part_Num][`attr_${i}_uom`];
                          if (!lbl) return null;
                          return (
                            <div className="raw-field" key={i} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-main)', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)'}}>
                              <span style={{fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase'}}>{lbl}</span>
                              <span style={{fontSize: '0.875rem', fontWeight: 600}}>{val} {uom}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* --- TAXONOMY MAPPER TAB --- */}
        {activeTab === 'taxonomy' && (
          <div className="panel" style={{padding: '3rem', minHeight: '60vh'}}>
             <div style={{textAlign: 'center', marginBottom: '3rem'}}>
              <Network size={48} color="var(--border-color)" style={{margin: '0 auto 1.5rem'}} />
              <h2 style={{fontSize: '1.5rem', marginBottom: '1rem'}}>AI Category Organizer</h2>
              <p style={{color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '0.875rem'}}>
                IndusSync automatically moves items from messy supplier folders into your clean, organized store categories.
              </p>
            </div>

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', marginTop: '3rem'}}>
               {/* Vendor Category */}
               <div style={{background: 'var(--bg-main)', border: '1px dashed var(--error)', padding: '1.5rem', borderRadius: '8px', width: '250px'}}>
                  <div style={{fontSize: '0.75rem', fontWeight: 600, color: 'var(--error)', textTransform: 'uppercase', marginBottom: '0.5rem'}}>Messy Supplier Folder</div>
                  <div style={{fontSize: '1rem', fontWeight: 600}}>Elec. Supp / Wire / Cu</div>
                  <div style={{marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)'}}>Hard to read, weird abbreviations.</div>
               </div>
               
               <ArrowRight size={24} color="var(--text-secondary)" />

               {/* IndusSync Mapping Node */}
               <div style={{background: 'var(--bg-hover)', border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: '8px', width: '250px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
                    <Sparkles size={16} color="var(--success)"/>
                    <span style={{fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--success)'}}>AI Thinking...</span>
                  </div>
                  <div style={{fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.5}}>Understanding the true meaning of the messy text to find a match.</div>
               </div>

               <ArrowRight size={24} color="var(--text-secondary)" />

               {/* Master Taxonomy */}
               <div style={{background: 'var(--bg-main)', border: '1px solid var(--success)', padding: '1.5rem', borderRadius: '8px', width: '300px'}}>
                  <div style={{fontSize: '0.75rem', fontWeight: 600, color: 'var(--success)', textTransform: 'uppercase', marginBottom: '0.5rem'}}>Clean Store Path</div>
                  <div style={{fontSize: '1rem', fontWeight: 600}}>Electrical Equipment</div>
                  <div style={{fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)', paddingLeft: '1rem', borderLeft: '1px solid var(--border-color)', margin: '0.5rem 0'}}>Wire & Cable</div>
                  <div style={{fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)', paddingLeft: '2rem', borderLeft: '1px solid var(--border-color)'}}>Copper Building Wire</div>
               </div>
            </div>
          </div>
        )}

        {/* --- ANALYTICS TAB --- */}
        {activeTab === 'analytics' && (
          <div className="panel" style={{padding: '3rem', textAlign: 'center'}}>
            <BarChart size={64} color="var(--border-color)" style={{margin: '0 auto 1.5rem'}} />
            <h2 style={{fontSize: '1.5rem', marginBottom: '1rem'}}>Data Health Report</h2>
            <p style={{color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem'}}>
              Out of the 1,000 items we checked, we found these major errors that need to be fixed before they go live on your store.
            </p>

            <div className="metrics-grid" style={{textAlign: 'left'}}>
              <div className="metric-card">
                <div className="metric-title">Descriptions Too Short</div>
                <div className="metric-value" style={{color: 'var(--warning)'}}>
                  {data.filter(r => validateRow(r).includes("Description too short")).length}
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-title">Missing Manufacturer</div>
                <div className="metric-value" style={{color: 'var(--error)'}}>
                  {data.filter(r => validateRow(r).includes("Missing exact Manufacturer")).length}
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-title">Fake Brand Names</div>
                <div className="metric-value" style={{color: 'var(--error)'}}>
                  {data.filter(r => validateRow(r).includes("Contains placeholder 'Unbranded'")).length}
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-title">Fixed by AI</div>
                <div className="metric-value" style={{color: 'var(--success)'}}>
                  {Object.keys(results).length}
                </div>
              </div>
            </div>

            <div style={{padding: '2rem', background: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)', textAlign: 'left'}}>
              <h3 style={{fontSize: '1rem', marginBottom: '1rem'}}>Our Advice</h3>
              <p style={{fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6'}}>
                The data you received is full of errors and placeholder text. By clicking the <strong style={{color: 'var(--text-primary)'}}>Batch Enrich</strong> button, IndusSync will automatically read the messy text, find hidden specs like Voltage, fix the brand names, and give you perfectly clean data ready for your customers!
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
