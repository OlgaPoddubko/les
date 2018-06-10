import { combineReducers } from 'redux';
import todos, * as fromTodos from './todos';

const todoApp = combineReducres({
  todos,
});

export default todoApp;

export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter);
