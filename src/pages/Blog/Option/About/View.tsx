import {Button, Input} from 'antd';
import {NativeButtonProps} from 'antd/lib/button/button';
import {TextAreaProps} from 'antd/lib/input';
import {ModalProps} from 'antd/lib/modal';

import {ArticlePreviewModal} from '@/src/components/ArticlePreviewModal';

import Style from './Style.module.scss';

const {TextArea} = Input;

interface Props
{
    about: string,
    aboutHtml: string,
    onAboutTextareaChange: TextAreaProps['onChange'],
    onPreviewButtonClick: NativeButtonProps['onClick'],
    onSubmitButtonClick: NativeButtonProps['onClick'],

    onPreviewModalOk: ModalProps['onOk'],
    onPreviewModalCancel: ModalProps['onCancel'],
    previewModalVisible: boolean,
    loading: boolean,
}

export function AboutView(props: Props)
{
    const {
        onAboutTextareaChange,
        about,
        aboutHtml,
        onPreviewModalCancel,
        onPreviewModalOk,
        previewModalVisible,
        onSubmitButtonClick,
        onPreviewButtonClick,
        loading,
    } = props;

    return (
        <div className={Style.About}>
            <TextArea className={Style.textarea}
                      placeholder={'关于内容（Markdown）'}
                      onChange={onAboutTextareaChange}
                      value={about} disabled={loading} />
            <Button.Group size={'large'} className={Style.buttonWrapper}>
                <Button disabled={loading} onClick={onPreviewButtonClick}>预览</Button>
                <Button disabled={loading} type={'primary'} onClick={onSubmitButtonClick}>提交</Button>
            </Button.Group>
            <ArticlePreviewModal title={'关于'}
                                 HTMLContent={aboutHtml}
                                 onOk={onPreviewModalOk}
                                 onCancel={onPreviewModalCancel}
                                 visible={previewModalVisible} />
        </div>
    );
}