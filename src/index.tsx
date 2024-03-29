import 'antd/dist/reset.css';
import './index.scss';

import {ConfigProvider} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';

import {Loading} from '@/src/components/Loading';
import {Router} from '@/src/router';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <React.StrictMode>
        <Suspense fallback={<Loading />}>
            <ConfigProvider locale={zhCN}>
                <Router />
            </ConfigProvider>
        </Suspense>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
