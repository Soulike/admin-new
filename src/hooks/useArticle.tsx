import {useEffect, useState} from 'react';

import {Blog} from '@/src/apis';
import {Article} from '@/src/types';

const {Article: ArticleApi} = Blog;

export function useArticle(id: number | undefined): {
    loading: boolean;
    article: Article | null;
} {
    const [loading, setLoading] = useState(true);
    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        setArticle(null);
        setLoading(true);
        if (typeof id !== 'number') {
            return;
        }
        ArticleApi.getById(id)
            .then((article) => setArticle(article))
            .finally(() => setLoading(false));
    }, [id]);

    return {loading, article};
}
