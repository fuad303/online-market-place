import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string;
  email: string;
  profileImage?: string;
}

const loadUserFromLocalStorage = (): UserState | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const initialState: UserState | null = loadUserFromLocalStorage();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      const user = action.payload;
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    },
    clearUser: () => {
      localStorage.removeItem("user");
      return null;
    },
    updateProfileImage: (state, action: PayloadAction<string | undefined>) => {
      if (state) {
        state.profileImage = action.payload;
        localStorage.setItem("user", JSON.stringify(state));
      }
    },
  },
});

export const { setUser, clearUser, updateProfileImage } = userSlice.actions;

export default userSlice.reducer;
