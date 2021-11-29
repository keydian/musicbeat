import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getFullCollection } from "../../axios/axios";
import { dispatch_to_props, FullProps, state_to_props } from "../../redux/redux";
import { CollectionFull, SongList } from "../../types/types";
import '../../styles/collection/CollectionPage.css'
import { List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function CollectionPage(Props: FullProps) {
    let collectionid = useParams().collectionid;
    let navigate = useNavigate();
    const [collection, setCollection] = useState<CollectionFull>()

    const defaultImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
    const songs = [
        {
            id: "0",
            name: "Song 1",
            artist: "ArtistHere",
            album: "AlbumHere"
        },
        {
            id: "1",
            name: "Song 2",
            artist: "ArtistHere",
            album: "AlbumHere"
        },
        {
            id: "2",
            name: "Song 3",
            artist: "ArtistHere",
            album: "AlbumHere"
        },
        {
            id: "3",
            name: "Song 4",
            artist: "ArtistHere",
            album: "AlbumHere"
        },
        {
            id: "4",
            name: "Song 5",
            artist: "ArtistHere",
            album: "AlbumHere"
        },
        {
            id: "5",
            name: "Song 6",
            artist: "ArtistHere",
            album: "AlbumHere"
        },
        {
            id: "6",
            name: "Song 7",
            artist: "ArtistHere",
            album: "AlbumHere"
        },
        {
            id: "7",
            name: "Song 8",
            artist: "ArtistHere",
            album: "AlbumHere"
        },
        {
            id: "8",
            name: "Song 9",
            artist: "ArtistHere",
            album: "AlbumHere"
        },
        {
            id: "9",
            name: "Song 10",
            artist: "ArtistHere",
            album: "AlbumHere"
        }
    ]

    useEffect(() => {
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
    }, [Props.isLogged, collectionid])

    const descCheck = () => {
        if (collection) {
            if (collection.description === undefined || collection.description.trim() === '') {
                return false
            }
            return true
        }
        return false
    }
//rgb(149, 162, 241);
//rgba(221, 221, 221, 0.486)
    return (
        <div className="CollectionPageWrapper">
            {
                collection && (
                    <>
                        <div className="ColPageUpper">
                            <img
                                src={collection.imageUrl}
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
                                <TwitterIcon fontSize="large" style={{ color: "rgb(60, 140, 255)", paddingBottom:"3vh" }} />
                                <FacebookIcon fontSize="large" style={{ color: "rgb(34, 62, 248)", paddingBottom:"3vh"  }} />
                                <InstagramIcon fontSize="large" style={{ color: "rgb(255, 51, 0)" }} />
                            </div>
                        </div>
                        <div className="ColPageLower">
                            <Typography align="left" variant="h4">Your beats, right here</Typography>
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
                                {songs.map((s, i) => (
                                    <ListItem className="SongListItem" key={`item-${i}-${s.name}`}>
                                        <ListItemIcon>
                                            <img
                                                src={defaultImg}
                                                alt="songlistimage-logo"
                                                className="songlistimage"
                                            >
                                            </img>
                                        </ListItemIcon>
                                        <ListItemText sx={{fontSize:"20px"}}
                                        disableTypography={true}
                                        primary={<Typography variant="h6">{s.name}</Typography>} 
                                        secondary={<Typography 
                                        variant="subtitle1"
                                        >{s.artist}</Typography>}/>
                                        <Typography
                                        sx={{color:"slategray"}}
                                        >{s.album}
                                        </Typography>
                                        <MoreHorizIcon fontSize="large" style={{marginLeft:"60%"}}/>
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(CollectionPage)

