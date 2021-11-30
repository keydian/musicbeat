import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getSong } from "../../axios/axios";
import { dispatch_to_props, FullProps, state_to_props } from "../../redux/redux";
import { Song } from "../../types/types";
import '../../styles/songs/SongPage.css'
import { styled, Tab, Tabs, Typography } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SongTabDisplay from "./SongTabDisplay";


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
                                <div className="SongRates">
                                    <Typography variant="h6">{song.rating.toFixed(1)}/10 Beats</Typography>
                                    <Typography variant="subtitle1">{song.numRates} Ratings</Typography>
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

                            </div>

                        </div>
                    </>
                )
            }

        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(SongPage)