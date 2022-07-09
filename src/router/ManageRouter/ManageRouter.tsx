import {Route} from 'react-router-dom';

import {BlogFrame} from '@/src/components/BlogFrame';
import {
    PAGE_ID,
    PAGE_ID_TO_COMPONENT,
    PAGE_ID_TO_ROUTE,
} from '@/src/config/route';

import {BlogRouter} from './SubRouter/BlogRouter';

const IndexComponent = PAGE_ID_TO_COMPONENT[PAGE_ID.MANAGE.INDEX];

export const ManageRouter = (
    <>
        <Route index={true} element={<IndexComponent />} />
        <Route
            path={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.INDEX]}
            element={<BlogFrame />}>
            {BlogRouter}
        </Route>
    </>
);
