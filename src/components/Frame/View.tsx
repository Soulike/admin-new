import {DashboardFilled, PoweroffOutlined} from '@ant-design/icons';
import {Button, Card, Layout} from 'antd';
import {ButtonProps} from 'antd/lib/button/button';
import {Link, Outlet} from 'react-router-dom';

import {PAGE_ID, PAGE_ID_TO_ROUTE} from '@/src/config/route';

import {LinkList} from './Component/LinkList';
import Style from './Style.module.scss';

const {Header, Content, Footer} = Layout;

interface Props {
    onExitButtonClick: ButtonProps['onClick'];
}

export function FrameView(props: Props) {
    const {onExitButtonClick} = props;
    return (
        <Layout className={Style.Frame}>
            <Header className={Style.header}>
                <Link to={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.INDEX]}>
                    <div className={Style.iconWrapper}>
                        <DashboardFilled className={Style.icon} />
                        <span className={Style.text}>后台管理</span>
                    </div>
                </Link>
                <div className={Style.linkListWrapper}>
                    <LinkList />
                </div>
                <Button
                    type={'link'}
                    className={Style.exitButton}
                    size={'large'}
                    onClick={onExitButtonClick}>
                    <PoweroffOutlined />
                    退出登录
                </Button>
            </Header>
            <Layout className={Style.contentLayout}>
                <Content className={Style.content}>
                    <Card className={Style.card} bodyStyle={{height: '100%'}}>
                        <Outlet />
                    </Card>
                </Content>
            </Layout>
            <Footer className={Style.footer}>Created By Soulike</Footer>
        </Layout>
    );
}
