export type Todo = {
    userId: number;
    title: string
    completed: boolean;
    id?: number;
}

export interface TodosState {
    todos: Todo[];
    currentItem: any | null;
    loading: boolean;
    error: string | null;
}

export type TodosPayload = {
    payload: Partial<TodosState>;
};
