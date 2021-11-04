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
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
