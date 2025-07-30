import { create } from "zustand";
import toast from "react-hot-toast";
// import { useAuthStore } from "./useAuthStore";
import { axiosInstance } from "../lib/axios";

export const useRequestStore = create((set, get) => ({
  requests: [],
  friends: [],
  searchResults: [],
  isSearchResultsLoading: false,
  isFriendRequestsLoading: false,
  isFriendsLoading: false,
  hasCheckedNotifications: false,
  hasNewNotifications: false,

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

  getSearchResults: async () => {
    set({ isSearchResultsLoading: true });
    try {
      const res = await axiosInstance.get("/requests/search");
      set({ searchResults: res });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSearchResultsLoading: false });
    }
  },

  sendFriendRequest: async (userId) => {
    const requests = get();
    try {
      const res = await axiosInstance.post(`/requests/send-request/${userId}`);
      set({ requests: [...requests, res.data] });
    } catch (error) {
      toast.error(error.reponse.data.message);
    }
  },

  unfriendUser: async (friendId) => {
    const friends = get();
    try {
      const res = await axiosInstance.post(`/requests/unfriend`, friendId);
      set({ friends: [...friends, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  acceptFriendRequest: async (friendId) => {
    const friends = get();
    try {
      const res = await axiosInstance.put(
        `/requests/accept-request/:${friendId}`
      );
      set({ friends: [...friends, res.data] });
    } catch (error) {
      toast.error(error.reponse.data.message);
    }
  },

  rejectFriendRequest: async (friendId) => {
    const friends = get();
    try {
      const res = await axiosInstance.put(
        `/requests/reject-request/:${friendId}`
      );
      set({ friends: [...friends, res.data] });
    } catch (error) {
      toast.error(error.reponse.data.message);
    }
  },

  cancelFriendRequest: async (friendId) => {
    const friends = get();
    try {
      const res = await axiosInstance.put(
        `/requests/reject-request/:${friendId}`
      );
      set({ friends: [...friends, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));
