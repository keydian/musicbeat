import { Typography } from "@mui/material";
import { useNavigate } from "react-router";
import '../styles/StartPage.css';

function StartPage() {
    let navigate = useNavigate();
    
    return (
        <div className = "StartPage">
           <div className="TitleText">
            <Typography variant="h5">
                Discovery Queue
            </Typography>
           </div>
           <div className = "DiscoveryQueue">
                
           </div>
           <div className="TitleText">
           <Typography variant="h5">
                Trending
            </Typography>
           </div>
           <div className = "Trending">

           </div>
        </div>
    )
}

export default StartPage;