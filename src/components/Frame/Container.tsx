import {Modal, notification} from 'antd';
import {NativeButtonProps} from 'antd/lib/button/button';
import {ModalFuncProps} from 'antd/lib/modal';
import {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';

import {Account as AccountApi} from '@/src/apis';

import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../config/route';
import {FrameView} from './View';

export function Frame() {
    const navigate = useNavigate();

    const onExitModalOkButtonClick: ModalFuncProps['onOk'] =
        useCallback(async () => {
            await AccountApi.logout();
            notification.success({
                message: '退出成功',
            });
            navigate(PAGE_ID_TO_ROUTE[PAGE_ID.LOGIN], {replace: true});
        }, [navigate]);

    const onExitButtonClick: NativeButtonProps['onClick'] = (e) => {
        e.preventDefault();
        Modal.confirm({
            content: '确认退出？',
            onOk: onExitModalOkButtonClick,
        });
    };

    return <FrameView onExitButtonClick={onExitButtonClick} />;
}
