import { Scheme, arrayOf } from 'normalizr';

export const todo = new Schema('todos');
export const arrayOfTodos = arrayOf(todo);
