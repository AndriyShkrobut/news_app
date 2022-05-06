import React, { useState } from 'react';
import { useRequest } from 'hooks/useRequest';
import { useAuth } from 'hooks/useAuth';
import { HttpMethod } from 'consts';
import Button from 'components/Button';
import { Input } from 'components/Input';
import styles from './styles.module.css';
import { useRouter } from 'hooks/useRouter';

export const SignUpPage = () => {
    const initialSignUpData = { firstname: '', lastname: '', username: '', email: '', password: '' };

    const [signUpData, setSignUpData] = useState(initialSignUpData);
    const { signIn } = useAuth();
    const { request } = useRequest();
    const { push } = useRouter();

    const { wrapper, form, button__block } = styles;

    const { firstname, lastname, username, email, password } = signUpData;

    const onClick = () => push('/signin');

    const onChange = event => {
        const { name, value } = event.target;

        setSignUpData({ ...signUpData, [name]: value });
    };

    const onSubmit = async event => {
        event.preventDefault();

        const authData = await request('/auth/signup', HttpMethod.POST, signUpData);

        signIn(authData);
    };
    return (
        <div className={wrapper}>
            <form className={form} onSubmit={onSubmit}>
                <Input type="text" name="firstname" labelText="Firstname" onChange={onChange} value={firstname} />
                <Input type="text" name="lastname" labelText="Lastname" onChange={onChange} value={lastname} />
                <Input type="text" name="username" labelText="Username" onChange={onChange} value={username} />
                <Input type="email" name="email" labelText="Email" onChange={onChange} value={email} />
                <Input type="password" name="password" labelText="Password" onChange={onChange} value={password} />

                <div className={button__block}>
                    <Button
                        disabled={
                            !email.length ||
                            !password.length ||
                            !firstname.length ||
                            !lastname.length ||
                            !username.length
                        }
                    >
                        Sign Up
                    </Button>
                    <span>go back to sign in</span>
                    <Button variant="secondary" type="button" onClick={onClick}>
                        Sign In
                    </Button>
                </div>
            </form>
        </div>
    );
};
