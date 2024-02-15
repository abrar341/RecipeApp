import React, { useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createRecipe, updateRecipe } from "../actions/recipes";
import { useEffect } from "react";

export const CreateRecipe = ({
  setRecipe,
  recipe,
  btn,
  setbtn,
  updateUserOwner,
}) => {
  const userID = useGetUserID();
  const [cookies] = useCookies(["access_token"]);
  const [error, setError] = useState("");
  const [initial] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  useEffect(() => {
    handleUserOwnerUpdate();
  });

  const handleUserOwnerUpdate = () => {
    const newUserID = userID;
    updateUserOwner(newUserID);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (btn === 1) {
      // await handleUserOwnerUpdate();
      const status = await dispatch(
        createRecipe({ recipe, token: cookies.access_token })
      );
      if (status === 200) {
        navigate("/");
        setRecipe(initial);
      }
      if (status === 401) {
        setError("Please Login First...");
        setTimeout(() => {
          setError("");
          setRecipe(initial);
          navigate("/auth");
        }, 2000);
      }
    } else {
      dispatch(updateRecipe({ recipe }));
      setbtn(1);
      navigate("/");
      setRecipe(initial);
    }
  };

  return (
    <div className="create-recipe">
      {btn === 1 ? <h2>Create Recipe</h2> : <h2>Update Recipe</h2>}
      <p
        style={{
          color: "red",
          fontSize: "12px",
          height: "18px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {error}
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipe name"
          id="name"
          name="name"
          required
          onChange={handleChange}
          value={recipe.name}
        />
        <div className="ingredients">
          {recipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              required
              placeholder="Ingredients"
              type="text"
              name="ingredients"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, index)}
            />
          ))}
          <button type="button" onClick={handleAddIngredient}>
            Add Ingredient
          </button>
        </div>

        <textarea
          id="instructions"
          name="instructions"
          required
          value={recipe.instructions}
          onChange={handleChange}
          placeholder="Instructions"
        ></textarea>
        <input
          type="text"
          id="imageUrl"
          required
          name="imageUrl"
          placeholder="Image URL"
          value={recipe.imageUrl}
          onChange={handleChange}
        />
        <input
          type="number"
          id="cookingTime"
          required
          name="cookingTime"
          placeholder="Cooking Timing"
          value={recipe.cookingTime}
          onChange={handleChange}
        />

        {btn === 1 ? (
          <button className="submit-btn" type="submit">
            Create Recipe
          </button>
        ) : (
          <button className="submit-btn" type="submit">
            Update Recipe
          </button>
        )}
      </form>
    </div>
  );
};
