const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  yourRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
});

module.exports = mongoose.model("users", userSchema);
