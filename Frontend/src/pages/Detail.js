import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

export const Detail = ({
  setShowDetails,
  detailItem: recipe,
  setDetailItem,
}) => {
  return (
    <>
      <div className="recipes-container">
        <h1>Recipes Detail</h1>
        {/* <ul className="all-recipe"> */}

        <li className="single-recipe detail">
          <div
            style={{
              alignSelf: "flex-end",
            }}
          >
            <button
              onClick={() => {
                setDetailItem(null);
                setShowDetails(false);
              }}
            >
              <CloseRoundedIcon />
            </button>
          </div>
          <div
            style={{
              marginTop: " -52px",
            }}
            className="recipe-image"
          >
            <img src={recipe.imageUrl} alt={recipe.name} />
          </div>
          <div>
            <h2>{recipe.name}</h2>
          </div>
          <p>
            <AccessTimeRoundedIcon />
            {recipe.cookingTime} minutes
          </p>
          <p>
            <b>Instructions:</b>
            {recipe.instructions}
          </p>
          <div className="ingridients">
            <b>Ingredients:</b>
            {recipe.ingredients.map((i, index) => (
              <p key={index}>
                {1 + index}){i}
              </p>
            ))}
          </div>
        </li>
      </div>
    </>
  );
};
