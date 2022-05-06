import React from 'react';
import { useAuth } from 'hooks/useAuth';
import { useRoutes } from 'hooks/useRoutes';
import { Layout } from 'components/Layout';

const App = () => {
    const { isSignedIn } = useAuth();
    const routes = useRoutes(isSignedIn);

    return <Layout>{routes}</Layout>;
};

export default App;
