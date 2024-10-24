import { api } from '@hooks/api/api';

const headers = {
    'Content-type': 'application/json; charset=UTF-8'
};

export const useArticlesApi = api({
    baseUrl: process.env.API_URL || '',
    reducerPath: 'articlesApi',
    endpoints: (builder) => ({
        getArticles: builder.query({
            query: (resource: string) => `search_by_date?query=${resource}`
        })
    })
});

export const {
    useGetArticlesQuery
} = useArticlesApi;

