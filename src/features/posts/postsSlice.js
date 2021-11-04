import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: "1", title: "First Post!", content: "Hello!" },
    { id: "2", title: "Second Post", content: "More text" },
];

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded(state, action) {
            state.push(action.payload);
            // IMMUTABILITY : don't try to mutate any data outside of createSlice()!
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload;
            const existingPost = state.find((post) => post.id === id);
            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
            }
        },
    },
});

export const { postAdded, postUpdated } = postsSlice.actions;
// When we write the postAdded reducer function, createSlice will automatically generate an "action creator" function with the same name.
// We can export that action creator and use it in our UI components to dispatch the action when the user clicks "Save Post".

export default postsSlice.reducer;
