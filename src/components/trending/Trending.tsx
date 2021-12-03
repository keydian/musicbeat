import {dispatch_to_props, state_to_props} from "../../redux/redux";
import {connect} from "react-redux";
import { Song } from "../../types/types"
import '../../styles/Trending.css'
import { useNavigate } from "react-router";
import {Grid, Typography} from '@mui/material'
interface TrendingProps{
    songs: Song[]
}

interface ItemProps{
    key: string,
    song: Song
}

function Trending(Props: TrendingProps){
    return(
        <Grid container spacing={2} columns={4} className="TrendingGrid">
            {
            Props.songs.map( (item, i) => (
                <Grid item xs={1}>
                    <Item key={i+"-"+item.name} song={item}/>
                </Grid>
            ))
            } 
        </Grid>
        
    )
}

function Item(props: ItemProps){
    let navigate = useNavigate();
    return(
        <div className="gridItem" style={{marginTop:'2.25vh', marginLeft:'1.1vw'}}>
            
            <img src={props.song.imageUrl} className="gridSongImage"
            onClick={()=>navigate("/songs/"+props.song.id)} style={{cursor:"pointer"}}>
            </img>
            <Typography className="SongGridName" style={{marginTop:"0.8vh", marginLeft:"0.4vw"}}>
            {props.song.name}
            <Typography className="SongGridArtist">
            {props.song.artist}
            </Typography>
            </Typography>
            
            
            
            
            

            
        </div>
    )
}
export default connect(state_to_props, dispatch_to_props)(Trending);