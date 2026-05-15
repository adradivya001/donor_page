import { create } from 'zustand';

export const useUIStore = create((set) => ({
    isGrantModalOpen: false,
    isDonationModalOpen: false,
    
    toggleGrantModal: () => set((state) => ({ isGrantModalOpen: !state.isGrantModalOpen })),
    toggleDonationModal: () => set((state) => ({ isDonationModalOpen: !state.isDonationModalOpen })),
    
    closeAllModals: () => set({ isGrantModalOpen: false, isDonationModalOpen: false }),
}));
