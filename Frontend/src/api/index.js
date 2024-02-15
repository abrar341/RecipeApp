import axios from "axios";

const url = "http://localhost:5000/recipes";
const auth_url = "http://localhost:5000/auth";

export const fetchRecipes = () => axios.get(url);

export const createRecipe = async (newRecipe, token) => {
  return await axios.post(
    url,
    { ...newRecipe },
    {
      headers: { authorization: token },
    }
  );
};
export const updateRecipe = async (newRecipe) => {
  const { _id } = newRecipe;
  return await axios.put(`${url}/update/${_id}`, { ...newRecipe });
};
export const getSaveRecipes = (userID) => {
  return axios.get(`${url}/savedRecipes/${userID}`);
};
export const saveRecipe = async ({ recipeID, userID }) => {
  return await axios.put(url, {
    userId: userID,
    recipeId: recipeID,
  });
};

export const unSaveRecipe = async ({ recipeID, userID }) => {
  return await axios.put(`${url}/unsave`, {
    userId: userID,
    recipeId: recipeID,
  });
};

export const removeYourRecipe = async ({ recipeID, userID }) => {
  return await axios.put(`${url}/remove`, {
    userId: userID,
    recipeId: recipeID,
  });
};

export const getSaveIDs = async (userID) => {
  return await axios.get(`${url}/savedRecipes/ids/${userID}`);
};

export const getYourIDs = async (userID) => {
  return axios.get(`${url}/yourRecipes/ids/${userID}`);
};

export const deleteRecipe = (recipeID) => {
  axios.delete(`${url}/${recipeID}`);
};

export const login = async (toLogin) => {
  const { username, password } = toLogin;
  return await axios.post(`${auth_url}/login`, {
    username,
    password,
  });
};
