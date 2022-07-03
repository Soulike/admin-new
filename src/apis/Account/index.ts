import {message} from 'antd';
import axios, {AxiosResponse} from 'axios';

import {Response} from '@/src/types';

import {CHECK_SESSION, LOGIN, LOGOUT} from './ROUTE';

export async function login(
    username: string,
    password: string,
): Promise<true | null> {
    try {
        const {data: response}: AxiosResponse<Response<void>> =
            await axios.post(LOGIN, {username, password});
        const {isSuccessful, message: msg} = response;
        if (isSuccessful) {
            return true;
        } else {
            message.warning(msg);
            return null;
        }
    } catch (e) {
        message.error('网络异常');
        console.log(e);
        return null;
    }
}

export async function logout(): Promise<true | null> {
    try {
        const {data: response}: AxiosResponse<Response<void>> =
            await axios.post(LOGOUT);
        const {isSuccessful, message: msg} = response;
        if (isSuccessful) {
            return true;
        } else {
            message.warning(msg);
            return null;
        }
    } catch (e) {
        message.error('网络异常');
        console.log(e);
        return null;
    }
}

export async function checkSession(): Promise<{isInSession: boolean} | null> {
    try {
        const {
            data: {isSuccessful, data},
        }: AxiosResponse<Response<{isInSession: boolean}>> = await axios.get(
            CHECK_SESSION,
        );
        if (isSuccessful) {
            return data!;
        } else {
            return null;
        }
    } catch (e) {
        message.error('网络异常');
        console.log(e);
        return null;
    }
}
