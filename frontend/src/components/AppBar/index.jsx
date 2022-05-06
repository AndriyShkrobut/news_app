import React from 'react';
import Button from 'components/Button';
import { HttpMethod } from 'consts';
import { useAuth } from 'hooks/useAuth';
import { useRequest } from 'hooks/useRequest';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { useRouter } from 'hooks/useRouter';

export const AppBar = () => {
    const { isSignedIn, signOut } = useAuth();
    const { request } = useRequest();
    const { push } = useRouter();

    const { appbar, button, logo, content } = styles;

    const onClick = async () => {
        const response = await request('/auth/signout', HttpMethod.POST);

        if (response) {
            signOut();
        }
    };

    return (
        <div className={appbar}>
            <div className={content}>
                <Link to="/home" className={logo}>
                    Logo
                </Link>
                <div className={button}>
                    {isSignedIn && (
                        <>
                            <Button disabled={!isSignedIn} onClick={() => push('/posts/create')}>
                                Create Post
                            </Button>
                            <Button disabled={!isSignedIn} onClick={onClick}>
                                Sign Out
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
