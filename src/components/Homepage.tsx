import { useNavigate } from "react-router";

function Homepage() {
    let navigate = useNavigate();
    
    return (
        <div>
            <p>Homepage</p>
            <p onClick={() => {navigate("/login")}}>NAV LOGIN</p>
            <p onClick={() => {navigate("/register")}}>NAV REGISTER</p>
        </div>
    )
}

export default Homepage