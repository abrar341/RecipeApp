import React, { useEffect } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ReadMoreOutlinedIcon from "@mui/icons-material/ReadMoreOutlined";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

import {
  addToSave,
  getRecipes,
  getSaveIDs,
  deleteRecipe,
  getYourIDS,
  UnSave,
  remove,
  getSaveRecipes,
} from "../actions/recipes";
import { useNavigate } from "react-router-dom";

export const Home = ({ setRecipe, setbtn, setShowDetails, setDetailItem }) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["access_token"]);

  const data = useSelector((state) => state.recipes);
  const yourRecipes = useSelector((state) => state.yours);
  const data1 = useSelector((state) => state.IDs);
  const userID = useGetUserID();
  const dispatch = useDispatch();

  const isRecipeSaved = (id) => data1.includes(id);
  const isRecipeYours = (id) => yourRecipes.includes(id);

  useEffect(() => {
    dispatch(getRecipes());
    if (cookies.access_token) {
      dispatch(getSaveRecipes(userID));
      dispatch(getSaveIDs(userID));
      dispatch(getYourIDS(userID));
    }
    setbtn(1);
  }, [dispatch, cookies.access_token, setbtn, userID]);

  return (
    <>
      <div className="recipes-container">
        <h1>All Recipes</h1>

        {data.length === 0 ? (
          <h2>Nothing to show</h2>
        ) : (
          <ul className="all-recipe">
            {data?.map((recipe, index) => (
              <li key={index} className="single-recipe">
                <div className="recipe-image">
                  <img src={recipe.imageUrl} alt={recipe.name} />
                </div>
                <div>
                  <h2>{recipe.name}</h2>
                </div>
                <p>
                  <AccessTimeRoundedIcon />
                  {recipe.cookingTime} minutes
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  {cookies.access_token ? (
                    !isRecipeSaved(recipe._id) ? (
                      <button
                        onClick={() => {
                          dispatch(addToSave({ userID, recipeID: recipe._id }));
                        }}
                      >
                        <FavoriteBorderIcon />
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          dispatch(UnSave({ userID, recipeID: recipe._id }))
                        }
                      >
                        <FavoriteIcon />
                      </button>
                    )
                  ) : (
                    ""
                  )}

                  {/* <button>Detail</button> */}
                  {cookies.access_token ? (
                    isRecipeYours(recipe._id) ? (
                      <>
                        <button
                          onClick={() => {
                            dispatch(deleteRecipe(recipe._id));
                            dispatch(remove({ userID, recipeID: recipe._id }));
                          }}
                        >
                          <DeleteOutlineIcon />{" "}
                        </button>
                        <button
                          onClick={() => {
                            setRecipe({ ...recipe });
                            setbtn(0);
                            navigate("/create-recipe");
                          }}
                        >
                          <EditOutlinedIcon />{" "}
                        </button>
                      </>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                  <button
                    onClick={() => {
                      setShowDetails(true);
                      setDetailItem(recipe);
                    }}
                  >
                    <ReadMoreOutlinedIcon />{" "}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
