import {Input, Modal} from 'antd';
import {InputProps} from 'antd/lib/input';
import {ModalProps} from 'antd/lib/modal';

import Style from './Style.module.scss';

interface Props {
    visible: ModalProps['visible'];
    onOk: ModalProps['onOk'];
    onCancel: ModalProps['onCancel'];

    categoryName: string;
    onCategoryNameInputChange: InputProps['onChange'];
}

export function ModifyModal(props: Props) {
    const {visible, onCancel, onOk, onCategoryNameInputChange, categoryName} =
        props;
    return (
        <Modal
            title={'编辑文章分类'}
            destroyOnClose={true}
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            width={'25vw'}>
            <div className={Style.ModifyModal}>
                <Input
                    className={Style.categoryNameInput}
                    addonBefore={'文章分类名'}
                    onChange={onCategoryNameInputChange}
                    value={categoryName}
                />
            </div>
        </Modal>
    );
}
