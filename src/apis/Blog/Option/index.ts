import {message} from 'antd';
import axios, {AxiosResponse} from 'axios';

import {Response} from '@/src/types';

import {GET_ABOUT, SET_ABOUT} from './ROUTE';

export async function get(): Promise<{about: string} | null> {
    try {
        const {
            data: {isSuccessful, message: msg, data},
        }: AxiosResponse<Response<{about: string}>> = await axios.get(
            GET_ABOUT,
        );
        if (isSuccessful) {
            return data!;
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

export async function set(about: string): Promise<true | null> {
    try {
        const {
            data: {isSuccessful, message: msg},
        }: AxiosResponse<Response<void>> = await axios.post(SET_ABOUT, {about});
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
