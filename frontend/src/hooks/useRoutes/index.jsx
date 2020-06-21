import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from 'pages/Home';
import SignInPage from 'pages/SignIn';

export const useRoutes = isSignedIn => {
    if (isSignedIn) {
        return (
            <Switch>
                <Route path="/home" component={HomePage} />
                <Redirect to="/home" />
            </Switch>
        );
    } else {
        return (
            <Switch>
                <Route exact path="/signin" component={SignInPage} />
                <Redirect to="/signin" />
            </Switch>
        );
    }
};
