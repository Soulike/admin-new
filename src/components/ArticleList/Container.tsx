import {message, notification} from 'antd';
import {NativeButtonProps} from 'antd/lib/button/button';
import {ModalProps} from 'antd/lib/modal';
import {PopconfirmProps} from 'antd/lib/popconfirm';
import {SwitchProps} from 'antd/lib/switch';
import {DOMAttributes, useCallback, useEffect, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Blog} from '@/src/apis';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '@/src/config/route';
import {useCategories} from '@/src/hooks/useCategories';
import {Article, Category} from '@/src/types';
import {markdownConverter} from '@/src/utils/markdownConverter';

import {ArticleListView} from './View';

interface IProps {
    categoryIdFilter?: number; // 限定文章的分类
}

export function ArticleList(props: IProps) {
    const {categoryIdFilter} = props;
    const [articleMap, setArticleMap] = useState(new Map<number, Article>());

    const [isArticleLoading, setIsArticleLoading] = useState(false);
    const [loadingArticleId, setLoadingArticleId] = useState(0);

    const [articleInModalTitle, setArticleInModalTitle] = useState('');
    const [articleInModalHTMLContent, setArticleInModalHTMLContent] =
        useState('');
    const [modalIsVisible, setModalIsVisible] = useState(false);

    const [idOfArticleToDelete, setIdOfArticleToDelete] = useState(0);

    const navigate = useNavigate();

    const {categories, loading: categoriesIsLoading} = useCategories();
    const categoryMap: Map<number, Category> = useMemo(() => {
        const map = new Map();
        if (categories !== null) {
            for (const category of categories) {
                map.set(category.id, category);
            }
        }
        return map;
    }, [categories]);

    useEffect(() => {
        setIsArticleLoading(true);
        Promise.resolve()
            .then(() => {
                if (typeof categoryIdFilter === 'undefined') {
                    return Blog.Article.getAll();
                } else {
                    return Blog.Article.getByCategory(categoryIdFilter);
                }
            })
            .then((articleList) => {
                if (articleList !== null) {
                    const articleMap: Map<number, Article> = new Map<
                        number,
                        Article
                    >();
                    articleList.forEach((article) => {
                        articleMap.set(article.id!, article);
                    });

                    setArticleMap(articleMap);
                }
            })
            .finally(() => {
                setIsArticleLoading(false);
            });
    }, [categoryIdFilter]);

    const modalOnOk: ModalProps['onOk'] = useCallback(() => {
        setModalIsVisible(!modalIsVisible);
    }, [modalIsVisible]);

    const modalOnCancel: ModalProps['onCancel'] = useCallback(modalOnOk, [
        modalOnOk,
    ]);

    const onArticleTitleClick: (
        id: number,
    ) => DOMAttributes<HTMLSpanElement>['onClick'] = useCallback(
        (id: number) => {
            return (e) => {
                e.preventDefault();
                const article = articleMap.get(id);
                if (typeof article === 'undefined') {
                    message.warning('文章不存在');
                } else {
                    setArticleInModalTitle(article.title);
                    setArticleInModalHTMLContent(
                        markdownConverter.makeHtml(article.content),
                    );
                    setModalIsVisible(true);
                }
            };
        },
        [articleMap],
    );

    const onIsVisibleSwitchClick: (id: number) => SwitchProps['onClick'] =
        useCallback(
            (id: number) => {
                return async (checked) => {
                    setLoadingArticleId(id);
                    const result = await Blog.Article.modify({
                        id,
                        isVisible: checked,
                    });
                    if (result !== null) {
                        const article = articleMap.get(id);
                        if (article === undefined) {
                            message.warning('文章不存在');
                        } else {
                            article.isVisible = checked;
                            setArticleMap(new Map(articleMap)); // TODO: check if we can remove the new Map()
                            setLoadingArticleId(0);
                        }
                    }
                };
            },
            [articleMap],
        );

    const onModifyArticleButtonClick: (
        id: number,
    ) => NativeButtonProps['onClick'] = useCallback(
        (id: number) => {
            return (e) => {
                e.preventDefault();
                const urlSearchParams = new URLSearchParams();
                urlSearchParams.set('id', id.toString());
                navigate(
                    `${
                        PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.ARTICLE.MODIFY]
                    }?${urlSearchParams.toString()}`,
                );
            };
        },
        [navigate],
    );

    const onDeleteArticleButtonClick: (
        id: number,
    ) => NativeButtonProps['onClick'] = useCallback((id: number) => {
        return () => {
            setIdOfArticleToDelete(id);
        };
    }, []);

    const onDeleteArticleConfirm: PopconfirmProps['onConfirm'] =
        useCallback(async () => {
            const result = await Blog.Article.deleteById(idOfArticleToDelete);
            if (result !== null) {
                notification.success({
                    message: '文章删除成功',
                });
                articleMap.delete(idOfArticleToDelete);
                setArticleMap(new Map(articleMap));
            }
        }, [articleMap, idOfArticleToDelete]);

    return (
        <ArticleListView
            isLoading={categoriesIsLoading || isArticleLoading}
            articleMap={articleMap}
            categoryMap={categoryMap}
            modalIsVisible={modalIsVisible}
            articleInModalTitle={articleInModalTitle}
            articleInModalHTMLContent={articleInModalHTMLContent}
            modalOnOk={modalOnOk}
            modalOnCancel={modalOnCancel}
            loadingArticleId={loadingArticleId}
            onArticleTitleClick={onArticleTitleClick}
            onIsVisibleSwitchClick={onIsVisibleSwitchClick}
            onModifyArticleButtonClick={onModifyArticleButtonClick}
            onDeleteArticleButtonClick={onDeleteArticleButtonClick}
            onDeleteArticleConfirm={onDeleteArticleConfirm}
        />
    );
}
