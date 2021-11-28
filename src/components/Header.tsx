import '../styles/Header.css'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from 'react';
import { dispatch_to_props, FullProps, state_to_props } from '../redux/redux';
import { connect } from 'react-redux';
import { Alert, Snackbar } from '@mui/material';

function Header(Props: FullProps) {
    let navigate = useNavigate();
    let loc = useLocation()
    const logoFolder = process.env.PUBLIC_URL + "/logos/";
    const [open, setOpen] = useState<boolean>(false)

    //To not allow the user to go mess around with urls
    useEffect(() => {
        if (!Props.isLogged) {
            if (loc.pathname !== "/register" && loc.pathname !== "/login") {
                if (!localStorage.getItem("token")) {
                    navigate("/")
                }
            }
        }
    }, [Props.isLogged])

    const handleCloseSnack = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div className="Header" style={{ display: 'inline' }}>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
                   Session Expired!
                </Alert>
            </Snackbar>
            <div style={{ justifyContent: "space-evenly", display: "flex" }}>
                <img
                    src={logoFolder + 'Musicbeat-logos_transparent.png'}
                    style={{ maxWidth: '5%', maxHeight: '5%', float: "left", marginTop: "0.5vw" }}
                    onClick={() => {
                        navigate('../')
                    }}
                    alt="musicbeat-logo"
                >
                </img>
                <Button size="large" variant="outlined" className="Button">
                    Search
                </Button>
                <Button variant="outlined" size="large" className="Button">
                    Top Rated
                </Button>
                <Button variant="outlined" size="large" className="Button">
                    My Collections
                </Button>
                <Button variant="outlined" size="large" className="Button">
                    Jams
                </Button>
                <Button variant="outlined" size="large" className="Button">
                    FAQ
                </Button>
                <Avatar className="Avatar" sx={{ marginTop: "1vw" }} />
            </div>

        </div>
    );
}
export default connect(state_to_props, dispatch_to_props)(Header);