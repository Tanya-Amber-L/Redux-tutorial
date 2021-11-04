import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import { postAdded } from "./postsSlice";

export const AddPostForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    // Why UseState and not put that in store? =>
    // "Global state should go in the Redux store, local state should stay in React components"

    const dispatch = useDispatch();

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                postAdded({
                    id: nanoid(), // generates a random unique ID
                    title,
                    content,
                })
            );

            setTitle("");
            setContent("");
        }
    };

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button type="button" onClick={onSavePostClicked}>
                    Save Post
                </button>
            </form>
        </section>
    );
};