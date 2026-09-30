import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIStore {
  isSidebarOpen: boolean;
  isCartDrawerOpen: boolean;
  isMobileMenuOpen: boolean;
  isChatOpen: boolean;
  toggleSidebar: () => void;
  toggleCartDrawer: () => void;
  toggleMobileMenu: () => void;
  toggleChat: () => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      isSidebarOpen: false,
      isCartDrawerOpen: false,
      isMobileMenuOpen: false,
      isChatOpen: false,
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      toggleCartDrawer: () => set((state) => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),
      toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
      toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
    }),
    { name: 'ui-storage' }
  )
);
