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
    onSubmitButtonClick: NativeButtonProps['onClick'];
    isLoadingCategory: boolean;
    isLoadingArticle: boolean;
    isSubmittingArticle: boolean;
    onArticlePreviewButtonClick: NativeButtonProps['onClick'];
    isArticlePreviewModalVisible: boolean;
    onArticlePreviewModalOk: ButtonProps['onClick'];
    onArticlePreviewModalCancel: ButtonProps['onClick'];
    HTMLContent: string;
}

export function ArticleEditor(props: Props) {
    const {
        title,
        content,
        category,
        isVisible,
        categoryOption,
        onTitleInputChange,
        onContentTextAreaChange,
        onCategorySelectorChange,
        onIsVisibleCheckboxChange,
        onSubmitButtonClick,
        isLoadingCategory,
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
                        isLoadingCategory ||
                        isSubmittingArticle ||
                        isLoadingArticle
                    }
                    value={title}
                    onChange={onTitleInputChange}
                    className={Style.title}
                    placeholder={'????????????'}
                />
                <TextArea
                    disabled={
                        isLoadingCategory ||
                        isSubmittingArticle ||
                        isLoadingArticle
                    }
                    value={content}
                    onChange={onContentTextAreaChange}
                    className={Style.content}
                    placeholder={'???????????????Markdown???'}
                />
            </Group>
            <div className={Style.bottomWrapper}>
                <Select
                    size={'large'}
                    onChange={onCategorySelectorChange}
                    value={category}
                    loading={isLoadingCategory}
                    className={Style.categorySelect}
                    disabled={isLoadingCategory}
                    placeholder={'????????????'}>
                    {categoryOption.map((category) => {
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
                        isLoadingCategory ||
                        isLoadingArticle
                    }
                    checked={isVisible}
                    onChange={onIsVisibleCheckboxChange}>
                    ????????????
                </Checkbox>
                <Button.Group>
                    <Button
                        size={'large'}
                        onClick={onArticlePreviewButtonClick}>
                        ??????
                    </Button>
                    <Button
                        loading={isSubmittingArticle}
                        type={'primary'}
                        size={'large'}
                        disabled={
                            isSubmittingArticle ||
                            isLoadingCategory ||
                            isLoadingArticle
                        }
                        onClick={onSubmitButtonClick}>
                        ??????
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
