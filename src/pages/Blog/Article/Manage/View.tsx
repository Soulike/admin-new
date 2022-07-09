import {ArticleList} from '@/src/components/ArticleList';

import Style from './Style.module.scss';

export function ManageView()
{
    return (
        <div className={Style.Manage}>
            <ArticleList />
        </div>
    );
}