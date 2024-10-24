import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { storage } from '@redux/store';
import { useTodosApi } from '@hooks/api';
import { type TodosState } from '@slices/types';

const initialState: TodosState = {
    todos: [],
    currentItem: null,
    loading: false,
    error: null,
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // GET /todos
            .addMatcher(useTodosApi.endpoints.getItems.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(useTodosApi.endpoints.getItems.matchFulfilled, (state, action: PayloadAction<any>) => {
                state.todos = action.payload;
                state.loading = false;
                storage.set('todos', JSON.stringify(action.payload));
            })
            .addMatcher(useTodosApi.endpoints.getItems.matchRejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error fetching todos';
            })

            // GET /todos/:id
            .addMatcher(useTodosApi.endpoints.getItemById.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(useTodosApi.endpoints.getItemById.matchFulfilled, (state, action: PayloadAction<any>) => {
                state.currentItem = action.payload;
                state.loading = false;
            })
            .addMatcher(useTodosApi.endpoints.getItemById.matchRejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error fetching todo';
            })

            // POST /todos
            .addMatcher(useTodosApi.endpoints.addItem.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(useTodosApi.endpoints.addItem.matchFulfilled, (state, action: PayloadAction<any>) => {
                state.todos.push(action.payload);
                state.loading = false;
                storage.set('todos', JSON.stringify(state.todos)); // Actualizar MMKV
            })
            .addMatcher(useTodosApi.endpoints.addItem.matchRejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error adding todo';
            })

            // DELETE /todos/:id
            .addMatcher(useTodosApi.endpoints.deleteItem.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(useTodosApi.endpoints.deleteItem.matchFulfilled, (state, action: PayloadAction<any>) => {
                state.todos = state.todos.filter((item) => item.id !== action.payload);
                state.loading = false;
                storage.set('todos', JSON.stringify(state.todos));
            })
            .addMatcher(useTodosApi.endpoints.deleteItem.matchRejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error deleting todo';
            });
    },
});

export const { clearError } = todosSlice.actions;

export default todosSlice.reducer;
