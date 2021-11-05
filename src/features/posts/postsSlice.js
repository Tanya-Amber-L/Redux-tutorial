import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const initialState = {
    posts: [],
    status: "idle",
    error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const response = await client.get("/fakeApi/posts");
    return response.data;
});
// createAsyncThunk accepts two arguments:
// A string that will be used as the prefix for the generated action types
// A "payload creator" callback function that should return a Promise containing some data, or a rejected Promise with an error

export const addNewPost = createAsyncThunk(
    "posts/addNewPost",
    // The payload creator receives the partial `{title, content, user}` object
    async (initialPost) => {
        // We send the initial data to the fake API server
        const response = await client.post("/fakeApi/posts", initialPost);
        // The response includes the complete post object, including unique ID
        return response.data;
    }
);

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload);
                // IMMUTABILITY : don't try to mutate any data outside of createSlice()!
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user: userId,
                    },
                };
            },
        },
        //  The "prepare callback" function can take multiple arguments, generate random values like unique IDs, and run whatever other synchronous logic is needed to decide what values go into the action object.
        // It should then return an object with the payload field inside.

        postUpdated(state, action) {
            const { id, title, content } = action.payload;
            const existingPost = state.posts.find((post) => post.id === id);
            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                // Add any fetched posts to the array
                state.posts = state.posts.concat(action.payload);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });

        builder.addCase(addNewPost.fulfilled, (state, action) => {
            // We can directly add the new post object to our posts array
            state.posts.push(action.payload);
        });
    },
});

export const { postAdded, postUpdated } = postsSlice.actions;
// When we write the postAdded reducer function, createSlice will automatically generate an "action creator" function with the same name.
// We can export that action creator and use it in our UI components to dispatch the action when the user clicks "Save Post".

export default postsSlice.reducer;

export const selectAllPosts = (state) => state.posts.posts;

export const selectPostById = (state, postId) =>
    state.posts.posts.find((post) => post.id === postId);
