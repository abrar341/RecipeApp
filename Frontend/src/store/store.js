import { applyMiddleware, compose, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import recipeReducer from "../reducers/recipes";
import savesReducer from "../reducers/saves";
import IDsReducer from "../reducers/saveIDs";
import yourReducers from "../reducers/yours";
import authReducer from "../reducers/auth";
const store = configureStore(
  {
    reducer: {
      recipes: recipeReducer,
      saves: savesReducer,
      IDs: IDsReducer,
      yours: yourReducers,
      auth: authReducer,
    },
  },
  compose(applyMiddleware(thunk))
);
export default store;
