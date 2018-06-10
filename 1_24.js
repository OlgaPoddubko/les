// pass store via props (bad solution)

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

// presentatioanal component
const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration:
        completed ?
          'line-through' :
          'none'
    }}>
    {text}
  </li>
);

// presentatioanal component
const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo =>
    <Todo
      key={todo.id}
      {...todo}
      onClick={() => onTodoClick(todo.id)}
    />
    )}
  </ul>
);

const AddTodo = ({store}) => { // mixed type of container
  let input;

  return (
    <div>
      <input ref={ node => {
        input = node;
      }} />
      <button onClick={() => {
        store.dispatch({
          type: 'ADD_TODO',
          id: nextTodo++,
          text: input.value
        })
        input.value = '';
      }}>
        Add Todo
      </button>
    </div>
  );
};

// вспомогательная функция фильтрации
const getVisibleTodos = (todos, filter ) => {
  switch (filter) {
  case 'SHOW_ALL':
    return todos;
  case 'SHOW_COMPLETED':
    return todos.filter(
      t => t.completed
    );
  case 'SHOW_ACTIVE':
    return todos.filter(
      t => !t.completed
    );
  }
}

const { combineReducers } = Redux;
const todoApp = combineReducers({ todos, visibilityFilter });

const { Component } = React;

const Link  = ({ active, children, onClick }) => {
  if ( active ) {
    return <span>{children}</span>;
  }
  return (
    <a href='#'
      onclick = {e => {
        e.preventDefault();
        onClick();
      }} >
      {children}
    </a>
  );
};

class FilterLink extends Component {
  componentDidMount() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate() // React provides forceUpdate
    );
  }
  componentWillUnmount() {
    this.unsubscribe(); // it's a returned value of a store.subscribe method
  }
  render() {
    const props = this.props;
    const { store } = this.props;
    const state = store.getState(); // here store is a Redux store

    return (
      <Link
        active={
          props.filter ===
          state.visibilityFilter
        }
        onClick={() =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }
      >
        {props.children}
      </Link>
    )
  }
}

const Footer = ({store}) => (
  <p>
    Show:
    {' '}
    <FilterLink filter = 'SHOW_ALL' store = {store}> All </FilterLink>
    {' '}
    <FilterLink filter = 'SHOW_ACTIVE' store = {store}> Active </FilterLink>
    {' '}
    <FilterLink filter = 'SHOW_COMPLETED' store = {store}> Completed </FilterLink>
  </p>
);

class VisibleTodoList extends Component {
  componentDidMount() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate() // React provides forceUpdate
    );
  }

  componentWillUnmount() {
    this.unsubscribe(); // it's a returned value of a store.subscribe method
  }

  render() {
    const { store } = this.props;
    const props = this.props;
    const state = store.getState();

    return (
      <TodoList
      todos = {
        getVisibleTodos(
          state.todos,
          state.visibilityFilter
        )
      }
      onTodoClick = { =>
          store.dispatch({
            type: 'TOGGLE_TODO',
            id
          })
      }
      />
    );
  }
}

class TodoApp = ({store}) => (
  <div>
    <AddTodo store = {store} />
    <VisibleTodoList store = {store} />
    <Footer store = {store} />
  </div>
);


const { createStore } = Redux;

ReactDom.render(
  <TodoApp store = {createStore(todoApp)} />,
  document.getElementDuId('root')
);
