import React, { useState, useEffect, useMemo } from 'react';
import { Database, Zap, Sparkles, Server, CheckCircle, Loader2, Search, Download, LayoutDashboard, BarChart, CheckSquare, AlertTriangle, Network, ArrowRight, ChevronRight, Activity } from 'lucide-react';
import './index.css';

export default function App() {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [enriching, setEnriching] = useState(false);
  const [results, setResults] = useState({});
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/data')
      .then(res => res.json())
      .then(json => {
        setData(json.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    const lowerQ = searchQuery.toLowerCase();
    return data.filter(r => 
      String(r.Mfg_Part_Num || '').toLowerCase().includes(lowerQ) ||
      String(r.Part_Desc || '').toLowerCase().includes(lowerQ) ||
      String(r.Part_Manuf || '').toLowerCase().includes(lowerQ)
    );
  }, [data, searchQuery]);

  const validateRow = (row) => {
    const issues = [];
    if (!row.Part_Desc || row.Part_Desc.length < 10) issues.push("Description too short");
    if (row.Part_Desc && row.Part_Desc.includes("Unbranded")) issues.push("Contains placeholder");
    if (row.Part_Manuf && row.Part_Manuf.includes("-- No")) issues.push("Missing Manufacturer");
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
        body: JSON.stringify({ row: rowToProcess, api_key: "demo" }) 
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
    if (unEnriched.length === 0) return;
    
    for (const row of unEnriched) {
      await handleEnrich(row);
      await new Promise(r => setTimeout(r, 1000));
    }
  };

  const stats = useMemo(() => ({
    total: data.length,
    fixed: Object.keys(results).length,
    needsFixing: Math.max(0, data.length - Object.keys(results).length),
    health: data.length ? Math.round((Object.keys(results).length / data.length)*100) : 0
  }), [data, results]);

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <nav className="top-nav">
        <div className="nav-brand">
          <div className="brand-logo"><Zap size={20} /></div>
          <span className="brand-text">IndusSync</span>
        </div>
        <div className="nav-search">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search catalog..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="nav-actions">
           <button className="btn-outline" onClick={handleBatchEnrich} disabled={enriching || data.length === 0}>
             {enriching ? <Loader2 size={16} className="spin" /> : <Sparkles size={16} />}
             Auto-Enrich (3)
           </button>
           <div className="avatar">A</div>
        </div>
      </nav>

      <div className="main-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="menu-group">
            <div className="menu-label">Workspace</div>
            <button className={`menu-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
              <LayoutDashboard size={18} /> Overview
            </button>
            <button className={`menu-item ${activeTab === 'studio' ? 'active' : ''}`} onClick={() => setActiveTab('studio')}>
              <Activity size={18} /> Enrichment Studio
            </button>
            <button className={`menu-item ${activeTab === 'taxonomy' ? 'active' : ''}`} onClick={() => setActiveTab('taxonomy')}>
              <Network size={18} /> Category Map
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="content-area">
          <div className="content-header">
            <div className="header-titles">
              <h1 className="page-title">
                {activeTab === 'overview' && 'Catalog Overview'}
                {activeTab === 'studio' && 'Enrichment Studio'}
                {activeTab === 'taxonomy' && 'Category Taxonomy'}
              </h1>
              <p className="page-subtitle">
                {activeTab === 'overview' && 'Analyze, filter, and monitor the health of your raw industrial dataset.'}
                {activeTab === 'studio' && 'Transform messy supplier data into commerce-ready specifications.'}
                {activeTab === 'taxonomy' && 'Automated classification of industrial parts.'}
              </p>
            </div>
            {activeTab === 'overview' && (
              <div className="header-stats-mini">
                <div className="stat-badge"><CheckCircle size={14} color="#10b981"/> {stats.fixed} Fixed</div>
                <div className="stat-badge"><AlertTriangle size={14} color="#f59e0b"/> {stats.needsFixing} Pending</div>
              </div>
            )}
          </div>

          <div className="content-body">
            {loading ? (
              <div className="loading-state">
                <Loader2 size={48} className="spin text-blue" />
                <p>Loading Sample Dataset...</p>
              </div>
            ) : (
              <>
                {/* --- OVERVIEW --- */}
                {activeTab === 'overview' && (
                  <div className="fade-in">
                    <div className="hero-stats">
                      <div className="stat-card">
                        <div className="stat-label">Total SKUs</div>
                        <div className="stat-value">{stats.total}</div>
                        <div className="stat-sparkline bg-blue-100"></div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-label">AI Fixed</div>
                        <div className="stat-value text-success">{stats.fixed}</div>
                        <div className="stat-sparkline bg-success-100"></div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-label">Export Readiness</div>
                        <div className="stat-value">{stats.health}%</div>
                        <div className="stat-progress"><div className="progress-bar" style={{width: `${stats.health}%`}}></div></div>
                      </div>
                    </div>

                    <div className="table-card">
                      <div className="table-header">
                        <h3>Raw Dataset</h3>
                        <span className="badge">{filteredData.length} items</span>
                      </div>
                      <div className="table-responsive">
                        <table>
                          <thead>
                            <tr>
                              <th>Status</th>
                              <th>Part Number</th>
                              <th>Raw Description</th>
                              <th>Manufacturer</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredData.slice(0, 50).map((row, i) => {
                              const isEnriched = !!results[row.Mfg_Part_Num];
                              return (
                                <tr key={i} onClick={() => { setSelectedRow(row); setActiveTab('studio'); }}>
                                  <td>
                                    {isEnriched ? <div className="status-pill success">Clean</div> : <div className="status-pill warning">Raw</div>}
                                  </td>
                                  <td className="font-mono text-sm">{row.Mfg_Part_Num}</td>
                                  <td className="truncate max-w-xs" title={row.Part_Desc}>{row.Part_Desc}</td>
                                  <td>{row.Part_Manuf}</td>
                                  <td>
                                    <button className="btn-icon"><ChevronRight size={16} /></button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* --- STUDIO --- */}
                {activeTab === 'studio' && (
                  <div className="fade-in h-full">
                    {!selectedRow ? (
                      <div className="empty-state">
                        <div className="empty-icon"><Database size={48} /></div>
                        <h3>No Row Selected</h3>
                        <p>Select a row from the Overview tab to enrich.</p>
                        <button className="btn-primary mt-4" onClick={() => setActiveTab('overview')}>Go to Overview</button>
                      </div>
                    ) : (
                      <div className="studio-grid">
                        <div className="studio-panel raw-panel">
                          <div className="panel-header">
                            <h3>Raw Input</h3>
                            <span className="badge bg-warning text-white">Untrusted</span>
                          </div>
                          <div className="field-group">
                            <label>Part Number</label>
                            <div className="field-value font-mono">{selectedRow.Mfg_Part_Num}</div>
                          </div>
                          <div className="field-group">
                            <label>Description</label>
                            <div className="field-value">{selectedRow.Part_Desc}</div>
                          </div>
                          <div className="field-group">
                            <label>Manufacturer</label>
                            <div className="field-value">{selectedRow.Part_Manuf}</div>
                          </div>
                          
                          <div className="action-area">
                            <button className="btn-primary w-full shadow-glow" onClick={() => handleEnrich()} disabled={enriching}>
                              {enriching ? <><Loader2 size={18} className="spin"/> Synthesizing...</> : <><Sparkles size={18}/> Synthesize Data</>}
                            </button>
                          </div>
                        </div>

                        <div className="studio-panel ai-panel">
                          <div className="panel-header">
                            <h3>AI Output</h3>
                            {results[selectedRow.Mfg_Part_Num] && <span className="badge bg-success text-white">Commerce Ready</span>}
                          </div>
                          
                          {!results[selectedRow.Mfg_Part_Num] && !enriching && (
                            <div className="waiting-state">
                              <Sparkles size={32} className="text-blue-300 mb-2"/>
                              <p>Waiting for AI Synthesis</p>
                            </div>
                          )}

                          {enriching && (
                            <div className="waiting-state">
                              <Loader2 size={32} className="spin text-blue-500 mb-2"/>
                              <p className="animate-pulse text-blue-600">Extracting specifications...</p>
                            </div>
                          )}

                          {results[selectedRow.Mfg_Part_Num] && !enriching && (
                            <div className="results-content fade-in">
                              <div className="result-grid">
                                <div className="field-group highlight">
                                  <label>Optimized Title</label>
                                  <div className="field-value">{results[selectedRow.Mfg_Part_Num].short_desc}</div>
                                </div>
                                <div className="field-group highlight">
                                  <label>Manufacturer</label>
                                  <div className="field-value">{results[selectedRow.Mfg_Part_Num].manufacture_name}</div>
                                </div>
                              </div>
                              
                              <div className="field-group mt-4">
                                <label>Marketing Description</label>
                                <div className="field-value text-sm whitespace-pre-wrap">{results[selectedRow.Mfg_Part_Num].long_desc}</div>
                              </div>

                              <div className="specs-container mt-6">
                                <h4>Extracted Specifications</h4>
                                <div className="specs-list">
                                  {[1, 2, 3].map(i => {
                                    const lbl = results[selectedRow.Mfg_Part_Num][`attr_${i}_label`];
                                    const val = results[selectedRow.Mfg_Part_Num][`attr_${i}_value`];
                                    const uom = results[selectedRow.Mfg_Part_Num][`attr_${i}_uom`];
                                    if (!lbl) return null;
                                    return (
                                      <div className="spec-item" key={i}>
                                        <span className="spec-label">{lbl}</span>
                                        <span className="spec-value">{val} {uom}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* --- TAXONOMY --- */}
                {activeTab === 'taxonomy' && (
                  <div className="fade-in">
                     <div className="taxonomy-flow">
                        <div className="flow-card">
                          <h4>Supplier String</h4>
                          <div className="code-block">Elec. Supp / Wire / Cu</div>
                        </div>
                        <ArrowRight size={24} className="text-blue-300" />
                        <div className="flow-card active-flow">
                          <Sparkles size={20} className="text-blue-500" />
                          <h4>IndusSync Engine</h4>
                          <p>Semantic Mapping</p>
                        </div>
                        <ArrowRight size={24} className="text-blue-300" />
                        <div className="flow-card success-flow">
                          <h4>Master Taxonomy</h4>
                          <div className="path">Electrical &gt; Wire &gt; Copper Building Wire</div>
                        </div>
                     </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
