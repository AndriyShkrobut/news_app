import React from 'react';
import PropTypes from 'prop-types';
import { PostItem } from './PostItem';

export const PostList = ({ posts = [] }) => {
    console.log(posts);

    return posts.map(post => <PostItem key={post._id} post={post} />);
};

PostList.propTypes = {
    posts: PropTypes.array,
};
