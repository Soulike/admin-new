import React from 'react';

import svg from '@/src/static/Blog/macbook.svg';

import Style from './Style.module.scss';

function BlogIndexView()
{
    return (
        <div className={Style.BlogIndex}>
            <img className={Style.image} src={svg} alt="manage_index" />
        </div>
    );
}

export default React.memo(BlogIndexView);