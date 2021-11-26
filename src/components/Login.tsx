import { useState, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom";
import { LoginCreds, Token } from "../types/types";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import '../styles/Login.css'
import { Button } from "@mui/material";
import { dispatch_to_props, FullProps, state_to_props } from "../redux/redux";
import { connect } from "react-redux";
import { loginUser } from "../axios/axios";
import jwtDecode from "jwt-decode";

function Login(Props : FullProps) {
    const [login, setLogin] = useState<LoginCreds>({ username: "", pwd: "" });
    const [error, setError] = useState<boolean>(false)

    let navigate = useNavigate();

    const validateInput = (val: String) => {
        if (val === null || val.trim() === '') {
            setError(true)
        } else {
            setError(false)
        }
    }

    const changeLogin = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        const id = event.currentTarget.id;
        validateInput(value)
        switch (id) {
            case "username":
                setLogin({ ...login, username: value });
                break;
            case "pwd":
                setLogin({ ...login, pwd: value });
                break;
        }
    };

    const submitLogin = () => {
        loginUser(login).then(
            (res) => {
                let decodedTkn = jwtDecode<Token>(res.headers.authorization);
                let tkn: string = res.headers.authorization;
                Props.login({
                    isLogged: true,
                    username: decodedTkn.username,
                    token: tkn
                })
                localStorage.setItem("token", tkn);
                console.log("Login succesfull")
            }
        ).catch(
            (err) => {
                alert(err)
            }
        )
    }

    return (
        <div className="LoginWrapper">
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    className="LoginForm"
                >
                    <TextField
                        required
                        error={error}
                        id="username"
                        label="Username"
                        variant="filled"
                        onChange={(e) => {
                            changeLogin(e)
                        }} />
                    <br />
                    <TextField
                        required
                        error={error}
                        id="pwd"
                        label="Password"
                        variant="filled"
                        onChange={(e) => {
                            changeLogin(e)
                        }} />
                    <br />
                    <Button
                        variant="contained"
                        className="LoginButton"
                        onClick={() => { submitLogin()}}
                    > Login
                    </Button>
                </Box>
            </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(Login)