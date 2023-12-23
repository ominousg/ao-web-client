import { create } from "zustand";

const useUIStore = create(set => ({
  popups: {},
  openPopup: (popupName) => set(state => ({ popups: { ...state.popups, [popupName]: true } })),
  closePopup: (popupName) => set(state => ({ popups: { ...state.popups, [popupName]: false } })),
}));

export default useUIStore;
