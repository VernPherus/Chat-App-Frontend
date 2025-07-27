import { create } from "zustand";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
import { axiosInstance } from "../lib/axios";

export const useRequestStore = create((set, get) => ({
  requests: [],
  friends: [],
  searchResults: [],
  isFriendRequestsLoading: false,
  isFriendsLoading: false,

  getFriendRequests: async () => {
    set({ isFriendRequestsLoading: true });
    try {
      const res = await axiosInstance.get("/request/all-requests");
      set({ requests: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isFriendRequestsLoading: false });
    }
  },

  getFriends: async () => {
    set({ isFriendsLoading: true });
    try {
      const res = await axiosInstance.get("/requests/all-friends");
      set({ friends: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isFriendsLoading: false });
    }
  },

  getSearchResults: async () => {},

  sendFriendRequest: async () => {},
}));
