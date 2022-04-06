import React from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";
import { RegisterActions } from "../Redux/Actions/userActions";
const Register = ({ location, history }) => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
  })
  const { name, email, password } = state
  console.log(state)
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userRegister = useSelector(state => state.userRegister);
  const { error, loading, userInfo } = userRegister;
  useEffect(() => {
    window.scrollTo(0, 0);
    if (userInfo) {
      history.push("/")
      console.log("co chya vao ben trong")
    }
    console.log("co chya vao ben ngoai")
  }, [userInfo, redirect, history])
  const registerHandler = (e) => {
    e.preventDefault();
    dispatch(RegisterActions(name, email, password))
  }
  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant={"alert-danger"}>{error}</Message>}
        {loading && <Loading />}
        <form className="Login col-md-8 col-lg-4 col-11">
          <input type="text" placeholder="Username" name="name" onChange={(e) => { setState({ ...state, [e.target.name]: e.target.value }) }} />
          <input type="email" placeholder="Email" name="email" onChange={(e) => { setState({ ...state, [e.target.name]: e.target.value }) }} />
          <input type="password" placeholder="Password" name="password" onChange={(e) => { setState({ ...state, [e.target.name]: e.target.value }) }} />

          <button type="submit" onClick={registerHandler}>Register</button>
          <p>
            <Link to={redirect ? `login?redirect=${redirect} ` : " /login"}>
              I Have Account <strong>Login</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
