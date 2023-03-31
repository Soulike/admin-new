import {Modal} from 'antd';
import {ModalProps} from 'antd/lib/modal';

import {ArticleShower} from '@/src/components/ArticleShower';

import Style from './Style.module.scss';

interface Props {
    title: string;
    HTMLContent: string;
    open: ModalProps['open'];
    onOk: ModalProps['onOk'];
    onCancel: ModalProps['onCancel'];
}

export function ArticlePreviewModal(props: Props) {
    const {title, HTMLContent, open, onOk, onCancel} = props;
    return (
        <Modal
            title={title}
            width={'80vw'}
            open={open}
            onOk={onOk}
            onCancel={onCancel}
            destroyOnClose={true}>
            <div className={Style.ArticlePreviewModal}>
                <ArticleShower HTMLContent={HTMLContent} />
            </div>
        </Modal>
    );
}
