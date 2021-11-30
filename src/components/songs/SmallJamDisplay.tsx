import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { connect } from "react-redux"
import { dispatch_to_props, state_to_props } from "../../redux/redux"
import '../../styles/songs/SmallJamDisplay.css'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

interface SmallJamDisplayInterface {
    songId: string
}

const testJams = [
    {
        id: "0",
        name: "Indie Chill",
        host: "Valgreen",
        participants: ["1", "2", "3", "4"],
        playlist: [],
        imageUrl: ""
    },
    {
        id: "1",
        name: "Indie Chill 2",
        host: "Valgreen2",
        participants: ["1", "2", "3", "4"],
        playlist: [],
        imageUrl: ""
    }
]




function SmallJamDisplay(props: SmallJamDisplayInterface) {
    const defaultImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"

    const jamImg = (jamImage: string) => {
        if (jamImage !== undefined && jamImage.trim() !== '') {
            return jamImage
        }
        return defaultImg
    }

    return (
        <div className="SmallJamDisplayWrapper">
            {
                testJams.length > 0 ? (
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
                                testJams.map((j, i) => (
                                    <>
                                        <ListItem key={j.id + i}>
                                            <ListItemAvatar>
                                                <Avatar 
                                                sx={{ width: 70, height: 70 }} 
                                                src={jamImg(j.imageUrl)}
                                                style={{paddingRight:"1vw"}}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText primary={j.name} secondary={j.host} />
                                            <div style={{ marginRight: "auto", display: "flex" }}>
                                                <Typography variant="subtitle1">{j.participants.length}</Typography>
                                                <PeopleAltIcon />
                                            </div>

                                        </ListItem>
                                    </>
                                ))
                            }
                        </List>


                    </>
                ) : (
                    <Typography variant="h6">No one jamming to this beat...</Typography>
                )
            }
        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(SmallJamDisplay)