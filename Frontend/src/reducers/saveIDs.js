const saveIDs = (IDs = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_IDs":
      return action.payload;
    case "ADD_ID":
      return [...IDs, action.payload._id];
    case "REMOVE_ID":
      const { _id } = action.payload;
      return IDs.filter((recipe) => recipe !== _id);
    default:
      return IDs;
  }
};
export default saveIDs;
