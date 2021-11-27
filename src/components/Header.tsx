import '../styles/Header.css'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import { useLocation, useNavigate } from "react-router";
import { useEffect } from 'react';
import { dispatch_to_props, FullProps, state_to_props } from '../redux/redux';
import { connect } from 'react-redux';

function Header(Props : FullProps){

    let navigate = useNavigate();
    let loc = useLocation()
    const logoFolder = process.env.PUBLIC_URL+"/logos/";

    //To not allow the user to go mess around with urls
    useEffect(() => {
        if(!Props.isLogged) {
            if(loc.pathname !== "/register" && loc.pathname !== "/login") {
                if(!localStorage.getItem("token")) {
                    navigate("/login")
                }
            }
        }
    }, [Props.isLogged])

    return(
        <div className="Header" style={{display:'inline'}}>
            <div style={{justifyContent:"space-evenly", display:"flex"}}>
            <img 
            src={logoFolder+'Musicbeat-logos_transparent.png'}
            style={{maxWidth:'5%', maxHeight:'5%', float:"left", marginTop:"0.5vw"}}
            onClick={() =>{
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
                <Avatar className="Avatar" sx={{marginTop:"1vw"}}/>
            </div>
            
        </div>
    );
}
export default connect(state_to_props, dispatch_to_props)(Header);