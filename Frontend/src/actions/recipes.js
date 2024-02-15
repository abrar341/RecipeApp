import * as api from "../api/index.js";

export const getRecipes = () => async (dispatch) => {
  try {
    const { data } = await api.fetchRecipes();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createRecipe =
  ({ recipe, token }) =>
  async (dispatch) => {
    try {
      const { data, status } = await api.createRecipe(recipe, token);
      dispatch({ type: "CREATE", payload: data });
      return status;
    } catch (error) {
      console.log(error);
      return error.response.status;
    }
  };

export const updateRecipe =
  ({ recipe }) =>
  async (dispatch) => {
    try {
      const { data } = await api.updateRecipe(recipe);
      dispatch({ type: "UPDATE", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const getSaveRecipes = (userId) => async (dispatch) => {
  try {
    const { data } = await api.getSaveRecipes(userId);
    dispatch({ type: "FETCH_ALL_SAVES", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addToSave =
  ({ userID, recipeID, token }) =>
  async (dispatch) => {
    try {
      const { data } = await api.saveRecipe({
        userID,
        recipeID,
      });
      dispatch({ type: "ADD_ID", payload: data });
      dispatch({ type: "SAVE", payload: data });
    } catch (error) {
      console.log(error);
      return error.response.status;
    }
  };
export const UnSave =
  ({ userID, recipeID }) =>
  async (dispatch) => {
    try {
      const { data } = await api.unSaveRecipe({ userID, recipeID });
      dispatch({ type: "UNSAVE", payload: data });
      dispatch({ type: "REMOVE_ID", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const remove =
  ({ userID, recipeID }) =>
  async (dispatch) => {
    try {
      await api.removeYourRecipe({ userID, recipeID });
      dispatch({ type: "REMOVE_YOUR_ID", payload: recipeID });
    } catch (error) {
      console.log(error);
    }
  };

export const getSaveIDs = (userID) => async (dispatch) => {
  try {
    const response = await api.getSaveIDs(userID);
    const { data } = response;
    dispatch({ type: "FETCH_ALL_IDs", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteRecipe = (recipeID) => async (dispatch) => {
  try {
    await api.deleteRecipe(recipeID);
    dispatch({ type: "DELETE", payload: recipeID });
  } catch (error) {
    console.log(error);
  }
};
export const getYourIDS = (userID) => async (dispatch) => {
  try {
    const { data } = await api.getYourIDs(userID);
    dispatch({ type: "FETCH_YOUR_RECIPES", payload: data });
  } catch (error) {
    console.log(error);
  }
};
