import api from '@hooks/api/api';
import { Todo } from '@slices/types';

const headers = {
    'Content-type': 'application/json; charset=UTF-8'
};

export const useTodosApi = api({
    baseUrl: process.env.API_URL_TODOS || '',
    reducerPath: 'todosApi',
    endpoints: (builder) => ({
        getItems: builder.query({
            query: () => `posts`,
        }),

        getItemById: builder.query({
            query: (id: string | number) => `posts/${id}`,
        }),

        addItem: builder.mutation({
            query: (newItem: Todo) => ({
                url: 'posts',
                method: 'POST',
                body: newItem,
                headers
            }),
        }),

        updateItem: builder.mutation({
            query: (item: Todo) => ({
                url: `posts/${item.id}`,
                method: 'UPDATE',
                body: item,
                headers
            }),
        }),

        patchItem: builder.mutation({
            query: (item: Todo) => ({
                url: `posts/${item.id}`,
                method: 'PATCH',
                body: item,
                headers
            }),
        }),

        deleteItem: builder.mutation({
            query: (id: string | number) => ({
                url: `posts/${id}`,
                method: 'DELETE',
                headers
            }),
        }),
    }),
});

export const {
    useGetItemsQuery,
    useGetItemByIdQuery,
    useAddItemMutation,
    useUpdateItemMutation,
    usePatchItemMutation,
    useDeleteItemMutation,
} = useTodosApi;

