import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
    userId: string;
    email: string;
    number: string,
    role: string;
    iat: number;
    exp: number;
  };

type TAuthState = {
    user: null | TUser;
    token: null | string;
  };

const initialState: TAuthState = {
    user: null,
    token: null,
  };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const {user, token} = action.payload;
            state.user = user;
            state.token = token;
        }
    }
})



export const { setUser } = authSlice.actions;

export default authSlice.reducer;
export const useCurrentUser = (state: RootState) => state.auth.user;
export const useCurrentToken = (state: RootState) => state.auth.token;