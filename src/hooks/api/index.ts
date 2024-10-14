import {
    BaseQueryFn,
    FetchArgs,
    createApi,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.API_URL,
});

const baseQueryWithInterceptor: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        console.log('Unauthorized.');
    }

    return result;
};

export const api = createApi({
    baseQuery: baseQueryWithInterceptor,
    endpoints: (builder) => ({
        getItems: builder.query({
            query: (resource: string) => `${resource}`,
        }),

        getItemById: builder.query({
            query: (id: number) => `/items/${id}`,
        }),

        addItem: builder.mutation({
            query: (newItem) => ({
                url: '/items',
                method: 'POST',
                body: newItem,
            }),
        }),

        deleteItem: builder.mutation({
            query: (id: number) => ({
                url: `/items/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetItemsQuery,
    useGetItemByIdQuery,
    useAddItemMutation,
    useDeleteItemMutation,
} = api;
