import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./AppCopy.css";
import { Navbar } from "./components/navbar";
import { Auth } from "./pages/auth";
import { Home } from "./pages/home";
import { SavedRecipes } from "./pages/saved-recipes";
import { CreateRecipe } from "./pages/create-recipe";
import { useState } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import { useGetUserID } from "./hooks/useGetUserID";
import { Detail } from "./pages/Detail";

function App() {
  const userID = useGetUserID();
  const [btn, setbtn] = useState(1);
  const [detailItem, setDetailItem] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });
  const updateUserOwner = (newUserOwner) => {
    setRecipe((prevRecipe) => ({ ...prevRecipe, userOwner: newUserOwner }));
  };

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          {!showDetails ? <Navbar /> : ""}

          <Routes>
            <Route
              path="/"
              element={
                !showDetails ? (
                  <Home
                    setRecipe={setRecipe}
                    setbtn={setbtn}
                    setShowDetails={setShowDetails}
                    setDetailItem={setDetailItem}
                    detailItem={detailItem}
                  />
                ) : (
                  <Detail
                    setRecipe={setRecipe}
                    setbtn={setbtn}
                    setShowDetails={setShowDetails}
                    setDetailItem={setDetailItem}
                    detailItem={detailItem}
                  />
                )
              }
            />
            <Route
              path="/saved-recipes"
              element={<SavedRecipes setbtn={setbtn} />}
            />
            <Route
              path="/create-recipe"
              element={
                <CreateRecipe
                  btn={btn}
                  setbtn={setbtn}
                  recipe={recipe}
                  setRecipe={setRecipe}
                  updateUserOwner={updateUserOwner}
                />
              }
            />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
