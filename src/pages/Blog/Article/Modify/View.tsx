import {ArticleEditor, IArticleEditorProps} from '@/src/components/ArticleEditor';

import Style from './Style.module.scss';

export interface IModifyViewProps extends IArticleEditorProps {}

export function ModifyView(props: IModifyViewProps) {
    return (
        <div className={Style.Modify}>
            <ArticleEditor {...props} />
        </div>
    );
}
