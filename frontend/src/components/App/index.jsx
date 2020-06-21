import { useAuth } from 'hooks/useAuth';
import { useRoutes } from 'hooks/useRoutes';

const App = () => {
    const { isSignedIn } = useAuth();
    const routes = useRoutes(isSignedIn);

    return routes;
};

export default App;
