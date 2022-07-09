import {ButtonProps} from 'antd';
import {NativeButtonProps} from 'antd/lib/button/button';
import {CheckboxProps} from 'antd/lib/checkbox';
import {InputProps, TextAreaProps} from 'antd/lib/input';
import {SelectProps} from 'antd/lib/select';

import {ArticleEditor} from '@/src/components/ArticleEditor';
import {Category} from '@/src/types';

import Style from './Style.module.scss';

interface Props
{
    title: string,
    content: string,
    category: number | undefined,
    isVisible: boolean,
    categoryOption: Array<Category>,
    onTitleInputChange: InputProps['onChange'],
    onContentTextAreaChange: TextAreaProps['onChange'],
    onCategorySelectorChange: SelectProps<number>['onChange'],
    onIsVisibleCheckboxChange: CheckboxProps['onChange'],
    onSubmitButtonClick: NativeButtonProps['onClick'],
    isLoadingCategory: boolean,
    isSubmittingArticle: boolean,
    isLoadingArticle: boolean,
    onArticlePreviewButtonClick: NativeButtonProps['onClick'],
    isArticlePreviewModalVisible: boolean,
    onArticlePreviewModalOk: ButtonProps['onClick'],
    onArticlePreviewModalCancel: ButtonProps['onClick'],
    HTMLContent: string,
}

export function ModifyView(props: Props)
{
    return (
        <div className={Style.Modify}>
            <ArticleEditor {...props} />
        </div>);
}