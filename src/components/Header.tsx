import '../styles/Header.css'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation, useNavigate } from "react-router";
import { useEffect } from 'react';
import { logoutUser} from '../axios/axios';
import { dispatch_to_props, FullProps, state_to_props } from '../redux/redux';
import { connect } from 'react-redux';

function Header(Props: FullProps) {
    let navigate = useNavigate();
    let loc = useLocation()
    const logoFolder = process.env.PUBLIC_URL + "/logos/";
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        Props.logout();
        navigate('');
      };
    
      const logout = () => {
        console.log("BLABLA")
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

    return (
        <div className="Header" style={{ display: 'inline' }}>

            <div style={{ justifyContent: "space-evenly", display: "flex", borderBottom:"2px ridge black", marginRight:"1vw",marginLeft:"1vw", alignItems:"center" }}>
                <img
                    src={logoFolder + 'Musicbeat-logos_transparent.png'}
                    style={{ maxWidth: '5%', maxHeight: '5%', float: "left", marginTop: "0.5vw" }}
                    onClick={() => {
                        if (Props.isLogged){
                            navigate('../home')
                        }
                        else navigate('../')
                       
                    }}
                    alt="musicbeat-logo"
                    className="Clickable"
                >
                </img>
              
                <Button size="large" variant="outlined" className="Button">
                    Search
                </Button>
                <Button variant="outlined" size="large" className="Button">
                    Top Rated
                </Button>
                <Button variant="outlined" size="large" className="Button" onClick={() => {navigate("/collections/"+Props.username)}}>
                    My Collections
                </Button>
                <Button variant="outlined" size="large" className="Button" onClick={()=> navigate('/jams')}>
                    Jams
                </Button>
                <Button variant="outlined" size="large" className="Button">
                    FAQ
                </Button>
                <Avatar className={"Avatar Clickable"} sx={{ marginTop: "1vw" }} onClick={()=> navigate('/profile/'+Props.username)}/>
                <LogoutIcon className={"Logout Clickable"} sx={{ marginTop: "1vw" }} onClick={()=> logout}/>
            </div>

        </div>
    );
}
export default connect(state_to_props, dispatch_to_props)(Header);