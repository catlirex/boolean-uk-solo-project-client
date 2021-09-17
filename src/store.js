import create from "zustand";

const useStore = create((set, get) => ({
  modal: "",
  closeModal: () => set({ modal: "" }),
  setModal: (target) => set({ modal: target }),
  loginUser: null,
  logoutUser: () => set({ loginUser: null }),
  setLoginUser: (newRegUser) => set({ loginUser: newRegUser }),
  selectedChannel: null,
  setSelectedChannel: (channelDetail) =>
    set({ selectedChannel: channelDetail }),
  selectedChannelPosts: null,
  setSelectChannelPost: (posts) => set({ selectedChannelPosts: posts }),
  errorMsg: null,
  setErrorMsg: (error) => set({ errorMsg: error }),
  clearErrorMsg: () => set({ errorMsg: null }),
}));

export default useStore;
