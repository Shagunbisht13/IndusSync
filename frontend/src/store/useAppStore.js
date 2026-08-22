import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockData as initialParts } from '../data/mockData';

const useAppStore = create(
  persist(
    (set, get) => ({
      // --- Auth & User State ---
      user: null, // { name, role, email }
      login: (userData) => set({ user: userData }),
      logout: () => set({ user: null }),

      // --- Parts Catalog State ---
      parts: initialParts,
      
      updatePartStatus: (id, newStatus) => set((state) => {
        const updatedParts = state.parts.map(p => 
          p.id === id ? { ...p, status: newStatus } : p
        );
        return { parts: updatedParts };
      }),
      
      acceptAIFix: (id) => set((state) => {
        const updatedParts = state.parts.map(p => {
          if (p.id === id && p.status === 'fixed_by_ai') {
            return {
              ...p,
              status: 'export_ready',
              Part_Desc: p.enriched_data?.short_desc || p.Part_Desc,
              errors: [],
            };
          }
          return p;
        });
        
        // Add audit log
        get().addAuditLog({
          type: 'manual',
          action: `Admin accepted AI fix for ${id}`,
          user: state.user?.name || 'Admin',
        });
        
        return { parts: updatedParts };
      }),
      
      addParts: (newParts) => set((state) => {
        get().addAuditLog({
          type: 'manual',
          action: `Bulk imported ${newParts.length} parts`,
          user: state.user?.name || 'Admin',
        });
        return { parts: [...newParts, ...state.parts] };
      }),

      // --- Audit Log State ---
      auditLogs: [
        { type: 'ai', action: 'AI Enriched Part P-1001', user: 'System', time: new Date(Date.now() - 600000).toISOString() },
        { type: 'manual', action: 'Admin approved classification for P-1012', user: 'Admin', time: new Date(Date.now() - 3600000).toISOString() },
      ],
      
      addAuditLog: (log) => set((state) => ({
        auditLogs: [{ ...log, time: new Date().toISOString() }, ...state.auditLogs]
      })),

      // --- Suppliers State ---
      suppliers: [
        { id: 'S1', name: 'SKF Bearings Ltd.', status: 'Active', items: 1245, contact: 'sales@skf.com' },
        { id: 'S2', name: 'Fastenal', status: 'Syncing...', items: 8430, contact: 'support@fastenal.com' },
        { id: 'S3', name: 'Siemens Industrial', status: 'Active', items: 450, contact: 'b2b@siemens.com' }
      ],

      // --- Inventory State (mock) ---
      inventory: [
        { id: 'INV-1', partId: 'P-1001', stock: 120, reorderPoint: 50, location: 'Warehouse A' },
        { id: 'INV-2', partId: 'P-1002', stock: 15, reorderPoint: 20, location: 'Warehouse B' } // Low stock
      ]
    }),
    {
      name: 'indussync-storage', // name of the item in the storage (must be unique)
      partialize: (state) => ({ 
        user: state.user, 
        parts: state.parts,
        auditLogs: state.auditLogs,
        suppliers: state.suppliers,
        inventory: state.inventory
      }),
    }
  )
);

export default useAppStore;
