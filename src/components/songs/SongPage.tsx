import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getSong } from "../../axios/axios";
import { dispatch_to_props, FullProps, state_to_props } from "../../redux/redux";
import { Song, Collection, CreateJam  } from "../../types/types";
import '../../styles/songs/SongPage.css'
import { Button, styled, Tab, Tabs, Typography } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SongTabDisplay from "./SongTabDisplay";
import SmallJamDisplay from "./SmallJamDisplay";
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import AddIcon from '@mui/icons-material/Add';
import SelectCollectionDisplay from "../collection/SelectCollectionDisplay";

function SongPage(Props: FullProps) {
    const [song, setSong] = useState<Song>()
    const [imageUrl, setImageurl] = useState<string>()
    const [tabval, setTabval] = useState<number>(0)
    let songId = useParams().songid;
    let navigate = useNavigate();

    useEffect(() => {
        getSongRequest()
    }, [Props.isLogged, songId])

    const getSongRequest = () => {
        if (songId && Props.isLogged) {
            getSong(songId).then(
                res => {
                    setSong(res.data)
                    console.log(res.data)
                    setImageurl(res.data.imageUrl)
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

    const handleOpen = () => {
        setOpen(true);
    }

    //CallBack for SelectCol Logic
    const [create, setCreate] = useState<CreateJam>({ name: "", collectionId: "", imageUrl: "" })
    const [selCol, setSelCol] = useState<Collection>()
    const [open, setOpen] = useState<boolean>(false)
    const [snack, setSnack] = useState<boolean>(false)
    const [opensnack, setOpensnack] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    
    const handleClose = () => {
        setOpen(false);
        setCreate({ name: "", collectionId: "", imageUrl: "" })
        setSelCol(undefined)
        setError(false)
        setOpensnack(false)
    }
    const setPlaylist = useCallback((c: Collection) => {
        setCreate({ ...create, collectionId: c.id })
        setSelCol(c)
    }, [create])

    const handleCloseCallback = () => setOpen(false);
    const handleOpenSnack =() => setSnack(true)

    const closeCallback = useCallback(() => {
        handleCloseCallback()
        handleOpenSnack()
    }, [open])
    //Song Time display calcs
    const calcTimeMin = (time: number) => {
        return Math.floor(time / 60)
    }
    const calcTimeSec = (time: number) => {
        return time % 60
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

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabval(newValue);
    };


    return (
        <div className="SongPageWrapper">
            {
                song && (
                    <>
                        <div className="SongPageUpper">
                            <div className="SongPageUpperMain">
                                <img
                                    src={imageUrl}
                                    alt="songimage-logo"
                                    className="songimage"
                                >
                                </img>
                                <div className="SongInfo">
                                    <Typography variant="h4">{song.name}</Typography>
                                    <Typography
                                        variant="subtitle1"
                                        style={{ color: "rgb(52, 52, 52)" }}
                                    >by {song.artist}</Typography>
                                    <Typography
                                        variant="subtitle1"
                                        style={{ color: "rgb(52, 52, 52)" }}
                                        className="Clickable"
                                        onClick={() => navigate('/albums/' + song.album)}
                                    >from {song.album}</Typography>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <PlayArrowIcon fontSize="large" style={{ border: "1px solid black", borderRadius: "50%", marginRight: "10px" }} />
                                        <Typography variant="h6">
                                            {calcTimeMin(song.length)}:{calcTimeSec(song.length)} Min
                                        </Typography>
                                    </div>
                                    <div style={{ paddingTop: "3%" }}>
                                        <Typography variant="h6">Genres</Typography>
                                        <Typography variant="overline">{song.genres.join(', ')}</Typography>
                                    </div>
                                </div>
                                <div className="SongRatesWrapper">
                                    <Typography variant="h6">{song.rating.toFixed(1)}/10<MusicNoteIcon/>Beats</Typography>
                                    <Typography variant="subtitle1">{song.numRates} Ratings</Typography>
                                    <Button style={{color:"rgb(106, 90, 205)", border:"1px solid rgb(106, 90, 205)"}} size="medium" variant="outlined" startIcon={<AudiotrackIcon />}>
                                        Rate
                                    </Button>
                                    <Button variant="outlined" style={{color:"rgb(106, 90, 205)", border:"1px solid rgb(106, 90, 205)"}} startIcon={<AddIcon />} >
                                        Add to Collection
                                    </Button>
                                    {
                                    selCol && (
                                        <div style={{}}>
                                            
                                    <SelectCollectionDisplay closeModal={closeCallback} setPlaylist={setPlaylist} fProps={Props}/>
                                            <Typography variant="h6">Chosen collection:</Typography>
                                            <div className="SCD-GridItem">
                                                <img
                                                    src={selCol.imageUrl}
                                                    alt="collectionpic"
                                                    className="SCDmycollectionpic Clickable"
                                                >
                                                </img>
                                                <Typography
                                                    align="center"
                                                    noWrap={true}
                                                    className="SCDmycolname Clickable"
                                                    variant="h6"
                                                >
                                                    {selCol.name}
                                                </Typography>
                                            </div>
                                        </div>
                                        
                                    )
                                    }
                                </div>
                            </div>
                            <div className="SongPageUpperTabs">
                                <StyledTabs
                                    value={tabval}
                                    onChange={handleTabChange}
                                    aria-label="styled tabs example"
                                >
                                    <StyledTab label="Critics" />
                                    <StyledTab label="Lyrics" />
                                    <StyledTab label="Info" />
                                </StyledTabs>
                            </div>
                        </div>
                        <div className="SongPageLower">
                            <div className="SongPageLowerLeft">
                                <SongTabDisplay song={song} tabval={tabval} />
                            </div>
                            <div className="SongPageLowerRight">
                                <Typography variant="h6">Currently playing in jams</Typography>
                                <SmallJamDisplay songId={song.id} />
                            </div>
                        </div>
                    </>
                )
            }

        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(SongPage)