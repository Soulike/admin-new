import {Modal, notification} from 'antd';
import {NativeButtonProps} from 'antd/lib/button/button';
import {ModalFuncProps} from 'antd/lib/modal';
import React from 'react';
import {useNavigate} from 'react-router-dom';

import {Account as AccountApi} from '../../Api';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../config/route';
import View from './View';

function Frame()
{
    const navigate = useNavigate();

    const onExitModalOkButtonClick: ModalFuncProps['onOk'] = async () =>
    {
        await AccountApi.logout();
        notification.success({
            message: '退出成功',
        });
        navigate(PAGE_ID_TO_ROUTE[PAGE_ID.LOGIN], {replace: true});
    };

    const onExitButtonClick: NativeButtonProps['onClick'] = e =>
    {
        e.preventDefault();
        Modal.confirm({
            content: '确认退出？',
            onOk: onExitModalOkButtonClick,
        });
    };

    return (<View onExitButtonClick={onExitButtonClick} />);
}

export default React.memo(Frame);