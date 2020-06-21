import React from 'react';
import Button from 'components/Button';
import { useAuth } from 'hooks/useAuth';
import { useRequest } from 'hooks/useRequest';
import { HttpMethod } from 'consts';

const HomePage = () => {
    const { isSignedIn, signOut } = useAuth();
    const { request } = useRequest();

    const getPosts = async () => {
        const response = await request('/posts?sort=-createdAt');
        console.log(response);
    };

    const onClick = async () => {
        const response = await request('/auth/signout', HttpMethod.POST);

        if (response) {
            signOut();
        }
    };

    return (
        <>
            <Button disabled={!isSignedIn} onClick={onClick}>
                Sign Out
            </Button>
            <Button disabled={!isSignedIn} onClick={getPosts}>
                Get Posts
            </Button>
        </>
    );
};

export default HomePage;
