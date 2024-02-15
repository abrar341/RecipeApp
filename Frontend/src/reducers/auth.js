const initialState = {};

const auth = (authState = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    default:
      return authState; // Return the current state for unknown action types
  }
};

export default auth;
