import {ButtonProps, message, notification} from 'antd';
import {CheckboxProps} from 'antd/lib/checkbox';
import {InputProps, TextAreaProps} from 'antd/lib/input';
import {ModalProps} from 'antd/lib/modal';
import {SelectProps} from 'antd/lib/select';
import {useEffect, useState} from 'react';

import {Blog} from '@/src/apis';
import {useMarkdownConverter} from '@/src/hooks/useMarkdownConverter';
import {Category} from '@/src/types';

import {AddView} from './View';

export function Add() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState<number | undefined>(undefined);
    const [isVisible, setIsVisible] = useState(true);
    const [categoryOption, setCategoryOption] = useState<Category[]>([]);
    const [isLoadingCategory, setIsLoadingCategory] = useState(false);
    const [isSubmittingArticle, setIsSubmittingArticle] = useState(false);
    const [isArticlePreviewModalOpen, setIsArticlePreviewModalOpen] =
        useState(false);

    const {loading: converterLoading, html: HTMLContent} =
        useMarkdownConverter(content);

    useEffect(() => {
        const getCategoryOption = async () => {
            const category = await Blog.Category.getAll();
            if (category !== null) {
                setCategoryOption(category);
            }
        };

        setIsLoadingCategory(true);
        getCategoryOption().finally(() => setIsLoadingCategory(false));
    }, []);

    const onTitleInputChange: InputProps['onChange'] = (e) => {
        setTitle(e.target.value);
    };

    const onContentTextAreaChange: TextAreaProps['onChange'] = (e) => {
        setContent(e.target.value);
    };

    const onCategorySelectorChange: SelectProps<number>['onChange'] = (
        value,
    ) => {
        setCategory(value); // 在 View 中设置的是 number
    };

    const onIsVisibleCheckboxChange: CheckboxProps['onChange'] = (e) => {
        setIsVisible(e.target.checked);
    };

    const onArticlePreviewButtonClick: ButtonProps['onClick'] = (e) => {
        e.preventDefault();
        setIsArticlePreviewModalOpen(true);
    };

    const onArticlePreviewModalOk: ModalProps['onOk'] = (e) => {
        e.preventDefault();
        setIsArticlePreviewModalOpen(false);
    };

    const onArticlePreviewModalCancel: ModalProps['onCancel'] =
        onArticlePreviewModalOk;

    const initAfterSubmit = () => {
        setTitle('');
        setContent('');
        setCategory(undefined);
        setIsVisible(true);
        setIsLoadingCategory(false);
        setIsSubmittingArticle(false);
    };

    const onSubmitButtonClick: ButtonProps['onClick'] = async (e) => {
        e.preventDefault();
        if (typeof category === 'undefined') {
            message.warning('请选择文章分类');
        } else if (title.length === 0) {
            message.warning('请填写文章标题');
        } else if (content.length === 0) {
            message.warning('请填写文章内容');
        } else {
            setIsSubmittingArticle(true);
            const result = await Blog.Article.add({
                title,
                category,
                content,
                isVisible,
            });
            setIsSubmittingArticle(false);
            if (result !== null) {
                notification.success({message: '文章提交成功'});
                initAfterSubmit();
            }
        }
    };

    return (
        <AddView
            title={title}
            content={content}
            category={category}
            isVisible={isVisible && !converterLoading}
            categoryOption={categoryOption}
            onTitleInputChange={onTitleInputChange}
            onContentTextAreaChange={onContentTextAreaChange}
            onCategorySelectorChange={onCategorySelectorChange}
            onIsVisibleCheckboxChange={onIsVisibleCheckboxChange}
            onSubmitButtonClick={onSubmitButtonClick}
            isLoadingCategory={isLoadingCategory}
            isSubmittingArticle={isSubmittingArticle}
            isArticlePreviewModalOpen={isArticlePreviewModalOpen}
            onArticlePreviewButtonClick={onArticlePreviewButtonClick}
            onArticlePreviewModalOk={onArticlePreviewModalOk}
            onArticlePreviewModalCancel={onArticlePreviewModalCancel}
            HTMLContent={HTMLContent ?? ''}
        />
    );
}
