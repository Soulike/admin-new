import {Modal} from 'antd';
import {ModalProps} from 'antd/lib/modal';

import {ArticleShower} from '@/src/components/ArticleShower';

import Style from './Style.module.scss';

interface Props
{
    title: string,
    HTMLContent: string,
    visible: ModalProps['visible'],
    onOk: ModalProps['onOk'],
    onCancel: ModalProps['onCancel']
}

export function ArticlePreviewModal(props: Props)
{
    const {title, HTMLContent, visible, onOk, onCancel} = props;
    return (
        <Modal title={title} width={'80vw'} visible={visible} onOk={onOk} onCancel={onCancel} destroyOnClose={true}>
            <div className={Style.ArticlePreviewModal}>
                <ArticleShower HTMLContent={HTMLContent} />
            </div>
        </Modal>
    );
}