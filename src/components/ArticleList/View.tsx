import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {Button, List, Popconfirm, Skeleton, Switch, Tag, Tooltip} from 'antd';
import {ButtonProps} from 'antd/lib/button/button';
import {ModalProps} from 'antd/lib/modal';
import {PopconfirmProps} from 'antd/lib/popconfirm';
import {SwitchProps} from 'antd/lib/switch';
import {DOMAttributes} from 'react';

import {ArticlePreviewModal} from '@/src/components/ArticlePreviewModal';
import {Article, Category} from '@/src/types';

import Style from './Style.module.scss';

const {Item} = List;
const {Meta} = Item;
const {Group} = Button;

interface Props {
    articleMap: Map<number, Article>;
    categoryMap: Map<number, Category>;
    isLoading: boolean;

    onArticleTitleClick: (
        id: number,
    ) => DOMAttributes<HTMLSpanElement>['onClick'];
    articleInModalTitle: string;
    articleInModalHTMLContent: string;
    modalIsOpen: boolean;
    modalOnOk: ModalProps['onOk'];
    modalOnCancel: ModalProps['onCancel'];
    loadingArticleId: number;

    onIsVisibleSwitchClick: (id: number) => SwitchProps['onClick'];
    onModifyArticleButtonClick: (id: number) => ButtonProps['onClick'];
    onDeleteArticleButtonClick: (id: number) => ButtonProps['onClick'];
    onDeleteArticleConfirm: PopconfirmProps['onConfirm'];
}

export function ArticleListView(props: Props) {
    const {
        articleMap,
        categoryMap,
        isLoading,
        loadingArticleId,
        articleInModalHTMLContent,
        articleInModalTitle,
        modalIsOpen,
        modalOnCancel,
        modalOnOk,
        onArticleTitleClick,
        onIsVisibleSwitchClick,
        onModifyArticleButtonClick,
        onDeleteArticleButtonClick,
        onDeleteArticleConfirm,
    } = props;
    return (
        <div className={Style.ArticleList}>
            <Skeleton loading={isLoading} active={true} paragraph={{rows: 15}}>
                <List
                    dataSource={Array.from(articleMap.values())}
                    bordered={true}
                    pagination={{
                        position: 'bottom',
                        pageSizeOptions: ['5', '10', '15', '20'],
                        showSizeChanger: true,
                        hideOnSinglePage: true,
                    }}
                    renderItem={(article) => {
                        const {
                            id,
                            title,
                            isVisible,
                            publicationTime: publicationTimeString,
                            modificationTime: modificationTimeString,
                        } = article;
                        const publicationTime = new Date(
                            publicationTimeString!,
                        );
                        const modificationTime = new Date(
                            modificationTimeString!,
                        );
                        return (
                            <Item key={id}>
                                <Meta
                                    title={
                                        <span
                                            className={Style.title}
                                            onClick={onArticleTitleClick(id!)}>
                                            {title}
                                        </span>
                                    }
                                />
                                <Tag color={'blue'}>
                                    {
                                        categoryMap.get(
                                            articleMap.get(id!)!.category!,
                                        )!.name
                                    }
                                </Tag>
                                <Tag color={'geekblue'}>
                                    发表：
                                    <time>
                                        {`${publicationTime.getFullYear()}-${(
                                            publicationTime.getMonth() + 1
                                        )
                                            .toString()
                                            .padStart(2, '0')}-${publicationTime
                                            .getDate()
                                            .toString()
                                            .padStart(2, '0')}`}
                                    </time>
                                </Tag>
                                <Tag color={'geekblue'}>
                                    编辑：
                                    <time>
                                        {`${modificationTime.getFullYear()}-${(
                                            modificationTime.getMonth() + 1
                                        )
                                            .toString()
                                            .padStart(
                                                2,
                                                '0',
                                            )}-${modificationTime
                                            .getDate()
                                            .toString()
                                            .padStart(2, '0')}`}
                                    </time>
                                </Tag>
                                <Tooltip title={'更改文章可见性'}>
                                    <Switch
                                        className={Style.switch}
                                        onClick={onIsVisibleSwitchClick(id!)}
                                        checked={isVisible}
                                        disabled={loadingArticleId === id}
                                        loading={loadingArticleId === id}
                                        checkedChildren={'可见'}
                                        unCheckedChildren={'隐藏'}
                                    />
                                </Tooltip>
                                <Group
                                    size={'small'}
                                    className={Style.buttonWrapper}>
                                    <Tooltip title={'编辑文章'}>
                                        <Button
                                            type={'primary'}
                                            ghost={true}
                                            onClick={onModifyArticleButtonClick(
                                                id!,
                                            )}>
                                            <EditOutlined />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title={'删除文章'}>
                                        <Popconfirm
                                            title={`确认删除文章《${title}》？`}
                                            onConfirm={onDeleteArticleConfirm}>
                                            <Button
                                                danger={true}
                                                ghost={true}
                                                onClick={onDeleteArticleButtonClick(
                                                    id!,
                                                )}>
                                                <DeleteOutlined />
                                            </Button>
                                        </Popconfirm>
                                    </Tooltip>
                                </Group>
                            </Item>
                        );
                    }}
                />
            </Skeleton>
            <ArticlePreviewModal
                title={articleInModalTitle}
                HTMLContent={articleInModalHTMLContent}
                open={modalIsOpen}
                onOk={modalOnOk}
                onCancel={modalOnCancel}
            />
        </div>
    );
}
