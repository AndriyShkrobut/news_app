import React, { useState } from 'react';
import { useRouter } from 'hooks/useRouter';
import { useRequest } from 'hooks/useRequest';
import { Input } from 'components/Input';
import Button from 'components/Button';
import { HttpMethod } from 'consts';

export const PostCreatePage = () => {
    const [post, setPost] = useState({ text: '', imagePath: '' });
    const { goBack, push } = useRouter();
    const { request } = useRequest();

    const onChange = event => {
        const { name, value } = event.target;

        setPost({ ...post, [name]: value });
    };

    const onSubmit = async event => {
        event.preventDefault();
        const { text } = post;

        const tags = text.match(/#[\w\d]+/g);

        const response = await request(`/posts`, HttpMethod.POST, {
            ...post,
            likes: [],
            tags: tags ? tags.map(tag => tag.replace('#', '')) : [],
        });

        if (response) {
            push('/home');
        }
    };

    const { text, imagePath } = post;

    return (
        <form onSubmit={onSubmit}>
            <Input type="text" name="text" labelText="Post Text" onChange={onChange} value={text} />
            <Input type="text" name="imagePath" labelText="Image Path" onChange={onChange} value={imagePath} />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button disabled={!text.length && !imagePath.length}>Create Post</Button>
                <Button variant="secondary" type="button" onClick={() => goBack()}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};
