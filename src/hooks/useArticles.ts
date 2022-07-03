import { useEffect, useState } from 'react';

import {Blog} from '@/src/apis';
import {Article} from '@/src/types';

const {Article: ArticleApi} = Blog;

export function useArticles(categoryId: number | null | undefined): {
    loading: boolean;
    articles: Article[] | null;
} {
    const [articles, setArticles] = useState<Article[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setArticles(null);
        if (categoryId === undefined) {
            return;
        }

        const promise =
            categoryId === null
                ? ArticleApi.getAll()
                : ArticleApi.getByCategory(categoryId);

        promise
            .then((articles) => setArticles(articles))
            .finally(() => setLoading(false));
    }, [categoryId]);

    return {loading, articles};
}
