import {dispatch_to_props, FullProps, state_to_props} from "../../redux/redux";
import {connect} from "react-redux";
import Carousel from "react-material-ui-carousel";
import { Song } from "../../types/types"
import '../../styles/DiscoveryQueue.css'
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
                className="carousel"
                indicators={false}
                autoPlay={false}
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
    return (
        <div style={{marginTop:"1vh"}}>
            <img src={props.song.imageUrl} className="songImage">
            </img>
            <div className="text">
            <p>{props.song.name}</p>
            <p>{props.song.artist}</p>
            </div>
            
        </div>
    )
}
export default connect(state_to_props, dispatch_to_props)(DiscoveryQueue);