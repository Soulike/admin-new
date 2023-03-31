import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {Button, List, Popconfirm, Tag, Tooltip} from 'antd';
import {ButtonProps} from 'antd/lib/button/button';
import {InputProps} from 'antd/lib/input';
import {ModalProps} from 'antd/lib/modal';
import {PopconfirmProps} from 'antd/lib/popconfirm';
import {TagProps} from 'antd/lib/tag';

import {Category} from '@/src/types';

import {ArticleListModal} from './Component/ArticleListModal';
import {ModifyModal} from './Component/ModifyModal';
import Style from './Style.module.scss';

const {Item} = List;
const {Meta} = Item;
const {Group} = Button;

interface Props {
    loading: boolean;

    categoryMap: Map<number, Category>;
    categoryToArticleNumberMap: Map<number, number>;

    isArticleListModalVisible: boolean;
    categoryIdOfArticleListModal: number;
    onArticleAmountTagClick: (id: number) => TagProps['onClick'];
    onArticleListModalOk: ModalProps['onOk'];
    onArticleListModalCancel: ModalProps['onCancel'];

    onModifyButtonClick: (id: number) => ButtonProps['onClick'];
    isModifyModalVisible: boolean;
    onModifyModalOk: ModalProps['onOk'];
    onModifyModalCancel: ModalProps['onCancel'];
    nameOfCategoryToModify: string;
    onCategoryNameInputChange: InputProps['onChange'];

    onDeleteCategoryButtonClick: (id: number) => ButtonProps['onClick'];
    onDeleteCategoryConfirm: PopconfirmProps['onConfirm'];
}

export function ManageView(props: Props) {
    const {
        loading,
        categoryMap,
        categoryToArticleNumberMap,
        categoryIdOfArticleListModal,
        isArticleListModalVisible,
        onArticleAmountTagClick,
        onArticleListModalOk,
        onArticleListModalCancel,
        onDeleteCategoryButtonClick,
        onDeleteCategoryConfirm,
        isModifyModalVisible,
        onModifyModalOk,
        onModifyModalCancel,
        onModifyButtonClick,
        nameOfCategoryToModify,
        onCategoryNameInputChange,
    } = props;

    const categoryInModal = categoryMap.get(categoryIdOfArticleListModal);
    return (
        <div className={Style.Manage}>
            <List
                loading={loading}
                dataSource={Array.from(categoryMap.values())}
                bordered={true}
                pagination={{
                    position: 'bottom',
                    pageSizeOptions: ['5', '10', '15', '20'],
                    showSizeChanger: true,
                    hideOnSinglePage: true,
                }}
                renderItem={({id, name}) => {
                    return (
                        <Item>
                            <Meta title={<Tag color={'blue'}>{name}</Tag>} />
                            <Tag
                                onClick={onArticleAmountTagClick(id!)}
                                className={Style.articleAmountTag}>
                                文章：{categoryToArticleNumberMap.get(id!)}
                            </Tag>
                            <Group
                                size={'small'}
                                className={Style.buttonWrapper}>
                                <Tooltip title={'编辑文章分类'}>
                                    <Button
                                        type={'primary'}
                                        ghost={true}
                                        onClick={onModifyButtonClick(id!)}>
                                        <EditOutlined />
                                    </Button>
                                </Tooltip>
                                <Tooltip title={'删除文章分类'}>
                                    <Popconfirm
                                        title={`确认删除文章分类 "${name}"？`}
                                        onConfirm={onDeleteCategoryConfirm}>
                                        <Button
                                            danger={true}
                                            ghost={true}
                                            onClick={onDeleteCategoryButtonClick(
                                                id!,
                                            )}>
                                            <DeleteOutlined />
                                        </Button>
                                    </Popconfirm>
                                </Tooltip>
                            </Group>
                        </Item>
                    );
                }}></List>
            <ArticleListModal
                visible={isArticleListModalVisible}
                categoryInModal={categoryInModal}
                onOk={onArticleListModalOk}
                onCancel={onArticleListModalCancel}
            />
            <ModifyModal
                visible={isModifyModalVisible}
                onOk={onModifyModalOk}
                onCancel={onModifyModalCancel}
                categoryName={nameOfCategoryToModify}
                onCategoryNameInputChange={onCategoryNameInputChange}
            />
        </div>
    );
}
