import { create } from 'zustand';

interface AppState {
  activeNode: string | null;
  setActiveNode: (node: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeNode: null,
  setActiveNode: (node) => set({ activeNode: node }),
}));
