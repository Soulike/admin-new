import React from 'react';
import {Link} from 'react-router-dom';

import {PAGE_ID, PAGE_ID_TO_ROUTE} from '@/src/config/route';

import Style from './Style.module.scss';

export function LinkList() {
    return (
        <div className={Style.LinkList}>
            <div className={Style.linkItem}>
                <Link to={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.INDEX]}>
                    博客
                </Link>
            </div>
        </div>
    );
}
