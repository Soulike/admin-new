import {Modal, notification} from 'antd';
import {NativeButtonProps} from 'antd/lib/button/button';
import {ModalFuncProps} from 'antd/lib/modal';
import {useCallback, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {Account as AccountApi} from '@/src/apis';
import {Loading} from '@/src/components/Loading';
import {useIsLoggedIn} from '@/src/hooks/useIsLoggedIn';

import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../config/route';
import {FrameView} from './View';

export function Frame() {
    const navigate = useNavigate();

    const {loading, isLoggedIn} = useIsLoggedIn();

    useEffect(() => {
        if (!loading && !isLoggedIn) {
            navigate(PAGE_ID_TO_ROUTE[PAGE_ID.LOGIN], {replace: true});
        }
    }, [isLoggedIn, loading, navigate]);

    const onExitModalOkButtonClick: ModalFuncProps['onOk'] =
        useCallback(async () => {
            await AccountApi.logout();
            notification.success({
                message: '退出成功',
            });
            navigate(PAGE_ID_TO_ROUTE[PAGE_ID.LOGIN], {replace: true});
        }, [navigate]);

    const onExitButtonClick: NativeButtonProps['onClick'] = useCallback<
        Exclude<NativeButtonProps['onClick'], undefined>
    >(
        (e) => {
            e.preventDefault();
            Modal.confirm({
                content: '确认退出？',
                onOk: onExitModalOkButtonClick,
            });
        },
        [onExitModalOkButtonClick],
    );

    return (
        <>
            {loading && <Loading />}
            {!loading && <FrameView onExitButtonClick={onExitButtonClick} />}
        </>
    );
}
