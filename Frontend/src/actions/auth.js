import * as api from "../api/index.js";

export const SignIn =
  ({ toLogin }) =>
  async (dispatch) => {
    try {
      const { data } = await api.login(toLogin);
      await dispatch({ type: "LOGIN", payload: null });
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };
