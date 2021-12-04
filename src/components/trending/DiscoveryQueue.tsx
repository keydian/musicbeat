import {dispatch_to_props, state_to_props} from "../../redux/redux";
import {connect} from "react-redux";
import Carousel from "react-material-ui-carousel";
import { Song } from "../../types/types"
import '../../styles/DiscoveryQueue.css'
import { useNavigate } from "react-router";
interface DiscoveryProps{
    songs: Song[]
}

interface ItemProps{
    key: string,
    song: Song
}

function DiscoveryQueue(Props: DiscoveryProps){

    return(
        <div>
            <Carousel
                indicators={false}
                className="carousel"
                autoPlay={false}
                navButtonsAlwaysVisible={true}
                animation={"slide"}
                duration={900}
            >{
                Props.songs.map( (item, i) => <Item key={i+"-"+item.name} song={item}/> )
            }
            </Carousel>
        </div>
    )
}
function Item(props: ItemProps)
{
    let navigate = useNavigate();
    return (
        <div style={{marginTop:"2.5vh"}}>
            <img src={props.song.imageUrl} className="songImage"
            onClick={()=>navigate("/songs/"+props.song.id)} style={{cursor:"pointer"}}
            alt={"songimg"}>
            </img>
            <div>
            <h2 className="songTitle">{props.song.name}</h2>
            <h4 className="songArtist">{props.song.artist}</h4>
            </div>
            
        </div>
    )
}
export default connect(state_to_props, dispatch_to_props)(DiscoveryQueue);