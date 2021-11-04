import React from "react";
import { useSelector } from "react-redux";

// React components can read data from the Redux store using the useSelector hook from the React-Redux library.
// The "selector functions" that you write will be called with the entire Redux state object as a parameter, and should return the specific data that this component needs from the store.

export const PostsList = () => {
    const posts = useSelector((state) => state.posts);

    const renderedPosts = posts.map((post) => (
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <p className="post-content">{post.content.substring(0, 100)}</p>
        </article>
    ));

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    );
};