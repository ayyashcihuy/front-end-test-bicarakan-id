import actionType from "./actionType";

const initialTodo: any = {
  todoList: [],
  loading: false,
  error: null,
  categoryName: "all",
};

function reducer(state = initialTodo, action: { type: any; payload: any }) {
  switch (action.type) {
    case actionType.FETCH_DATA:
      return {
        ...state,
        todoList: action.payload,
      };
    case actionType.CHANGE_CATEGORY:
      return {
        ...state,
        categoryName: action.payload,
      };
    case actionType.CHANGE_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case actionType.CHANGE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
