import { createContext } from 'react';

export const AuthContext = createContext({
    signIn: () => {},
    signOut: () => {},
    tokenRefesh: () => {},
    isSignedIn: false,
    token: '',
    refresh: '',
    userId: '',
});
