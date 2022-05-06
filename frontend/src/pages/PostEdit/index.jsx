import React, { useState, useEffect } from 'react';
import { useRouter } from 'hooks/useRouter';
import { useRequest } from 'hooks/useRequest';
import { Input } from 'components/Input';
import Button from 'components/Button';
import { HttpMethod } from 'consts';

export const PostEditPage = () => {
    const [post, setPost] = useState(null);
    const [oldPost, setOldPost] = useState(null);
    const { query, goBack, push } = useRouter();
    const { request } = useRequest();
    const { postId } = query;

    useEffect(() => {
        if (postId) {
            const getPost = async id => {
                const response = await request(`/posts/${id}`);
                if (response) {
                    setPost(response);
                    setOldPost(response);
                }
            };

            getPost(postId);
        }
    }, [request, postId]);

    const onChange = event => {
        const { name, value } = event.target;

        setPost({ ...post, [name]: value });
    };

    const onSubmit = async event => {
        event.preventDefault();
        const { text } = post;

        const tags = text.match(/#[\w\d]+/g);

        const response = await request(`/posts/${postId}`, HttpMethod.PUT, {
            imagePath: post.imagePath,
            text: post.text,
            tags: tags ? tags.map(tag => tag.replace('#', '')) : [],
        });

        if (response) {
            push('/home');
        }
    };

    if (post && oldPost) {
        const { text = '', imagePath = '' } = post;

        return (
            <form onSubmit={onSubmit}>
                <Input type="text" name="text" labelText="Post Text" onChange={onChange} value={text} />
                <Input type="text" name="imagePath" labelText="Lastname" onChange={onChange} value={imagePath} />

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button disabled={text === oldPost.text && imagePath === oldPost.imagePath}>Edit Post</Button>
                    <Button variant="secondary" type="button" onClick={() => goBack()}>
                        Cancel
                    </Button>
                </div>
            </form>
        );
    } else {
        return 'No Post To Edit';
    }
};
