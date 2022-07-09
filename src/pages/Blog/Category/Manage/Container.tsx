import {message, notification} from 'antd';
import {NativeButtonProps} from 'antd/lib/button/button';
import {InputProps} from 'antd/lib/input';
import {ModalProps} from 'antd/lib/modal';
import {PopconfirmProps} from 'antd/lib/popconfirm';
import {TagProps} from 'antd/lib/tag';
import React, {useEffect, useState} from 'react';

import {Blog} from '@/src/apis';
import {Category} from '@/src/types';

import {ManageView} from './View';

function Manage()
{
    const [loading, setLoading] = useState(false);
    const [categoryMap, setCategoryMap] = useState<Map<number, Category>>(new Map());
    const [categoryToArticleNumberMap, setCategoryToArticleNumberMap] = useState<Map<number, number>>(new Map());

    const [isArticleListModalVisible, setIsArticleListModalVisible] = useState(false);
    const [categoryIdOfArticleListModal, setCategoryIdOfArticleListModal] = useState(0);

    const [isModifyModalVisible, setIsModifyModalVisible] = useState(false);
    const [idOfCategoryToModify, setIdOfCategoryToModify] = useState(0);
    const [nameOfCategoryToModify, setNameOfCategoryToModify] = useState('');

    const [idOfCategoryToDelete, setIdOfCategoryToDelete] = useState(0);

    useEffect(() =>
    {
        setLoading(true);
        Blog.Category.getAll()
            .then(categoryList =>
            {
                if (categoryList !== null)
                {
                    const categoryMap: Map<number, Category> = new Map();
                    categoryList.forEach(category =>
                    {
                        categoryMap.set(category.id!, category);
                    });
                    setCategoryMap(categoryMap);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() =>
    {
        setLoading(true);
        Blog.Category.getAllArticleAmountById()
            .then(articleAmountOfCategory =>
            {
                if (articleAmountOfCategory !== null)
                {
                    const categoryToArticleNumberMap = new Map<number, number>();
                    Object.keys(articleAmountOfCategory).forEach(idString =>
                    {
                        const id = Number.parseInt(idString);
                        categoryToArticleNumberMap.set(id, articleAmountOfCategory[id]);
                    });
                    setCategoryToArticleNumberMap(categoryToArticleNumberMap);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    const onArticleAmountTagClick: (id: number) => TagProps['onClick'] = (id: number) =>
    {
        return e =>
        {
            e.preventDefault();
            setCategoryIdOfArticleListModal(id);
            setIsArticleListModalVisible(true);
        };
    };

    const onArticleListModalOk: ModalProps['onOk'] = e =>
    {
        e.preventDefault();
        setIsArticleListModalVisible(false);
    };

    const onModifyModalOk: ModalProps['onOk'] = async e =>
    {
        e.preventDefault();
        if (nameOfCategoryToModify !== '')
        {
            setLoading(true);
            const result = await Blog.Category.modify(new Category(idOfCategoryToModify, nameOfCategoryToModify));
            setLoading(false);
            if (result !== null)
            {
                notification.success({message: '文章分类编辑成功'});
                setCategoryMap(categoryMap =>
                {
                    categoryMap.get(idOfCategoryToModify)!.name = nameOfCategoryToModify;
                    return new Map(categoryMap);
                });
                setIsModifyModalVisible(false);
            }
        }
        else
        {
            message.warning('文章分类名不能为空');
        }
    };

    const onModifyModalCancel: ModalProps['onCancel'] = e =>
    {
        e.preventDefault();
        setIsModifyModalVisible(false);
    };

    const onModifyButtonClick: (id: number) => NativeButtonProps['onClick'] = id =>
    {
        return () =>
        {
            setIdOfCategoryToModify(id);
            setNameOfCategoryToModify(categoryMap.get(id)!.name!);
            setIsModifyModalVisible(true);
        };
    };

    const onCategoryNameInputChange: InputProps['onChange'] = e =>
    {
        setNameOfCategoryToModify(e.target.value);
    };

    const onDeleteCategoryButtonClick: (id: number) => NativeButtonProps['onClick'] = id =>
    {
        return () => setIdOfCategoryToDelete(id);
    };

    const onDeleteCategoryConfirm: PopconfirmProps['onConfirm'] = async () =>
    {
        if (categoryToArticleNumberMap.get(idOfCategoryToDelete)! !== 0)
        {
            message.warning('不能删除有文章的分类');
        }
        else
        {
            setLoading(true);
            const result = await Blog.Category.deleteById(idOfCategoryToDelete);
            setLoading(false);
            if (result !== null)
            {
                notification.success({
                    message: '删除文章分类成功',
                });

                setCategoryMap(categoryMap =>
                {
                    categoryMap.delete(idOfCategoryToDelete);
                    return new Map(categoryMap);
                });
                setCategoryToArticleNumberMap(categoryToArticleNumberMap =>
                {
                    categoryToArticleNumberMap.delete(idOfCategoryToDelete);
                    return new Map(categoryToArticleNumberMap);
                });
            }
        }
    };


    return (
        <ManageView
            loading={loading}
            categoryMap={categoryMap}
            categoryToArticleNumberMap={categoryToArticleNumberMap}
            isArticleListModalVisible={isArticleListModalVisible}
            categoryIdOfArticleListModal={categoryIdOfArticleListModal}
            onArticleAmountTagClick={onArticleAmountTagClick}
            onArticleListModalOk={onArticleListModalOk}
            onArticleListModalCancel={onArticleListModalOk}
            onDeleteCategoryButtonClick={onDeleteCategoryButtonClick}
            onDeleteCategoryConfirm={onDeleteCategoryConfirm}
            isModifyModalVisible={isModifyModalVisible}
            onModifyModalOk={onModifyModalOk}
            onModifyModalCancel={onModifyModalCancel}
            onModifyButtonClick={onModifyButtonClick}
            onCategoryNameInputChange={onCategoryNameInputChange}
            nameOfCategoryToModify={nameOfCategoryToModify}
        />
    );
}

export default React.memo(Manage);