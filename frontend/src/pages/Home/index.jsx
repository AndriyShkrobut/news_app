import React, { useEffect, useState } from 'react';
import { useRequest } from 'hooks/useRequest';
import { PostList } from 'components/PostList';

const HomePage = () => {
    const { request } = useRequest();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const response = await request('/posts?sort=-createdAt');

            if (response) setPosts(response);
        };

        getPosts();
    }, [request]);

    return <PostList posts={posts} />;
};

export default HomePage;
