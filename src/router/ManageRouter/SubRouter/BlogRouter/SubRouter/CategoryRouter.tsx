import {Route} from 'react-router-dom';

import {
    PAGE_ID,
    PAGE_ID_TO_COMPONENT,
    PAGE_ID_TO_ROUTE,
} from '@/src/config/route';

const {CATEGORY} = PAGE_ID.MANAGE.BLOG;

export const CategoryRouter = Object.values(CATEGORY).map(pageId =>
{
    const Component = PAGE_ID_TO_COMPONENT[pageId];
    return <Route key={pageId}
                  path={PAGE_ID_TO_ROUTE[pageId]}
                  element={<Component />} />;
});