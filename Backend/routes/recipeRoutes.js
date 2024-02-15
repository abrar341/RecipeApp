const express = require("express");
const router = express.Router();
const RecipesModel = require("../models/recipesModel");
const userModel = require("../models/userModel");
const verifyToken = require("../middleware/verifyToken");

router.get("/", async (req, res) => {
  try {
    const result = await RecipesModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", verifyToken, async (req, res) => {
  const recipe = await new RecipesModel(req.body);
  try {
    const response = await recipe.save();
    const user = await userModel.findById(response.userOwner);

    console.log("User", user);
    const res = await user.yourRecipes.push(response._id);
    console.log("ID", res);
    await user.save();
    console.log("Recipe Created Successfully");
    res.status(200).json({ response, res });
  } catch (error) {
    res.json(error);
  }
});

// Get a recipe by ID
router.get("/:recipeId", async (req, res) => {
  try {
    const result = await RecipesModel.findById(req.params.recipeId);
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Save a Recipe
router.put("/", async (req, res) => {
  const recipe = await RecipesModel.findById(req.body.recipeId);
  const user = await userModel.findById(req.body.userId);
  try {
    user.savedRecipes.push(recipe);
    await user.save();
    res.status(201).json(recipe);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Unsave a Recipe
router.put("/unsave", async (req, res) => {
  try {
    const recipeId = req.body.recipeId;
    const userId = req.body.userId;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const recipe = await RecipesModel.findById(req.body.recipeId);
    const savedIndex = user.savedRecipes.indexOf(recipeId);
    if (savedIndex === -1) {
      return res
        .status(404)
        .json({ message: "Recipe not found in saved recipes" });
    }

    user.savedRecipes.splice(savedIndex, 1);
    await user.save();

    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/remove", async (req, res) => {
  try {
    const recipeId = req.body.recipeId;
    const userId = req.body.userId;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const recipe = await RecipesModel.findById(req.body.recipeId);
    const savedIndex = user.yourRecipes.indexOf(recipeId);
    if (savedIndex === -1) {
      return res
        .status(404)
        .json({ message: "Recipe not found in your recipes" });
    }

    user.yourRecipes.splice(savedIndex, 1);
    await user.save();

    res.status(200).json({ message: "recipe removed successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get id of saved recipes
router.get("/savedRecipes/ids/:userId", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    res.status(201).json(user?.savedRecipes);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/yourRecipes/ids/:userId", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    res.status(201).json(user?.yourRecipes);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get Individual Recipe by recipe Id
router.get("/savedRecipe/Id/:recipeId", async (req, res) => {
  try {
    const recipe = await RecipesModel.findById(req.params.recipeId);
    // res.json({ detail: "recipe" });
    res.json(recipe);
  } catch (error) {
    console.log("Not Found");
    res.status(404).json({ err: error });
  }
});

// Get saved recipes
router.get("/savedRecipes/:userId", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    const savedRecipes = await RecipesModel.find({
      _id: { $in: user?.savedRecipes },
    });
    res.status(201).json(savedRecipes);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.delete("/:recipeId", async (req, res) => {
  const { recipeId } = req.params;
  const deletedRecipe = await RecipesModel.findByIdAndRemove(recipeId);

  res.status(200).json({ message: "Recipe deleted successfully." });
});

router.put("/update/:recipeid", async (req, res) => {
  const { recipeid } = req.params;
  try {
    const updatedRecipe = await RecipesModel.findByIdAndUpdate(
      recipeid,
      req.body,
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
