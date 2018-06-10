import { v4 } from 'node-uui';

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: v4(), //instead of (nextTodo++).toString()
  text,
});

/* удаляем, больше не надо, есть Link, Router filter
export const setVisibilityFilter = (filter) => {
  type: 'SET_VISIBILITY_FILTER',
  filter,
}
*/
export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});
