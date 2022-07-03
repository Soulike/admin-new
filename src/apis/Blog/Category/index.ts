import {message} from 'antd';
import axios, {AxiosResponse} from 'axios';

import {Category, Response} from '@/src/types';

import {
    ADD,
    DELETE_BY_ID,
    GET_ALL,
    GET_ALL_ARTICLE_AMOUNT_BY_ID,
    GET_ARTICLE_AMOUNT_BY_ID,
    MODIFY,
} from './ROUTE';

export async function getAll(): Promise<Array<Category> | null> {
    try {
        const {data: response}: AxiosResponse<Response<Array<Category>>> =
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

export async function getAllArticleAmountById(): Promise<{
    [categoryId: number]: number;
} | null> {
    try {
        const {
            data: response,
        }: AxiosResponse<Response<{[categoryId: number]: number}>> =
            await axios.get(GET_ALL_ARTICLE_AMOUNT_BY_ID);
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

export async function getArticleAmountById(id: number): Promise<number | null> {
    try {
        const {data: response}: AxiosResponse<Response<number>> =
            await axios.get(GET_ARTICLE_AMOUNT_BY_ID, {
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

export async function add(
    category: Omit<Category, 'id'>,
): Promise<true | null> {
    try {
        const {
            data: {isSuccessful, message: msg},
        }: AxiosResponse<Response<void>> = await axios.post(ADD, category);
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
        const {
            data: {isSuccessful, message: msg},
        }: AxiosResponse<Response<void>> = await axios.post(DELETE_BY_ID, {id});
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
    category: Partial<Category> & Pick<Category, 'id'>,
): Promise<true | null> {
    try {
        const {
            data: {isSuccessful, message: msg},
        }: AxiosResponse<Response<void>> = await axios.post(MODIFY, category);
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
