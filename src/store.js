import create from "zustand";

const useStore = create((set, get) => ({
  modal: "",
  closeModal: () => set({ modal: "" }),
  setModal: (target) => set({ modal: target }),
  loginUser: null,
  logoutUser: () => set({ loginUser: null }),
  setLoginUser: (newRegUser) => set({ loginUser: newRegUser }),
}));

export default useStore;
