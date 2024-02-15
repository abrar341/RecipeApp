const saves = (recipes = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_SAVES":
      return action.payload;
    case "SAVE":
      return [...recipes, action.payload];
    case "UNSAVE":
      return recipes.filter((recipe) => recipe._id !== action.payload._id);
    default:
      return recipes;
  }
};
export default saves;
