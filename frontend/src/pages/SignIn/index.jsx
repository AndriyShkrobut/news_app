import React, { useState } from 'react';
import Button from 'components/Button';
import { useAuth } from 'hooks/useAuth';
import { useRequest } from 'hooks/useRequest';
import { HttpMethod } from 'consts';
import { Input } from 'components/Input';
import styles from './styles.module.css';
import { useRouter } from 'hooks/useRouter';

const SignInPage = () => {
    const [signInData, setSignInData] = useState({
        email: '',
        password: '',
    });

    const { signIn } = useAuth();
    const { request } = useRequest();
    const { push } = useRouter();

    const { email, password } = signInData;

    const { wrapper, form, input__block, button__block } = styles;

    const onClick = () => push('/signup');

    const onChange = event => {
        const { name, value } = event.target;

        setSignInData({ ...signInData, [name]: value });
    };

    const onSubmit = async event => {
        event.preventDefault();

        try {
            const authData = await request('/auth/signin', HttpMethod.POST, signInData);

            signIn(authData);
        } catch (error) {
            alert(`${error.message} Invalid email or password`);
        }
    };

    return (
        <div className={wrapper}>
            <form className={form} onSubmit={onSubmit}>
                <div className={input__block}>
                    <Input type="text" name="email" labelText="Email" onChange={onChange} value={email} />
                    <Input type="password" name="password" labelText="Password" onChange={onChange} value={password} />
                </div>
                <div className={button__block}>
                    <Button disabled={!email.length || !password.length}>Sign In</Button>
                    <span>or</span>
                    <Button variant="secondary" type="button" onClick={onClick}>
                        Sign Up
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignInPage;
