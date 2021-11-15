import React from "react"
import { useNavigate } from "react-router-dom";

function Login() {
    let navigate = useNavigate();
    
    return (
        <div>
            <p>Login</p>
            <p onClick={() => {navigate("/")}}>NAV HOME</p>
            <p onClick={() => {navigate("/register")}}>NAV REGISTER</p>
        </div>
    )
}

export default Login