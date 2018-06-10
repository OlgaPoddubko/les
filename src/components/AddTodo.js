// draft
let AddTodo = ({dispatch}) => { // думаю, что читается как context.state.dispatch
  let input;

  return (
    <div>
      <input ref={ node => {
        input = node;
      }} />
      <button onClick={() => {
        dispatch(addTodo(input.value));
        input.value = '';
      }}>
        Add Todo
      </button>
    </div>
  );
};
AddTodo = connect()(AddTodo); // state мапить не надо - null, dispatch вытянется по умолчанию
