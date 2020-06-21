import { useContext, useEffect, useReducer, useCallback } from 'react';
import JwtDecode from 'jwt-decode';
import { AuthContext } from 'context/AuthContext';
import axios from 'axios';

const ACCESS_TOKEN__KEY = 'access_token';
const REFRESH_TOKEN__KEY = 'refresh_token';

const initialState = { token: '', refresh: '', userId: '', isSignedIn: false };

const reducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'SIGN_IN': {
            const { token, refresh } = payload;

            localStorage.setItem(ACCESS_TOKEN__KEY, token);
            localStorage.setItem(REFRESH_TOKEN__KEY, refresh);

            return { ...payload, isSignedIn: true };
        }
        case 'SIGN_OUT': {
            localStorage.removeItem(ACCESS_TOKEN__KEY);
            localStorage.removeItem(REFRESH_TOKEN__KEY);

            return { token: '', refresh: '', userId: '', isSignedIn: false };
        }
        default:
            return state;
    }
};

export const useProvideAuth = () => {
    const [{ token, refresh, userId, isSignedIn }, dispatch] = useReducer(reducer, initialState);

    const signIn = ({ accessToken, refreshToken }) => {
        const { id } = JwtDecode(accessToken);

        dispatch({ type: 'SIGN_IN', payload: { token: accessToken, refresh: refreshToken, userId: id } });
    };

    const signOut = () => dispatch({ type: 'SIGN_OUT' });

    const tokenRefesh = useCallback(async token => {
        const { exp, id } = JwtDecode(token);

        const isTokenValid = Date.now() < exp * 1000;
        try {
            if (isTokenValid) {
                const { data: authData } = await axios.post('/auth/token/refresh', {
                    refreshToken: token,
                });

                const { accessToken, refreshToken } = authData;

                dispatch({ type: 'SIGN_IN', payload: { token: accessToken, refresh: refreshToken, userId: id } });

                return authData;
            } else {
                throw new Error('Invalid Token');
            }
        } catch (error) {
            dispatch({ type: 'SIGN_OUT' });
            return Promise.reject(error);
        }
    }, []);

    useEffect(() => {
        const storedToken = localStorage.getItem(ACCESS_TOKEN__KEY);
        const storedRefresh = localStorage.getItem(REFRESH_TOKEN__KEY);

        if (storedToken) {
            const { exp, id } = JwtDecode(storedToken);
            const isTokenValid = Date.now() < exp * 1000;

            if (isTokenValid) {
                dispatch({ type: 'SIGN_IN', payload: { token: storedToken, refresh: storedRefresh, userId: id } });
            } else {
                tokenRefesh(storedRefresh).catch(console.error);
            }
        }
    }, [isSignedIn, tokenRefesh]);

    return { signIn, signOut, tokenRefesh, isSignedIn, token, refresh, userId };
};

export const useAuth = () => useContext(AuthContext);
