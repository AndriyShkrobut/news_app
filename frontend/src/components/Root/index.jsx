import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import App from 'components/App';
import { AuthContext } from 'context/AuthContext';
import { useProvideAuth } from 'hooks/useAuth';
import { BASE_URL } from 'consts';

const Root = () => {
    useEffect(() => {
        axios.defaults.baseURL = BASE_URL;
        axios.defaults.validateStatus = status => status < 500;
    }, []);

    const authData = useProvideAuth();

    return (
        <AuthContext.Provider value={authData}>
            <Router>
                <App />
            </Router>
        </AuthContext.Provider>
    );
};

export default Root;
