import {ButtonProps} from 'antd';
import {CheckboxProps} from 'antd/lib/checkbox';
import {InputProps, TextAreaProps} from 'antd/lib/input';
import {ModalProps} from 'antd/lib/modal';
import {SelectProps} from 'antd/lib/select';

import {ArticleEditor} from '@/src/components/ArticleEditor';
import {Category} from '@/src/types';

import Style from './Style.module.scss';

interface Props {
    title: string;
    content: string;
    category: number | undefined;
    isVisible: boolean;
    categoryOption: Array<Category>;
    onTitleInputChange: InputProps['onChange'];
    onContentTextAreaChange: TextAreaProps['onChange'];
    onCategorySelectorChange: SelectProps<number>['onChange'];
    onIsVisibleCheckboxChange: CheckboxProps['onChange'];
    onSubmitButtonClick: ButtonProps['onClick'];
    isLoadingCategory: boolean;
    isSubmittingArticle: boolean;
    isLoadingArticle: boolean;
    onArticlePreviewButtonClick: ButtonProps['onClick'];
    isArticlePreviewModalOpen: boolean;
    onArticlePreviewModalOk: ModalProps['onOk'];
    onArticlePreviewModalCancel: ModalProps['onCancel'];
    HTMLContent: string;
}

export function ModifyView(props: Props) {
    return (
        <div className={Style.Modify}>
            <ArticleEditor {...props} />
        </div>
    );
}
