import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SignIn } from "../actions/auth";
import { useGetUserID } from "../hooks/useGetUserID";

export const Auth = () => {
  const [show, setShow] = useState(true);
  const [error, setError] = useState("");

  return (
    <div className="auth">
      {show ? (
        <Login setShow={setShow} error={error} setError={setError} />
      ) : (
        <Register setShow={setShow} error={error} setError={setError} />
      )}
    </div>
  );
};

const Login = ({ setShow, error, setError }) => {
  const [cookie, setCookies] = useCookies(["access_token"]);
  const userID = useGetUserID();

  const [toLogin, settoLogin] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await dispatch(SignIn({ toLogin }));
      if (data) {
        setCookies("access_token", data.token);
        window.localStorage.setItem("userID", data.UserId);

        navigate("/");
      } else if (data === undefined) {
        setError("username or password not matched");

        setTimeout(() => {
          setError("");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="username">Username:</label> */}
        <input
          required
          type="text"
          id="username"
          value={toLogin.username}
          placeholder="username"
          onChange={(event) =>
            settoLogin({
              ...toLogin,
              username: event.target.value,
            })
          }
        />
        {/* <label htmlFor="password">Password:</label> */}
        <input
          required
          type="password"
          id="password"
          placeholder="password"
          value={toLogin.password}
          onChange={(event) =>
            settoLogin({
              ...toLogin,
              password: event.target.value,
            })
          }
        />
        <p
          style={{
            color: "red",
            fontSize: "12px",
            height: "1px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {error}
        </p>
        <button type="submit">Login</button>
        <Link
          style={{
            cursor: "pointer",
            color: "blue",
            textDecoration: "underline",
          }}
          onClick={() => setShow(false)}
          type="submit"
        >
          Create an account
        </Link>
      </form>
    </div>
  );
};

const Register = ({ setShow, error, setError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/register", {
        username,
        password,
      });
      alert("Registration Completed! Now login.");
      setShow(true);
    } catch (error) {
      setError(error.response.data.message);
      setTimeout(() => {
        setError("");
      }, 1000);
      console.log(error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="username>">Username:</label> */}
        <input
          required
          type="text"
          id="username"
          value={username}
          placeholder="username"
          onChange={(event) => setUsername(event.target.value)}
        />
        {/* <label htmlFor="password">Password:</label> */}
        <input
          required
          type="password"
          id="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <p
          style={{
            color: "red",
            fontSize: "12px",
            height: "1px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {error}
        </p>
        <button type="submit">Register</button>
        <Link
          style={{
            cursor: "pointer",
            color: "blue",
            textDecoration: "underline",
          }}
          onClick={() => setShow(true)}
          type="submit"
        >
          Already have an account
        </Link>
      </form>
    </div>
  );
};
