import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getAlbumByName, getAlbumSongs } from "../../axios/axios";
import { dispatch_to_props, FullProps, state_to_props } from "../../redux/redux";
import { Album, Song} from "../../types/types";
import '../../styles/albums/AlbumPage.css'
import { Button, styled, Tab, Tabs, Typography } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AlbumTabDisplay from "./AlbumTabDisplay";
import AlbumSongsDisplay from "./AlbumSongsDisplay";
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import { elementTypeAcceptingRef } from "@mui/utils";


function AlbumPage(Props: FullProps) {
    const [album, setAlbum] = useState<Album>()
    const [imageUrl, setImageurl] = useState<string>()
    const [tabval, setTabval] = useState<number>(0)
    const [songs, setSongs] = useState<Song[]>()
    let albumName = useParams().albumname;
    let navigate = useNavigate();

    useEffect(() => {
        getAlbumRequest()
    }, [Props.isLogged, albumName])

    const getAlbumRequest = () => {
        if (albumName && Props.isLogged) {
            getAlbumByName(albumName).then(
                res => {
                    setAlbum(res.data)
                    console.log(res.data)
                    setImageurl(res.data.imageUrl)
                    getAlbumSongs(res.data.name).then(
                        res => {
                            setSongs(res.data)
                        }
                    ).catch(
                        err => {
                            if (err.response) {
                                console.log(err.response)
                                alert(err.response.message)
                            }
                        }
                    )
                }
            ).catch(
                err => {
                    if (err.response) {
                        console.log(err.response)
                        alert(err.response.message)
                    }
                }
            )
            
        }
    }
    //FOR TABS
    interface StyledTabsProps {
        children?: React.ReactNode;
        value: number;
        onChange: (event: React.SyntheticEvent, newValue: number) => void;
    }

    const StyledTabs = styled((props: StyledTabsProps) => (
        <Tabs
            {...props}
            TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
        />
    ))({
        borderLeft: "1px solid black",
        '& .MuiTabs-indicator': {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'transparent',
        },
        '& .MuiTabs-indicatorSpan': {
            maxWidth: "100%",
            width: '100%',
            backgroundColor: 'black',
        },
    });

    interface StyledTabProps {
        label: string;
    }

    const StyledTab = styled((props: StyledTabProps) => (
        <Tab disableRipple {...props} />
    ))(({ theme }) => ({
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(20),
        borderRight: '1px solid black',
        width: '100%',
        color: 'rgba(0, 0, 0, 1)',
        '&.Mui-selected': {
            color: '#683f68',
            backgroundColor: "rgba(255, 255, 255, 0.3)"
        },
        '&.Mui-focusVisible': {
            backgroundColor: 'rgba(100, 95, 228, 0.32)',
        },
    }));

    const calcRating = (songs :Song[]) => {
        var  totalRating = 0;
        songs.forEach(element =>{
            totalRating += element.rating;
        })
        return totalRating / songs.length
    }
    
    const calcTotalRatings = (songs :Song[]) => {
        var  totalRates = 0;
        songs.forEach(element =>{
            totalRates += element.numRates;
        })
        return totalRates / songs.length
    }

    const calcTime = (songs :Song[]) => {
        var  totalTime = 0;
        songs.forEach(element =>{
            totalTime += element.length;
        })
        return (Math.floor(totalTime/60) + ":" + totalTime % 60)
    }

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabval(newValue);
    };


    return (
        <div className="AlbumPageWrapper">
            {
                album && songs && (
                    <>
                        <div className="AlbumPageUpper">
                            <div className="AlbumPageUpperMain">
                                <img
                                    src={imageUrl}
                                    alt="albumimage-logo"
                                    className="albumimage"
                                >
                                </img>
                                <div className="AlbumInfo">
                                    <Typography variant="h4">{album.name}</Typography>
                                    <Typography
                                        variant="subtitle1"
                                        style={{ color: "rgb(52, 52, 52)" }}
                                    >by {album.artist}</Typography>
                                    <Typography
                                        variant="h6"
                                        style={{ color: "rgb(52, 52, 52)" }}
                                    >{songs?.length} Songs</Typography>

                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <PlayArrowIcon fontSize="large" style={{ border: "1px solid black", borderRadius: "50%", marginRight: "10px" }} />
                                        <Typography variant="h6">
                                            {calcTime(songs)} Min
                                        </Typography>
                                    </div>
                                    <div style={{ paddingTop: "3%" }}>
                                        <Typography variant="h6">Genres</Typography>
                                        <Typography variant="overline">{songs[0].genres.join(', ')}</Typography>
                                    </div>
                                </div>
                                <div className="AlbumRatesWrapper">
                                    <Typography variant="h6">{calcRating(songs)}/10<MusicNoteIcon/>Beats</Typography>
                                    <Typography variant="subtitle1">{calcTotalRatings(songs)} Ratings</Typography>
                                    <Button style={{color:"rgb(106, 90, 205)", border:"1px solid rgb(106, 90, 205)"}} size="small" variant="outlined" startIcon={<AudiotrackIcon />}>
                                        Rate
                                    </Button>
                                </div>
                            </div>
                            <div className="AlbumPageUpperTabs">
                                <StyledTabs
                                    value={tabval}
                                    onChange={handleTabChange}
                                    aria-label="styled tabs example">
                                    <StyledTab label="Critics" />
                                    <StyledTab label="Info" />
                                </StyledTabs>
                            </div>
                        </div>
                        <div className="AlbumPageLower">
                            <div className="AlbumPageLowerLeft">
                                <AlbumTabDisplay album={album} tabval={tabval} />
                            </div>
                            <div className="AlbumPageLowerRight">
                                <Typography variant="h6">Songs:</Typography>
                                <AlbumSongsDisplay songs={songs} />
                            </div>
                        </div>
                    </>
                )
            }

        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(AlbumPage)