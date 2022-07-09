import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {NotFound} from '@/src/components/NotFound';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '@/src/config/route';

import {LoginRouter} from './LoginRouter';
import {ManageRouter} from './ManageRouter';

const Frame = React.lazy(() =>
    import('@/src/components/Frame').then((module) => ({
        default: module.Frame,
    })),
);

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={PAGE_ID_TO_ROUTE[PAGE_ID.LOGIN]}>
                    {LoginRouter}
                </Route>
                <Route
                    path={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.INDEX]}
                    element={<Frame />}>
                    {ManageRouter}
                </Route>
                <Route path={'*'} element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
