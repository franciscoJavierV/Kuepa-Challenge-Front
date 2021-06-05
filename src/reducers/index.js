const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_REQ":
      return {
        ...state,
        user: action.payload.user,
      };
    case "SET-MESS-REQ":
      return {
        ...state,
        history: action.payload
      };
      default:
        return state;
  };

}
export default reducer;