import {
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  GET_TODOS,
  CLEAR_TODOS,
} from "./actions";

const initialState = {
  todos: [],
};

export function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: state.todos.concat([action.payload]),
      };
    case EDIT_TODO:
      let newTodo = action.payload[0];
      let index = state.todos.findIndex((i) => i.id === newTodo.id);

      state.todos.splice(index, 1, newTodo);
      return {
        todos: state.todos,
      };
    case DELETE_TODO:
      return {
        todos: state.todos.filter((todo) => {
          console.log(action.payload);
          return todo.id !== action.payload;
        }),
      };
    case GET_TODOS:
      return {
        todos: state.todos.concat(action.payload).sort((a, b) => a.id - b.id),
      };
    case CLEAR_TODOS:
      return {
        todos: [],
      };
    default:
      return state;
  }
}
