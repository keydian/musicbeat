import React from "react"
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { dispatch_to_props, state_to_props } from "../redux/redux";
import '../styles/Register.css'
import { Button } from "@mui/material";

function Register() {
    let navigate = useNavigate();
    
    return (
        <div className="RegisterWrapper">
            <div className="RegisterForm">
            <Button
            variant="contained"
            className="RegisterButton"
            onClick={() => { console.log("register submit") }}
            >Register
            </Button>
            </div>
        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(Register)