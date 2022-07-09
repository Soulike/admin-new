import React from 'react';

import {PAGE_ID} from './PAGE_ID';

const Login = React.lazy(() =>
    import('@/src/pages/Login').then((module) => ({default: module.Login})),
);
const ManageIndex = React.lazy(() =>
    import('@/src/components/ManageIndex').then((module) => ({
        default: module.ManageIndex,
    })),
);
const BlogIndex = React.lazy(() =>
    import('@/src/components/BlogIndex').then((module) => ({
        default: module.BlogIndex,
    })),
);
const ArticleAdd = React.lazy(() =>
    import('@/src/pages/Blog/Article/Add').then((module) => ({
        default: module.Add,
    })),
);
const CategoryAdd = React.lazy(() =>
    import('@/src/pages/Blog/Category/Add').then((module) => ({
        default: module.Add,
    })),
);
const ArticleManage = React.lazy(
    () => import('@/src/pages/Blog/Article/Manage').then((module) => ({
        default: module.Manage,
    })),
);
const ArticleModify = React.lazy(
    () => import('@/src/pages/Blog/Article/Modify').then((module) => ({
        default: module.Modify,
    })),
);
const CategoryManage = React.lazy(
    () => import('@/src/pages/Blog/Category/Manage').then((module) => ({
        default: module.Manage,
    })),
);
const About = React.lazy(() =>
    import('@/src/pages/Blog/Option/About').then((module) => ({
        default: module.About,
    })),
);

export const PAGE_ID_TO_COMPONENT = {
    [PAGE_ID.LOGIN]: Login,

    [PAGE_ID.MANAGE.INDEX]: ManageIndex,

    [PAGE_ID.MANAGE.BLOG.INDEX]: BlogIndex,

    [PAGE_ID.MANAGE.BLOG.ARTICLE.INDEX]: BlogIndex,
    [PAGE_ID.MANAGE.BLOG.ARTICLE.ADD]: ArticleAdd,
    [PAGE_ID.MANAGE.BLOG.ARTICLE.MANAGE]: ArticleManage,
    [PAGE_ID.MANAGE.BLOG.ARTICLE.MODIFY]: ArticleModify,

    [PAGE_ID.MANAGE.BLOG.CATEGORY.INDEX]: BlogIndex,
    [PAGE_ID.MANAGE.BLOG.CATEGORY.ADD]: CategoryAdd,
    [PAGE_ID.MANAGE.BLOG.CATEGORY.MANAGE]: CategoryManage,

    [PAGE_ID.MANAGE.BLOG.OPTION.INDEX]: BlogIndex,
    [PAGE_ID.MANAGE.BLOG.OPTION.ABOUT]: About,
};
