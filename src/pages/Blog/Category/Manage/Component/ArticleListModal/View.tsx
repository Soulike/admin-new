import {Modal} from 'antd';
import {ModalProps} from 'antd/lib/modal';
import React from 'react';

import {ArticleList} from '@/src/components/ArticleList';
import {Category} from '@/src/types';

import Style from './Style.module.scss';

interface Props {
    visible: ModalProps['visible'];
    categoryInModal?: Category;
    onOk: ModalProps['onOk'];
    onCancel: ModalProps['onCancel'];
}

export function ArticleListModal(props: Props) {
    const {visible, categoryInModal, onOk, onCancel} = props;
    return (
        <Modal
            title={`分类"${
                categoryInModal ? categoryInModal.name : ''
            }"下的文章`}
            visible={visible}
            width={'80vw'}
            onOk={onOk}
            onCancel={onCancel}
            destroyOnClose={true}>
            <div className={Style.ArticleListModal}>
                <ArticleList
                    categoryIdFilter={
                        categoryInModal ? categoryInModal.id : undefined
                    }
                />
            </div>
        </Modal>
    );
}
