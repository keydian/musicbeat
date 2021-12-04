import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { deleteSongFromCol, getFullCollection } from "../../axios/axios";
import { dispatch_to_props, FullProps, state_to_props } from "../../redux/redux";
import { CollectionFull } from "../../types/types";
import '../../styles/collection/CollectionPage.css'
import { Alert, Button, List, ListItem, ListItemIcon, ListItemText, Snackbar, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';


function CollectionPage(Props: FullProps) {
    let collectionid = useParams().collectionid;
    let navigate = useNavigate();
    const [collection, setCollection] = useState<CollectionFull>()
    const [sucSnack, setSucsnack] = useState<boolean>(false)
    const [errSnack, setErrsnack] = useState<boolean>(false)

    const defaultImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"

    useEffect(() => {
        getFullCollectionRequest()
    }, [Props.isLogged, collectionid])

    const getFullCollectionRequest = () => {
        if (collectionid && Props.isLogged) {
            getFullCollection(collectionid).then(
                res => {
                    console.log(res.data)
                    setCollection(res.data)
                }
            ).catch(
                err => {
                    if (err.response) {
                        console.log(err.response)
                    }
                }
            )
        }
    }

    const descCheck = () => {
        if (collection) {
            if (collection.description === undefined || collection.description.trim() === '') {
                return false
            }
            return true
        }
        return false
    }

    const delSong = (songid: string) => {
        if (collectionid) {
            deleteSongFromCol(collectionid, songid).then(
                res => {
                    setSucsnack(true)
                    getFullCollectionRequest()
                }
            ).catch(
                err => {
                    setErrsnack(true)
                    if (err.response) {
                        console.log(err.response)
                    }
                }
            )
        }
    }

    const colImg = (colimage: string) => {
        if (colimage !== undefined && colimage.trim() !== '') {
            return colimage
        }
        return defaultImg
    }

    const handleCloseSuc = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSucsnack(false);
    };

    const handleCloseErr = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrsnack(false);
    };


    return (
        <div className="CollectionPageWrapper">
            {
                collection && (
                    <>
                        <Snackbar open={sucSnack} autoHideDuration={2500} onClose={handleCloseSuc}>
                            <Alert variant="filled" onClose={handleCloseSuc} severity="success" sx={{ width: '100%' }}>
                                Song deleted!
                            </Alert>
                        </Snackbar>
                        <Snackbar open={errSnack} autoHideDuration={2500} onClose={handleCloseErr}>
                            <Alert variant="filled" onClose={handleCloseErr} severity="error" sx={{ width: '100%' }}>
                                Erro! Could not delete song!
                            </Alert>
                        </Snackbar>
                        <div className="ColPageUpper">
                            <img
                                src={colImg(collection.imageUrl)}
                                alt="collectionimage-logo"
                                className="collectionimage"
                            >
                            </img>
                            <div className="CollectionInfo">
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Typography style={{ paddingRight: "10px" }} variant="h3">{collection.name}</Typography>
                                    {
                                        collection.creator === Props.username && (
                                            <EditIcon color="action" />
                                        )
                                    }
                                </div>
                                <Typography onClick={() => navigate('/profile/' + collection.creator)} gutterBottom={true} variant="h5">by {collection.creator}</Typography>
                                <div className="coldescriptionwrapper">
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <Typography style={{ paddingRight: "10px" }} variant="h6">Description:</Typography>
                                        {
                                            collection.creator === Props.username && (
                                                <EditIcon color="action" />
                                            )
                                        }
                                    </div>
                                    {
                                        descCheck() ? (
                                            <Typography align="left" variant="body1">{collection.description}</Typography>
                                        ) : (
                                            <Typography variant="body1">Creator didn't provide a description.</Typography>
                                        )
                                    }
                                </div>
                                <Typography variant="h6">{collection.songs.length} songs</Typography>
                            </div>
                            <div className="CollectionShare">
                                <TwitterIcon fontSize="large" style={{ color: "rgb(60, 140, 255)", paddingBottom: "3vh" }} />
                                <FacebookIcon fontSize="large" style={{ color: "rgb(34, 62, 248)", paddingBottom: "3vh" }} />
                                <InstagramIcon fontSize="large" style={{ color: "rgb(255, 51, 0)" }} />
                            </div>
                        </div>
                        <div className="ColPageLower">
                            {collection.songs.length > 0 ? (
                                <>
                                    <div style={{ display: "flex", paddingBottom:"5px" }}>
                                        <Typography 
                                        style={{paddingRight:"1vw"}} 
                                        align="left" variant="h4">
                                            Your beats, right here
                                            </Typography>
                                        <Button 
                                        variant="outlined" 
                                        startIcon={<SearchIcon />}
                                        onClick={() => navigate("/search")}
                                        style={{marginLeft:"auto",backgroundColor:"transparent",color:"rgb(106, 90, 205)",border:"1px solid rgb(106, 90, 205)"}}>
                                            More songs!
                                        </Button>
                                    </div>
                                    <List
                                        sx={{
                                            width: '100%',
                                            bgcolor: 'rgba(255, 255, 255, 0.637)',
                                            position: 'relative',
                                            alignItems: 'center',
                                            maxHeight: 350,
                                            borderRadius: '25px 0px 0px 25px',
                                            overflow: 'auto',
                                            border: '1px solid black'
                                        }}
                                    >
                                        {collection.songs.map((s, i) => (
                                            <ListItem className="SongListItem" key={`item-${i}-${s.name}`}>
                                                <ListItemIcon>
                                                    <img
                                                        src={s.imageUrl}
                                                        alt="songlistimage-logo"
                                                        className="songlistimage Clickable"
                                                        onClick={() => navigate('/songs/' + s.id)}
                                                    >
                                                    </img>
                                                </ListItemIcon>
                                                <ListItemText sx={{ fontSize: "20px" }}
                                                    disableTypography={true}
                                                    primary={<Typography
                                                        className="Clickable"
                                                        variant="h6"
                                                        onClick={() => navigate('/songs/' + s.id)}>
                                                        {s.name}
                                                    </Typography>}
                                                    secondary={<Typography
                                                        variant="subtitle1"
                                                    >
                                                        {s.artist}
                                                    </Typography>}
                                                />
                                                <Typography
                                                    sx={{ color: "slategray" }}
                                                    className="Clickable"
                                                    onClick={() => navigate('/album/' + s.album)}
                                                >{s.album}
                                                </Typography>
                                                <DeleteIcon onClick={() => delSong(s.id)} className="Clickable" fontSize="large" style={{ marginLeft: "60%" }} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </>
                            ) : (
                                <>
                                    <Typography variant="h2">No songs yet :(</Typography>
                                </>
                            )}

                        </div>
                    </>
                )
            }
        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(CollectionPage)

