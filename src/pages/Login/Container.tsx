import {notification} from 'antd';
import {InputProps} from 'antd/lib/input';
import {DOMAttributes, useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Account} from '@/src/apis';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '@/src/config/route';
import {useIsLoggedIn} from '@/src/hooks/useIsLoggedIn';

import {LoginView} from './View';

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {loading, isLoggedIn} = useIsLoggedIn();

    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate(PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.INDEX], {
                replace: true,
            });
        }
    }, [isLoggedIn, navigate]);

    const onUsernameInputChange: InputProps['onChange'] = useCallback<
        Exclude<InputProps['onChange'], undefined>
    >((e) => {
        setUsername(e.target.value);
    }, []);

    const onPasswordInputChange: InputProps['onChange'] = useCallback<
        Exclude<InputProps['onChange'], undefined>
    >((e) => {
        setPassword(e.target.value);
    }, []);

    const onLoginFormSubmit: DOMAttributes<HTMLFormElement>['onSubmit'] =
        useCallback<
            Exclude<DOMAttributes<HTMLFormElement>['onSubmit'], undefined>
        >(
            async (e) => {
                e.preventDefault();
                const isSuccessful = await Account.login(username, password);
                if (isSuccessful) {
                    notification.success({message: '登录成功'});
                    navigate(PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.INDEX]);
                }
            },
            [navigate, password, username],
        );

    return (
        <LoginView
            loading={loading}
            username={username}
            password={password}
            onLoginFormSubmit={onLoginFormSubmit}
            onPasswordInputChange={onPasswordInputChange}
            onUsernameInputChange={onUsernameInputChange}
        />
    );
}
