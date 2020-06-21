import React, { useState } from 'react';
import Button from 'components/Button';
import { useAuth } from 'hooks/useAuth';
import { useRequest } from 'hooks/useRequest';
import { HttpMethod } from 'consts';

const SignInPage = () => {
    const [signInData, setSignInData] = useState({
        email: '',
        password: '',
    });

    const { signIn } = useAuth();
    const { request } = useRequest();

    const { email, password } = signInData;

    const onChange = event => {
        const { name, value } = event.target;

        setSignInData({ ...signInData, [name]: value });
    };

    const onSubmit = async event => {
        event.preventDefault();

        const authData = await request('/auth/signin', HttpMethod.POST, signInData);

        signIn(authData);
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" name="email" onChange={onChange} value={email} />
                <input type="password" name="password" onChange={onChange} value={password} />
                <Button disabled={!email.length || !password.length}>Sign In</Button>
            </form>
        </>
    );
};

export default SignInPage;
