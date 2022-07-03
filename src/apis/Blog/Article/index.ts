import {message} from 'antd';
import axios, {AxiosResponse} from 'axios';

import {Article, Response} from '@/src/types';

import {
    ADD,
    DELETE_BY_ID,
    GET_ALL,
    GET_BY_CATEGORY,
    GET_BY_ID,
    MODIFY,
} from './ROUTE';

export async function getById(id: number): Promise<Article | null> {
    try {
        const {data: response}: AxiosResponse<Response<Article>> =
            await axios.get(GET_BY_ID, {
                params: {
                    json: JSON.stringify({id}),
                },
            });

        const {isSuccessful, message: msg, data} = response;
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

export async function getAll(): Promise<Array<Article> | null> {
    try {
        const {data: response}: AxiosResponse<Response<Array<Article>>> =
            await axios.get(GET_ALL);

        const {isSuccessful, message: msg, data} = response;
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

export async function getByCategory(
    category: number,
): Promise<Array<Article> | null> {
    try {
        const {data: response}: AxiosResponse<Response<Array<Article>>> =
            await axios.get(GET_BY_CATEGORY, {
                params: {
                    json: JSON.stringify({category}),
                },
            });
        const {isSuccessful, message: msg, data} = response;

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

export async function add(
    article: Pick<Article, 'title' | 'content' | 'category' | 'isVisible'>,
): Promise<true | null> {
    try {
        const {data: response}: AxiosResponse<Response<void>> =
            await axios.post(ADD, article);
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

export async function deleteById(id: number): Promise<true | null> {
    try {
        const {data: response}: AxiosResponse<Response<void>> =
            await axios.post(DELETE_BY_ID, {id});
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

export async function modify(
    article: Pick<Article, 'id'> &
        Partial<
            Omit<Article, 'publicationTime' | 'modificationTime' | 'pageViews'>
        >,
): Promise<true | null> {
    try {
        const {data: response}: AxiosResponse<Response<void>> =
            await axios.post(MODIFY, article);
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