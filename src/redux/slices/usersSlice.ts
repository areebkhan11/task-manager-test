import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { gql } from "@apollo/client";
import client from "../../app/graphql/client"; // Ensure Apollo Client is set up

// Define TypeScript types
interface User {
  id: string;
  name: string;
  email: string;
}

interface UsersState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Define GraphQL query
const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      email
    }
  }
`;

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk<User[], void>(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await client.query({ query: GET_ALL_USERS });
      console.log(data, "<----data");
      return data.users;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState: UsersState = {
  users: [],
  status: "idle",
  error: null,
};

// Create users slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default usersSlice.reducer;
