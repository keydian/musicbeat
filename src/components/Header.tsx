import '../styles/Header.css'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import { useNavigate } from "react-router";

function Header(){

    let navigate = useNavigate();
    const logoFolder = process.env.PUBLIC_URL+"/logos/";
    return(
        <div className="Header" style={{display:'inline'}}>
            <div style={{justifyContent:"space-evenly", display:"flex"}}>
            <img 
            src={logoFolder+'Musicbeat-logos_transparent.png'}
            style={{maxWidth:'5%', maxHeight:'5%', float:"left", marginTop:"0.5vw"}}
            onClick={() =>{
                navigate('../')
            }}
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
export default Header;