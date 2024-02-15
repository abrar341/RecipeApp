import React, { useEffect } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useDispatch, useSelector } from "react-redux";
import { UnSave, getSaveRecipes } from "../actions/recipes";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const SavedRecipes = ({ setbtn }) => {
  const userID = useGetUserID();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.saves);
  useEffect(() => {
    dispatch(getSaveRecipes(userID));
    setbtn(1);
  }, [dispatch]);

  return (
    <div className="recipes-container">
      <h1>Saved Recipes</h1>
      {data.length === 0 ? (
        <h2>No recipes saved</h2>
      ) : (
        <ul className="all-recipe">
          {data.map((recipes, index) => (
            <li key={index} className="single-recipe">
              <div className="recipe-image">
                <img src={recipes.imageUrl} alt={recipes.name} />
              </div>
              <div>
                <h2>{recipes.name}</h2>
              </div>
              <p>Cooking Time:{recipes.cookingTime} minutes</p>
              <button
                onClick={() =>
                  dispatch(UnSave({ userID, recipeID: recipes._id }))
                }
              >
                <FavoriteIcon />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
