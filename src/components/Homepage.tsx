import { useNavigate } from "react-router";
import { Typography, Button } from "@mui/material";
import "../styles/Homepage.css";
import { dispatch_to_props, FullProps, state_to_props } from "../redux/redux";
import { connect } from "react-redux";

function Homepage(Props : FullProps) {
    let navigate = useNavigate();

    return (
        <div className="Homepage">
           <Typography variant="h2" className="HeaderText1">
                Welcome to MusicBeat!
           </Typography>
           <div style={{display:"flex", justifyContent:"space-evenly", alignItems:"center"}}>
               <Button variant="contained" className="HomepageButton" onClick={() => navigate('/login')}>
                    Login
               </Button>
               <Button variant="contained" className="HomepageButton" onClick={()=>navigate('/register')}>
                    Register    
               </Button>
           </div>
        </div>
    )
}

export default  connect(state_to_props, dispatch_to_props)(Homepage)