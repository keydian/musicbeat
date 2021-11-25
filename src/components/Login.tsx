import { useState, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom";
import { LoginCreds } from "../types/types";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";

function Login() {
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

    }

    return (
        <div>
            <p onClick={() => { navigate("/") }}>NAV HOME</p>
            <p onClick={() => { navigate("/register") }}>NAV REGISTER</p>

            <Box
                component="form"
                noValidate
                autoComplete="off"
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
                    onClick={() => { console.log(login) }}
                > Login
                </Button>
            </Box>
        </div>
    )
}

export default Login