import {Button, ButtonProps, Checkbox, Input, Select} from 'antd';
import {NativeButtonProps} from 'antd/lib/button/button';
import {CheckboxProps} from 'antd/lib/checkbox';
import {InputProps, TextAreaProps} from 'antd/lib/input';
import {SelectProps} from 'antd/lib/select';

import {ArticlePreviewModal} from '@/src/components/ArticlePreviewModal';
import {Category} from '@/src/types';

import Style from './Style.module.scss';

const {Group, TextArea} = Input;
const {Option} = Select;

export interface IArticleEditorProps {
    title: string;
    content: string;
    category: number | undefined;
    isVisible: boolean;
    categoryOptions: Array<Category>;
    onTitleInputChange: InputProps['onChange'];
    onContentTextAreaChange: TextAreaProps['onChange'];
    onCategorySelectorChange: SelectProps<number>['onChange'];
    onIsVisibleCheckboxChange: CheckboxProps['onChange'];
    onSubmitButtonClick: NativeButtonProps['onClick'];
    isLoadingCategoryOptions: boolean;
    isLoadingArticle: boolean;
    isSubmittingArticle: boolean;
    onArticlePreviewButtonClick: NativeButtonProps['onClick'];
    isArticlePreviewModalVisible: boolean;
    onArticlePreviewModalOk: ButtonProps['onClick'];
    onArticlePreviewModalCancel: ButtonProps['onClick'];
    HTMLContent: string;
}

export function ArticleEditor(props: IArticleEditorProps) {
    const {
        title,
        content,
        category,
        isVisible,
        categoryOptions,
        onTitleInputChange,
        onContentTextAreaChange,
        onCategorySelectorChange,
        onIsVisibleCheckboxChange,
        onSubmitButtonClick,
        isLoadingCategoryOptions,
        isSubmittingArticle,
        isLoadingArticle,
        onArticlePreviewButtonClick,
        isArticlePreviewModalVisible,
        onArticlePreviewModalOk,
        onArticlePreviewModalCancel,
        HTMLContent,
    } = props;
    return (
        <div className={Style.ArticleEditor}>
            <Group size={'large'} className={Style.inputGroup}>
                <Input
                    disabled={
                        isLoadingCategoryOptions ||
                        isSubmittingArticle ||
                        isLoadingArticle
                    }
                    value={title}
                    onChange={onTitleInputChange}
                    className={Style.title}
                    placeholder={'文章标题'}
                />
                <TextArea
                    disabled={
                        isLoadingCategoryOptions ||
                        isSubmittingArticle ||
                        isLoadingArticle
                    }
                    value={content}
                    onChange={onContentTextAreaChange}
                    className={Style.content}
                    placeholder={'文章内容（Markdown）'}
                />
            </Group>
            <div className={Style.bottomWrapper}>
                <Select
                    size={'large'}
                    onChange={onCategorySelectorChange}
                    value={category}
                    loading={isLoadingCategoryOptions}
                    className={Style.categorySelect}
                    disabled={isLoadingCategoryOptions}
                    placeholder={'文章分类'}>
                    {categoryOptions.map((category) => {
                        const {id, name} = category;
                        return (
                            <Option value={id} key={id}>
                                {name}
                            </Option>
                        );
                    })}
                </Select>
                <Checkbox
                    disabled={
                        isSubmittingArticle ||
                        isLoadingCategoryOptions ||
                        isLoadingArticle
                    }
                    checked={isVisible}
                    onChange={onIsVisibleCheckboxChange}>
                    公开文章
                </Checkbox>
                <Button.Group>
                    <Button
                        size={'large'}
                        onClick={onArticlePreviewButtonClick}>
                        预览
                    </Button>
                    <Button
                        loading={isSubmittingArticle}
                        type={'primary'}
                        size={'large'}
                        disabled={
                            isSubmittingArticle ||
                            isLoadingCategoryOptions ||
                            isLoadingArticle
                        }
                        onClick={onSubmitButtonClick}>
                        提交
                    </Button>
                </Button.Group>
            </div>
            <ArticlePreviewModal
                title={title}
                HTMLContent={HTMLContent}
                visible={isArticlePreviewModalVisible}
                onOk={onArticlePreviewModalOk}
                onCancel={onArticlePreviewModalCancel}
            />
        </div>
    );
}
