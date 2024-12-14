import { create } from "zustand";
import { BASE_URL } from "../constants/utils";
import axios from "axios";

interface AuthState {
  user: {
    isVerified: any;
    username: string;
    email: string;
    password: string;
  } | null;
  isCheckingAuth: boolean;
  setUser: (user: {
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
  }) => void;
  checkAuth: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isCheckingAuth: true,
  setUser: (user) => set({ user }),
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const [authResponse, googleResposne] = await Promise.all([
        axios.get(`${BASE_URL}/auth/check-auth`, {
          withCredentials: true,
        }),
        axios.get(`${BASE_URL}/passport/auth/google/check`, {
          withCredentials: true,
        }),
      ]);
      const user = authResponse.data.user || googleResposne.data.user || null;

      set({
        user,
        isCheckingAuth: false,
      });
    } catch (error: any) {
      set({ isCheckingAuth: false, user: null });
      console.log(error);
    }
  },
}));

export default useAuthStore;
