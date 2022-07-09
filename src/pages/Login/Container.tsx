import {notification} from 'antd';
import {InputProps} from 'antd/lib/input';
import {DOMAttributes, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Account} from '@/src/apis';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '@/src/config/route';

import {LoginView} from './View';

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        Account.checkSession().then((res) => {
            if (res !== null) {
                const {isInSession} = res;
                if (isInSession) {
                    navigate(PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.INDEX], {
                        replace: true,
                    });
                }
            }
        });
    }, [navigate]);

    const onUsernameInputChange: InputProps['onChange'] = (e) => {
        setUsername(e.target.value);
    };

    const onPasswordInputChange: InputProps['onChange'] = (e) => {
        setPassword(e.target.value);
    };

    const onLoginFormSubmit: DOMAttributes<HTMLFormElement>['onSubmit'] =
        async (e) => {
            e.preventDefault();
            const isSuccessful = await Account.login(username, password);
            if (isSuccessful) {
                notification.success({message: '登录成功'});
                navigate(PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.INDEX]);
            }
        };

    return (
        <LoginView
            username={username}
            password={password}
            onLoginFormSubmit={onLoginFormSubmit}
            onPasswordInputChange={onPasswordInputChange}
            onUsernameInputChange={onUsernameInputChange}
        />
    );
}
