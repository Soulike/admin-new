import {Route} from 'react-router-dom';

import {PAGE_ID, PAGE_ID_TO_COMPONENT, PAGE_ID_TO_ROUTE} from '@/src/config/route';

const Component = PAGE_ID_TO_COMPONENT[PAGE_ID.LOGIN];

export const LoginRouter = (
    <>
        <Route path={PAGE_ID_TO_ROUTE[PAGE_ID.LOGIN]}
               element={<Component />} />
    </>);