import {ArticleEditor, IArticleEditorProps} from '@/src/components/ArticleEditor';

import Style from './Style.module.scss';

export interface IAddViewProps extends Omit<IArticleEditorProps, 'isLoadingArticle'> {}

export function AddView(props: IAddViewProps) {
    return (
        <div className={Style.Add}>
            <ArticleEditor {...props} isLoadingArticle={false} />
        </div>
    );
}
