import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../LoadingError/Toast";
import { toast } from "react-toastify";
import Loading from "../LoadingError/Loading"
import Message from "../LoadingError/Error"
import { updatedProfile } from "../../Redux/Actions/userActions";
const ProfileTabs = () => {
  const [state, setState] = useState({});
  const dispatch = useDispatch()
  const User = useSelector(state => state.userProfile)
  const updatedUser = useSelector(state => state.updatedProfile)
  const { loading, error, userProfile } = User
  useEffect(() => {
    if (userProfile) {
      setState({ ...state, name: userProfile.name, email: userProfile.email })
    }
  }, [dispatch, userProfile, updatedUser])
  const setupToast = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000
  }
  const toastId = React.useRef(null)
  const submitHandler = (e) => {
    e.preventDefault();
    if (state.password !== state.confirmedpassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Password doesn't match", setupToast)
      }
    } else {
      dispatch(updatedProfile({ id: User._id, ...state }))
      if (updatedUser.success && !toast.isActive(toastId.current)) {
        toastId.current = toast.success("Your profile has updated", setupToast)
      }
    }
  }
  return (
    <>
      <Toast />
      {(loading || updatedUser.loading) && <Loading />}
      {(error || !updatedUser.success) && <Message variant={"alert-danger"}></Message>}
      <form className="row  form-container">
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="name">UserName</label>
            <input className="form-control" type="text" name="name" value={state.name} required onChange={(e) => setState({ ...state, [e.target.name]: e.target.value })} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label htmlFor="email">E-mail Address</label>
            <input className="form-control" type="email" value={state.email} name="email" onChange={(e) => setState({ ...state, [e.target.name]: e.target.value })} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="password">New Password</label>
            <input className="form-control" type="password" name="password" onChange={(e) => setState({ ...state, [e.target.name]: e.target.value })} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="confirmedpassword">Confirm Password</label>
            <input className="form-control" type="password" name="confirmedpassword" onChange={(e) => setState({ ...state, [e.target.name]: e.target.value })} />
          </div>
        </div>
        <button type="submit" onClick={submitHandler}>Update Profile</button>
      </form>
    </>
  );
};

export default ProfileTabs;
