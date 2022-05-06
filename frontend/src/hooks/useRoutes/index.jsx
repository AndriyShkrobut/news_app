import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from 'pages/Home';
import SignInPage from 'pages/SignIn';
import { SignUpPage } from 'pages/SignUp';
import { PostEditPage } from 'pages/PostEdit';
import { PostCreatePage } from 'pages/PostCreate';
import { UserPage } from 'pages/User';

export const useRoutes = isSignedIn => {
    if (isSignedIn) {
        return (
            <Switch>
                <Route path="/home" component={HomePage} />
                <Route path="/posts/create" component={PostCreatePage} />
                <Route path="/posts/:postId/edit" component={PostEditPage} />
                <Route path="/user/:userId" component={UserPage} />
                <Redirect to="/home" />
            </Switch>
        );
    } else {
        return (
            <Switch>
                <Route path="/signin" component={SignInPage} />
                <Route path="/signup" component={SignUpPage} />
                <Redirect to="/signin" />
            </Switch>
        );
    }
};
