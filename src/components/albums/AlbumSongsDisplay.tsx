import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { connect } from "react-redux"
import { useNavigate} from "react-router";
import { dispatch_to_props, state_to_props } from "../../redux/redux"
import '../../styles/albums/AlbumSongsDisplay.css'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import {Song} from "../../types/types";
import MusicNoteIcon from '@mui/icons-material/MusicNote';

interface AlbumSongsDisplayInterface {
    songs: Song[]
}

function  AlbumSongsDisplay(props:  AlbumSongsDisplayInterface) {
    const defaultImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"

    const songImg = (songImage: string) => {
        if (songImage !== undefined && songImage.trim() !== '') {
            return songImage
        }
        return defaultImg
    }

    let navigate = useNavigate();
    return (
        <div className="AlbumSongsDisplayWrapper">
            {
                props.songs.length > 0 ? (
                    <>
                        <List
                            sx={{
                                width: '100%',
                                bgcolor: 'rgba(255, 255, 255, 0.637)',
                                maxHeight: "30vh",
                                borderRadius: '25px',
                                border: '1px solid black'
                            }}
                        >
                            {
                                props.songs.map((s, i) => (
                                    <>
                                        <ListItem key={s.id + i} 
                                        className="Clickable"
                                        style={{margin: "0 0 15px 0" }}
                                        onClick={() => navigate('/songs/' + s.id)}>
                                            <ListItemAvatar>
                                                <Avatar 
                                                sx={{ width: 70, height: 70 }} 
                                                src={songImg(s.imageUrl)}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText primary={s.name} secondary={s.artist} style={{paddingLeft:"1vw"}}/>
                                            <div style={{ marginRight: "auto", display: "flex" }}>
                                                <Typography variant="subtitle1">{s.rating}/10</Typography>
                                                <MusicNoteIcon />
                                            </div>

                                        </ListItem>
                                    </>
                                ))
                            }
                        </List>


                    </>
                ) : (
                    <Typography variant="h6">This album has no songs!?</Typography>
                )
            }
        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(AlbumSongsDisplay)