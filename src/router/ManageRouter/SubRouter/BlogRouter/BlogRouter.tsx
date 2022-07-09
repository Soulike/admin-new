import {Route} from 'react-router-dom';

import {
    PAGE_ID,
    PAGE_ID_TO_COMPONENT,
    PAGE_ID_TO_ROUTE,
} from '@/src/config/route';

import {ArticleRouter} from './SubRouter/ArticleRouter';
import {CategoryRouter} from './SubRouter/CategoryRouter';
import {OptionRouter} from './SubRouter/OptionRouter';

const IndexComponent = PAGE_ID_TO_COMPONENT[PAGE_ID.MANAGE.BLOG.INDEX];

export const BlogRouter = (
    <>
        <Route path={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.INDEX]}
               element={<IndexComponent />} />
        <Route path={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.ARTICLE.INDEX]}>
            {ArticleRouter}
        </Route>
        <Route path={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.CATEGORY.INDEX]}>
            {CategoryRouter}
        </Route>
        <Route path={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.OPTION.INDEX]}>
            {OptionRouter}
        </Route>
    </>);