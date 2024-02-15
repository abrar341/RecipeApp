const yours = (IDs = [], action) => {
  switch (action.type) {
    case "FETCH_YOUR_RECIPES":
      return action.payload;
    case "ADD_TO_YOUR":
      return [...IDs, action.payload._id];
    case "REMOVE_YOUR_ID":
      return IDs.filter((recipe) => recipe !== action.payload);
    default:
      return IDs;
  }
};
export default yours;
