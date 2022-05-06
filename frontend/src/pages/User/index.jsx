import React, { useEffect, useState } from 'react';
import { useRouter } from 'hooks/useRouter';
import { useAuth } from 'hooks/useAuth';
import { useRequest } from 'hooks/useRequest';
import Button from 'components/Button';
import { HttpMethod } from 'consts';
import { Link } from 'react-router-dom';

export const UserPage = () => {
    const [user, setUser] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const { userId: currentUserId } = useAuth();
    const { request } = useRequest();
    const { query } = useRouter();
    const { userId } = query;

    useEffect(() => {
        const getUser = async id => {
            const response = await request(`/user/${id}`);

            if (response) {
                setUser(response);
            }
        };

        const getSuggestions = async () => {
            const response = await request('/user/suggestions');

            if (response) {
                setSuggestions(response);
            }
        };

        getUser(userId);

        if (userId === currentUserId) {
            getSuggestions();
        }
    }, [userId, request, currentUserId]);

    const followUser = async id => {
        const response = await request(`/user/${id}/follow`, HttpMethod.POST);

        if (response) {
            console.log(response);
            setUser(response[1]);
        }
    };

    const unFollowUser = async id => {
        const response = await request(`/user/${id}/unfollow`, HttpMethod.POST);

        if (response) {
            console.log(response);
            setUser(response[1]);
        }
    };

    if (!user) {
        return <h1>No User Data</h1>;
    }

    const isCurrentUser = userId === currentUserId;

    const { firstname, lastname, followers, _id } = user;
    console.log(suggestions);
    console.log('here');
    return (
        <div>
            <h1>
                {firstname} {lastname}
            </h1>
            {!isCurrentUser &&
                (followers.includes(currentUserId) ? (
                    <Button onClick={() => unFollowUser(_id)}>Unfollow</Button>
                ) : (
                    <Button onClick={() => followUser(_id)}>Follow</Button>
                ))}
            <div>
                <h2>{user.followers.length} followers</h2>
                <h2>{user.following.length} following</h2>
            </div>
            {isCurrentUser &&
                suggestions.length &&
                suggestions.map(suggestedUser => (
                    <div
                        key={suggestedUser._id}
                        style={{
                            borderRadius: '10px',
                            boxShadow: '1px 1px 15px var(--grey)',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '1rem',
                        }}
                    >
                        <div>
                            <h3>
                                <Link to={{ pathname: `/user/${suggestedUser._id}` }}>
                                    {suggestedUser.firstname} {suggestedUser.lastname}
                                </Link>
                            </h3>
                        </div>
                        <div>
                            <h4>{suggestedUser.followers.length} followers</h4>
                            <h4>{suggestedUser.following.length} following</h4>
                        </div>
                    </div>
                ))}
        </div>
    );
};
