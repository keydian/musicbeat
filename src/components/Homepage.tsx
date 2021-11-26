import { useNavigate } from "react-router";
import { Typography, Button } from "@mui/material";
import "../styles/Homepage.css";

function Homepage() {
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

export default Homepage