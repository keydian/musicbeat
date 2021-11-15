import React from "react"
import { useNavigate } from "react-router";

function Register() {
    let navigate = useNavigate();
    
    return (
        <div>
            <p>Register</p>
            <p onClick={() => {navigate("/")}}>NAV HOME</p>
            <p onClick={() => {navigate("/login")}}>NAV LOGIN</p>
        </div>
    )
}

export default Register