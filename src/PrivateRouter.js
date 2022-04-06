import { Redirect, Route } from "react-router-dom";
function PrivateRouter({ component: Component, ...rest }) {
    console.log(Component)
    console.log({ ...rest })
    return (
        <Route {...rest} component={(props) => {
            const Token = window.localStorage.getItem("userInfo") && window.localStorage.getItem("userInfo").token
            if (Token) {
                return <Component {...props} />;
            } else {
                return <Redirect to={"/login"} />
            }
        }}
        />
    )
}
export default PrivateRouter