import { ChangeEvent, useState } from "react"
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { dispatch_to_props, state_to_props } from "../redux/redux";
import '../styles/Register.css'
import { Button, TextField } from "@mui/material";
import { RegisterCreds } from "../types/types";
import { registerUser } from "../axios/axios";

function Register() {
    const logoFolder = process.env.PUBLIC_URL + "/logos/";
    const [register, setRegister] = useState<RegisterCreds>({ username: "", email: "", pwd: "", confirmPwd: "" });
    const [error, setError] = useState<boolean>(false)
    let navigate = useNavigate();


    const validateInput = (val: String) => {
        if (val === null || val.trim() === '') {
            setError(true)
        } else {
            setError(false)
        }
    }

    const validateCreds = () => {
        if (register.username === null || register.username.trim() === '' ||
            register.email === null || register.email.trim() === '' ||
            register.pwd === null || register.pwd.trim() === '' ||
            register.confirmPwd === null || register.confirmPwd.trim() === '') {
            return false
        }
        return true
    }

    const changeRegister = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        const id = event.currentTarget.id;
        validateInput(value)
        switch (id) {
            case "username":
                setRegister({ ...register, username: value });
                break;
            case "email":
                setRegister({ ...register, email: value });
                break;
            case "pwd":
                setRegister({ ...register, pwd: value });
                break;
            case "confirmPwd":
                setRegister({ ...register, confirmPwd: value });
                break;
        }
    };

    const submitRegister = () => {
        if (validateCreds()) {
            registerUser(register).then(
                (res) => {
                    alert("User registered successfully!")
                    navigate('/login')
                }
            ).catch(
                (err) => {
                    if (err.response) {
                        console.log(err.response)
                        alert(err.response.data.message)
                    }
                }
            )
        } else {
            setError(true)
        }
    }

    return (
        <div className="RegisterWrapper">
        
            <img
                src={logoFolder + 'Musicbeat-logos_transparent.png'}
                alt="musicbeat-logo"
                className="musicbeatLogoBig"
            >
            </img>
            <div className="RegisterFormWrapper">
                <div className="RegisterForm">
                    <TextField
                        className="RegisterInput"
                        required
                        error={error}
                        id="username"
                        label="Username"
                        variant="filled"
                        onChange={(e) => {
                            changeRegister(e)
                        }} />
                    <br />
                    <TextField
                        className="RegisterInput"
                        required
                        error={error}
                        id="email"
                        label="Email"
                        variant="filled"
                        onChange={(e) => {
                            changeRegister(e)
                        }} />
                    <br />
                    <TextField
                        className="RegisterInput"
                        required
                        error={error}
                        id="pwd"
                        type="password"
                        label="Password"
                        variant="filled"
                        onChange={(e) => {
                            changeRegister(e)
                        }} />
                    <br />
                    <TextField
                        className="RegisterInput"
                        required
                        error={error}
                        id="confirmPwd"
                        type="password"
                        label="Confirm Password"
                        variant="filled"
                        onChange={(e) => {
                            changeRegister(e)
                        }} />
                </div>
                <div className="RegisterFormHelper">
                    <Button
                        variant="contained"
                        className="RegisterButton"
                        onClick={() => { submitRegister() }}
                    >Register
                    </Button>
                    <p>Already have an account?</p>
                    <p 
                    style={{color:"blue", textDecoration:"underline", cursor:"pointer"}}
                    onClick={() => {navigate('/login')}}>
                        Login
                        </p>
                </div>
            </div>
        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(Register)