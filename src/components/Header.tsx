import '../styles/Header.css'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'

function Header(){

    const logoFolder = process.env.PUBLIC_URL+"/logos/";
    return(
        <div style={{justifyContent:"space-between"}} className="Header">
            <img 
            src={logoFolder+'Musicbeat-logos_transparent.png'}
            style={{maxWidth:'100%', maxHeight:'100%', float:"left", marginLeft:'1vw'}}
            >
            </img>
            <div style={{display:'inline'}}>
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
                
            </div>
            <Avatar className="Avatar">

            </Avatar>
        </div>
    );
}
export default Header;