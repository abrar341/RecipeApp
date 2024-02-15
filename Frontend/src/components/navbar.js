import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../hooks/useGetUserID";
import { useDispatch, useSelector } from "react-redux";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const data = useSelector((state) => state.saves);
  const dispatch = useDispatch();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    dispatch({ type: "LOGOUT", payload: null });
    navigate("/");
  };
  return (
    <div className="navbar">
      <h1 className="logo">Recipe</h1>
      <div className="Navbar-left">
        <Link to="/">Home</Link>

        {!cookies.access_token ? (
          <Link to="/auth">Login/Register</Link>
        ) : (
          <>
            <Link to="/create-recipe">Create Recipe</Link>
            <Link to="/saved-recipes">Saved Recipes({data.length})</Link>
            <a onClick={logout}> Logout </a>
          </>
        )}
      </div>
    </div>
  );
};
