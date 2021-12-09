import { useState } from "react";
import '../styles/Header.css'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation, useNavigate } from "react-router";
import { useEffect } from 'react';
import { logoutUser } from '../axios/axios';
import { dispatch_to_props, FullProps, state_to_props } from '../redux/redux';
import { connect } from 'react-redux';

function Header(Props: FullProps) {
    let navigate = useNavigate();
    let loc = useLocation()
    const [open, setOpen] = useState<boolean>(false)
    const logoFolder = process.env.PUBLIC_URL + "/logos/";
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        Props.logout();
        navigate('');
    };

    const logout = () => {
        logoutUser().then(
            (response) => {
                handleLogout();
            },
            (error) => {
                handleLogout();
                console.log(error);
            }
        );
    };

    const snackError = () => {
        setOpen(true);
    };

    const closeSnack = () => {
        setOpen(false);
    };
    //To not allow the user to go mess around with urls
    useEffect(() => {
        if (!Props.isLogged) {
            if (loc.pathname !== "/register" && loc.pathname !== "/login") {
                if (!localStorage.getItem("token")) {
                    navigate("/")
                }
            }
        } else {
            if (loc.pathname === '/') {
                navigate("/home")
            }
        }
    }, [Props.isLogged])

    return (
        <div className="Header" style={{ display: 'inline' }}>

            <div style={{ justifyContent: "space-evenly", display: "flex", borderBottom: "2px ridge black", marginRight: "1vw", marginLeft: "1vw", alignItems: "center" }}>
                <img
                    src={logoFolder + 'Musicbeat-logos_transparent.png'}
                    style={{ maxWidth: '5%', maxHeight: '5%', float: "left", marginTop: "0.5vw" }}
                    onClick={() => {
                        if (Props.isLogged) {
                            navigate('../home')
                        }
                        else navigate('../')

                    }}
                    alt="musicbeat-logo"
                    className="Clickable"
                >
                </img>
                <Snackbar
                    anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
                    open={open}
                    autoHideDuration={2000}
                    onClose={closeSnack}
                    message="This feature is not yet implemented. Sorry!"
                >
                    <MuiAlert onClose={closeSnack} severity="error" sx={{ width: '100%' }}>
                        This feature is not yet implemented. Sorry!
                    </MuiAlert>
                </Snackbar>

                <Button size="large" variant="outlined" className="Button" onClick={() => { navigate("/search") }}>
                    Search
                </Button>
                <Button variant="outlined" size="large" className="Button" onClick={snackError}>
                    Top Rated
                </Button>
                <Button variant="outlined" size="large" className="Button" onClick={() => { navigate("/collections/" + Props.username) }}>
                    My Collections
                </Button>
                <Button variant="outlined" size="large" className="Button" onClick={() => navigate('/jams')}>
                    Jams
                </Button>
                <Button variant="outlined" size="large" className="Button" onClick={() => navigate('/faq')}>
                    FAQ
                </Button>
                <Avatar className={"Avatar Clickable"} sx={{ marginTop: "1vw" }} onClick={() => navigate('/profile/' + Props.username)} />
                <LogoutIcon className={"Logout Clickable"} sx={{ marginTop: "1vw" }} onClick={() => logout()} />
            </div>

        </div>
    );
}
export default connect(state_to_props, dispatch_to_props)(Header);