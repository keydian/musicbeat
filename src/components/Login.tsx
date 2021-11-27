import { useState, ChangeEvent, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { LoginCreds, Token } from "../types/types";
import TextField from '@mui/material/TextField';
import '../styles/Login.css'
import { Alert, Button, Snackbar } from "@mui/material";
import { dispatch_to_props, FullProps, state_to_props } from "../redux/redux";
import { connect } from "react-redux";
import { loginUser } from "../axios/axios";
import jwtDecode from "jwt-decode";

function Login(Props: FullProps) {
    const logoFolder = process.env.PUBLIC_URL + "/logos/";
    const [login, setLogin] = useState<LoginCreds>({ username: "", pwd: "" });
    //Input validation
    const [error, setError] = useState<boolean>(false)
    //Snackbars
    const [snackSuc, setSnacksuc] = useState<boolean>(false)
    const [snackErr, setSnackerr] = useState<boolean>(false)
    //Error handling
    const [errMsg, setErrMsg] = useState<string>()

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
                    setSnacksuc(true)
                    navigate("/")
                }
            ).catch(
                (err) => {
                    if (err.response) {
                        console.log(err.response)
                        setErrMsg(err.response.data.message)
                    }
                }
            )
        }

    }

    const handleCloseSuc = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnacksuc(false);
    };

    const handleCloseErr = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackerr(false);
    };

    useEffect(() => {
        if (errMsg) {
            setSnackerr(true)
        }
    }, [errMsg])

    return (
        <div className="LoginWrapper">
            <Snackbar open={snackSuc} autoHideDuration={3000} onClose={handleCloseSuc}>
                <Alert onClose={handleCloseSuc} severity="success" sx={{ width: '100%' }}>
                    Login succesfull!
                </Alert>
            </Snackbar>
            <Snackbar open={snackErr} autoHideDuration={3000} onClose={handleCloseErr}>
                <Alert onClose={handleCloseErr} severity="error" sx={{ width: '100%' }}>
                    {errMsg}
                </Alert>
            </Snackbar>
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
                        style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                        onClick={() => { navigate('/register') }}>
                        Register
                    </p>
                </div>
            </div>

        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(Login)