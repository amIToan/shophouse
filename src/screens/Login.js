import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LoginActions } from "../Redux/Actions/userActions";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";
const Login = ({ history, location }) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userLogin = useSelector(state => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  useEffect(() => {
    window.scrollTo(0, 0);
    if (userInfo) {
      history.push("/")
    }
  }, [userInfo, redirect, history])
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(LoginActions(email, password))
  }
  return (
    <>
      <Header />

      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant={"alert-danger"}>{error}</Message>}
        {loading && <Loading />}
        <form className="Login col-md-8 col-lg-4 col-11">
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" onClick={submitHandler}>Login</button>
          <p>
            <Link to={redirect ? `register?redirect=${redirect} ` : " /register"}>Create Account</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
