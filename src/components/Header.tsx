import '../styles/Header.css'
import Button from '@mui/material/Button'

function Header(){

    const logoFolder = process.env.PUBLIC_URL+"/logos/";
    return(
        <div className="Header">
            <img 
            src={logoFolder+'Musicbeat-logos_transparent.png'}
            style={{maxWidth:'100%', maxHeight:'100%', float:"left", marginLeft:'1vw'}}
            >
            </img>
            <div style={{display:'inline'}}>
                <Button>
                    Search
                </Button>
                <Button>
                    Top Rated
                </Button>
                <Button>
                    My Collections 
                </Button>
                <Button>
                    Jams
                </Button>
                <Button>
                    FAQ
                </Button>
            </div>
        </div>
    );
}
export default Header;