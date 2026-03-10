import { create } from 'zustand';

interface AppState {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  visibleProjects: number;
  showMoreProjects: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isMobileMenuOpen: false,
  setIsMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  visibleProjects: 6,
  showMoreProjects: () => set((state) => ({ visibleProjects: state.visibleProjects + 6 })),
}));
