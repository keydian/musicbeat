import { useState, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom";
import { LoginCreds, Token } from "../types/types";
import TextField from '@mui/material/TextField';
import '../styles/Login.css'
import { Button } from "@mui/material";
import { dispatch_to_props, FullProps, state_to_props } from "../redux/redux";
import { connect } from "react-redux";
import { loginUser } from "../axios/axios";
import jwtDecode from "jwt-decode";

function Login(Props: FullProps) {
    const logoFolder = process.env.PUBLIC_URL + "/logos/";
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
        if (login.username === null || login.username.trim() === '' ||
            login.pwd === null || login.pwd.trim() === '') {
            setError(true)
        } else {
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
                    navigate("/")
                }
            ).catch(
                (err) => {
                    if (err.response) {
                        console.log(err.response)
                        alert(err.response.data.message)
                    }
                }
            )
        }

    }

    return (
        <div className="LoginWrapper">
            <img
                src={logoFolder + 'Musicbeat-logos_transparent.png'}
                alt="musicbeat-logo"
                className="musicbeatLogoBig"
            >
            </img>
            <div className="LoginFormWrapper">
                <div className="LoginForm">
                    <TextField
                        required
                        error={error}
                        id="username"
                        className="LoginInput"
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
                        type="password"
                        className="LoginInput"
                        label="Password"
                        variant="filled"
                        onChange={(e) => {
                            changeLogin(e)
                        }} />
                </div>
                <div className="LoginFormHelper">
                    <Button
                        variant="contained"
                        className="LoginButton"
                        onClick={() => { submitLogin() }}
                    > Login
                    </Button>
                    <p>Don't have an account?</p>
                    <p 
                    style={{color:"blue", textDecoration:"underline", cursor:"pointer"}}
                    onClick={() => {navigate('/register')}}>
                        Register
                        </p>
                </div>
            </div>

        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(Login)