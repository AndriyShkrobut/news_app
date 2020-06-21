import { useMemo } from 'react';
import { useParams, useLocation, useHistory, useRouteMatch } from 'react-router-dom';

export const useRouter = () => {
    const params = useParams();
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();

    return useMemo(
        () => ({
            push: history.push,
            replace: history.replace,
            pathName: location.pathname,
            query: {
                ...params,
            },
            match,
            location,
            history,
        }),
        [history, location, params, match],
    );
};
