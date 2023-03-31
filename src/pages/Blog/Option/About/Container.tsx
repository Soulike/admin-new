import {message, notification} from 'antd';
import {ButtonProps} from 'antd/lib/button/button';
import {TextAreaProps} from 'antd/lib/input';
import {ModalProps} from 'antd/lib/modal';
import React, {useEffect, useState} from 'react';

import {Blog} from '@/src/apis';
import {useMarkdownConverter} from '@/src/hooks/useMarkdownConverter';

import {AboutView} from './View';

export function About() {
    const [aboutMarkdown, setAboutMarkdown] = useState('');
    const [previewModalOpen, setPreviewModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        Blog.Option.get().then((result) => {
            if (result !== null) {
                const {about} = result;
                setAboutMarkdown(about);
                setLoading(false);
            }
        });
    }, []);

    const {loading: converterLoading, html: aboutHtml} =
        useMarkdownConverter(aboutMarkdown);

    const onAboutTextareaChange: TextAreaProps['onChange'] = (e) => {
        setAboutMarkdown(e.target.value);
    };

    const onPreviewButtonClick: ButtonProps['onClick'] = () => {
        setPreviewModalOpen(true);
    };

    const onSubmitButtonClick: ButtonProps['onClick'] = async () => {
        if (aboutMarkdown.length !== 0) {
            setLoading(true);
            const result = await Blog.Option.set(aboutMarkdown);
            setLoading(false);
            if (result !== null) {
                notification.success({message: '修改关于成功'});
            }
        } else {
            message.warning('关于内容不能为空');
        }
    };

    const onPreviewModalOk: ModalProps['onOk'] = () => {
        setPreviewModalOpen(false);
    };

    const onPreviewModalCancel: ModalProps['onCancel'] = onPreviewModalOk;

    return (
        <AboutView
            onSubmitButtonClick={onSubmitButtonClick}
            about={aboutMarkdown}
            aboutHtml={aboutHtml ?? ''}
            previewModalOpen={previewModalOpen}
            onAboutTextareaChange={onAboutTextareaChange}
            onPreviewButtonClick={onPreviewButtonClick}
            onPreviewModalCancel={onPreviewModalCancel}
            onPreviewModalOk={onPreviewModalOk}
            loading={loading || converterLoading}
        />
    );
}

export default React.memo(About);
