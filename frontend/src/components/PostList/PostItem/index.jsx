import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import { useAuth } from 'hooks/useAuth';
import { Link } from 'react-router-dom';
import { useRequest } from 'hooks/useRequest';
import Button from 'components/Button';
import { Input } from 'components/Input';
import { HttpMethod } from 'consts';

export const PostItem = ({ post }) => {
    const initialNewComment = { text: '' };
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState(initialNewComment);
    const { userId } = useAuth();
    const { request } = useRequest();
    const { post__block } = styles;
    const { author, imagePath, text, _id: postId } = post;
    const { firstname, lastname, _id } = author;

    useEffect(() => {
        const getComments = async id => {
            const response = await request(`/posts/${id}/comments`);

            if (response) {
                setComments(response);
            }
        };

        getComments(postId);
    }, [postId, request]);

    const { text: newCommentText } = newComment;

    const onChange = event => {
        const { name, value } = event.target;

        setNewComment({ ...newComment, [name]: value });
    };

    const submitNewComment = async event => {
        event.preventDefault();
        const tags = newCommentText.match(/#[\w\d]+/g);

        const response = await request(`posts/${postId}/comments`, HttpMethod.POST, {
            ...newComment,
            tags: tags ? tags.map(tag => tag.replace('#', '')) : [],
        });

        if (response) {
            setNewComment(initialNewComment);
            setComments([...comments, response]);
        }
    };

    const deleteComment = async id => {
        const response = await request(`posts/${postId}/comments/${id}`, HttpMethod.DELETE);

        if (response) {
            setComments(comments.filter(comment => comment._id !== id));
        }
    };

    return (
        <div className={post__block}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid var(--grey)',
                    paddingBottom: '1em',
                }}
            >
                <h3>
                    <Link to={{ pathname: `/user/${_id}` }}>
                        {firstname} {lastname}
                    </Link>
                </h3>
                {_id === userId && <Link to={{ pathname: `/posts/${postId}/edit` }}>Edit</Link>}
            </div>
            {imagePath && (
                <div>
                    <img src={imagePath} alt="post" />
                </div>
            )}
            <div
                style={{ padding: '1em 0', borderTop: '1px solid var(--grey)', borderBottom: '1px solid var(--grey)' }}
            >
                <h2>{text}</h2>
            </div>
            <form
                onSubmit={submitNewComment}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderBottom: '1px solid var(--grey)',
                    padding: '1em 0',
                }}
            >
                <Input type="text" name="text" labelText="New Comment" onChange={onChange} value={newCommentText} />
                <Button>Send Comment</Button>
            </form>
            <div>
                {comments.map(comment => (
                    <div
                        key={comment._id}
                        style={{
                            padding: '1em',
                            borderRadius: '20px',
                            boxShadow: '1px 1px 15px var(--grey)',
                            marginBottom: '10px',
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>
                                <Link to={{ pathname: `/user/${comment.author._id}` }}>
                                    {comment.author.firstname} {comment.author.lastname}
                                </Link>
                            </h3>
                            {comment.author._id === userId && (
                                <Button onClick={() => deleteComment(comment._id)}>Delete</Button>
                            )}
                        </div>
                        {comment.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

PostItem.propTypes = {
    post: PropTypes.object,
};
