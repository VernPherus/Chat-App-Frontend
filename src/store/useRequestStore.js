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
      toast.error("Requests Failed to load: ", error.response.data.message);
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
      toast.error("Friends Failed to load: ", error.response.data.message);
    } finally {
      set({ isFriendsLoading: false });
    }
  },

  getSearchResults: async (searchItem) => {
    set({ isSearchResultsLoading: true });
    try {
      const res = await axiosInstance.post("/request/search", searchItem);
      set({ searchResults: res.data });
      return res.data;
    } catch (error) {
      toast.error("Search Results Failed: ", error.response.data.message);
      return [];
    } finally {
      set({ isSearchResultsLoading: false });
    }
  },

  clearSearchResults: async () => {
    set({ searchResults: [] });
  },

  sendFriendRequest: async (userId) => {
    const { requests } = get();
    try {
      const res = await axiosInstance.post(`/request/send-request/${userId}`);
      set({ requests: [...requests, res.data] });
      toast.success("Friend request sent!");
    } catch (error) {
      toast.error("Send FR Failed: ", error.response.data.message);
    }
  },

  unfriendUser: async (friendId) => {
    const { friends } = get();
    try {
      const res = await axiosInstance.put(`/request/unfriend`, friendId);
      set({ friends: [...friends, res.data] });
      toast.success("Unfriended user!");
    } catch (error) {
      toast.error("Unfriend Failed: " ,error.response.data.message);
    }
  },

  acceptFriendRequest: async (requestId) => {
    const { friends } = get();
    try {
      const res = await axiosInstance.put(
        `/request/accept-request/:${requestId}`
      );
      set({ friends: [...friends, res.data] });
      toast.success("Friend request accepted!");
    } catch (error) {
      toast.error("Accept Failed: ", error.reponse.data.message);
    }
  },

  rejectFriendRequest: async (requestId) => {
    const { friends } = get();
    try {
      const res = await axiosInstance.put(
        `/request/reject-request/:${requestId}`
      );
      set({ friends: [...friends, res.data] });
      toast.success("Friend request rejected!");
    } catch (error) {
      toast.error("Reject Failed: ", error.reponse.data.message);
    }
  },

  cancelFriendRequest: async (requestId) => {
    const { requests } = get();
    try {
      await axiosInstance.put(`/request/cancel-request/${requestId}`);
      set({ requests: requests.filter((r) => r.receiverId !== requestId) });
      toast.success("Friend request cancelled!");
    } catch (error) {
      toast.error("Cancel Failed: ", error.response.data.message);
    }
  },
}));
