import { useNavigate } from "react-router";
import "../styles/Homepage.css";

function Homepage() {
    let navigate = useNavigate();
    
    return (
        <div className="Homepage">
           <p>Welcome to MusicBeat!</p>
           <br/>
           <p>Click here to create an account!</p>
           <br/>
           <p>If you already have an account, click here to login!</p>
        </div>
    )
}

export default Homepage