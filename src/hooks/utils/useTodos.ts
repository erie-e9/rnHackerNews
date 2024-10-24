import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Logger } from '@services';
import { clearError } from '@slices/shared';
import {
    useGetItemsQuery, useGetItemByIdQuery, useAddItemMutation, useUpdateItemMutation, usePatchItemMutation, useDeleteItemMutation,
} from '@hooks/api';
import { type TodosState, type Todo } from '@slices/types';

export const useTodos = () => {
    const dispatch = useDispatch();
    const { data, isLoading, error, refetch } = useGetItemsQuery('');
    const [addItem] = useAddItemMutation();
    const [updateItem] = useUpdateItemMutation();
    const [patchItem] = usePatchItemMutation();
    const [deleteItem] = useDeleteItemMutation();

    if (error) {
        dispatch(clearError());
    }

    const { todos } = useSelector(
        (state: { todos: TodosState }) => state.todos,
    );

    const addTodo = useCallback(async (todo: Partial<Todo>) => {
        try {
            const payload = await addItem({ todo }).unwrap();
            Logger.log('addTodo', { payload, mitodo: payload });
            return payload
        } catch (error) {
            Logger.error('[useTodos] addTodo:', { error });
        }
    }, [dispatch]);

    const updateTodo = useCallback(async (todo: Todo) => {
        try {
            const payload = await updateItem({ todo }).unwrap();
            Logger.log('updateTodo', { payload, mitodo: payload });
            return payload
        } catch (error) {
            Logger.error('[useTodos] updateTodo:', { error });
        }
    }, [dispatch]);

    const deleteTodo = useCallback(async (idItem: string | number) => {
        try {
            const payload = await deleteItem(idItem);
            Logger.log('deleteTodo', { payload });
            return payload
        } catch (error) {
            Logger.error('[useTodos] deleteTodo:', { error });
        }
    }, [dispatch]);

    const getTodo = (idItem: string | number) => {
        const { data, isLoading, error } = useGetItemByIdQuery(idItem);
        return data;
    };

    return {
        data,
        isLoading,
        todos,
        addTodo,
        deleteTodo,
        getTodo,
        updateTodo,
    };
};
