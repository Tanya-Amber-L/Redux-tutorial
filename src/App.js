import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import { Navbar } from "./app/Navbar";

import { PostsList } from "../src/features/posts/postsList.js";
import { AddPostForm } from "./features/posts/addPostForm";
import { SinglePostPage } from "./features/posts/singlePostPage";
import { EditPostForm } from "./features/posts/editPostForm";

function App() {
    return (
        <Router>
            <Navbar />
            <div className="App">
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <>
                                <AddPostForm />
                                <PostsList />
                            </>
                        )}
                    />
                    <Route
                        exact
                        path="/posts/:postId"
                        component={SinglePostPage}
                    />
                    <Route
                        exact
                        path="/editPost/:postId"
                        component={EditPostForm}
                    />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
