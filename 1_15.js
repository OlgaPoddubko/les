/* встроенный combineReducer
предполагает, что в state будут поля, и их будут обслуживать редьюсеры с такими же названиями,
поэтому ES6 запись позволяет передать в качестве аргументов объект типа
{
  todos,
  visibilityFilter
}
*/

const todo = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      };
      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};
/*
const todoApp = (state = {}, action) => { // комбинированный reducer
  return {
    todos: todos(
      state.todos,
      action
    ),
    visibilityFilter: visibilityFilter(
      state.visibilityFilter,
      action
    )
  };
};
*/
const { combineReducers } = Redux;
const todoApp = combineReducers({
  todos,
  visibilityFilter
});

/* как реализован встроенный combineReducers
const combineReducers = (reducers) => {
  return ( state ={}, action ) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](
          state[key],
          action
      );
      return nextState;
    },{});
  };
};
*/

const { createStore } = Redux;
const store = createStore(todoApp); // изменен reducer
