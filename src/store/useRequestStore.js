import { create } from "zustand";
import toast from "react-hot-toast";
// import { useAuthStore } from "./useAuthStore";
import { axiosInstance } from "../lib/axios";

export const RequestStatus = {
  PENDING: "p",
  ACCEPTED: "a",
  REJECTED: "r",
  CANCELED: "c",
};

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
      const res = await axiosInstance.get("/request/all-friends");
      set({ friends: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isFriendsLoading: false });
    }
  },

  getSearchResults: async (searchItem) => {
    set({ isSearchResultsLoading: true });
    try {
      const res = await axiosInstance.post("/request/search", searchItem);
      set({ searchResults: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSearchResultsLoading: false });
    }
  },

  sendFriendRequest: async (userId) => {
    const requests = get();
    try {
      const res = await axiosInstance.post(`/request/send-request/${userId}`);
      set({ requests: [...requests, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  unfriendUser: async (friendId) => {
    const friends = get();
    try {
      const res = await axiosInstance.post(`/request/unfriend`, friendId);
      set({ friends: [...friends, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  acceptFriendRequest: async (friendId) => {
    const friends = get();
    try {
      const res = await axiosInstance.put(
        `/request/accept-request/:${friendId}`
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
        `/request/reject-request/:${friendId}`
      );
      set({ friends: [...friends, res.data] });
    } catch (error) {
      toast.error(error.reponse.data.message);
    }
  },

  cancelFriendRequest: async (userId) => {
    const { requests } = get();
    try {
      await axiosInstance.post(`/request/cancel-request/${userId}`);
      set({ requests: requests.filter((r) => r.receiverId !== userId) });
      toast.success("Friend request cancelled!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));
