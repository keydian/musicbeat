import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { addSongToJam, getJam, getJamSongs, getSong, leaveJam, removeSonFromJam } from "../../axios/axios";
import { dispatch_to_props, FullProps, state_to_props } from "../../redux/redux";
import { Jam, Song, SongList } from "../../types/types";
import '../../styles/jams/JamPage.css'
import { Alert, Button, Snackbar, Typography } from "@mui/material";
import JamQueue from "./JamQueue";
import LikeButtons from "./LikeButtons";
import MiniSearch from "./MiniSearch";
import SuggestedGrid from "./SuggestedGrid";
import JamChat from "./JamChat";


function JamPage(Props: FullProps) {
    const [jam, setJam] = useState<Jam>()
    const [currSong, setCurrsong] = useState<SongList>()
    const [songs, setSongs] = useState<Song[]>([])
    const [sucOpen, setSuc] = useState<boolean>(false)
    const [sucOpen2, setSuc2] = useState<boolean>(false)
    const [errOpen, setErr] = useState<boolean>(false)
    const [errMsg, setErrMsg] = useState<string>()
    let navigate = useNavigate()
    let jamid = useParams().jamid;
    const songwave = process.env.PUBLIC_URL + "/other/songwave.png";

    const addToQueueCallback = useCallback((s: Song) => {
        if (jam) {
            resetSnackbars()
            addSongToJam(jam.id, s.id).then(
                res => {
                    setSuc(true)
                    console.log("added song", res.data)
                    setSongs([...songs, s])
                }
            ).catch(
                err => {
                    if (err.response) {
                        console.log(err.response)
                        setErrMsg(err.response.data.message)
                    }
                }
            )
        }
    }, [songs])

    const removeFromQueueCallback = useCallback((s: Song) => {
        if (jam) {
            resetSnackbars()
            removeSonFromJam(jam.id, s.id).then(
                res => {
                    console.log("removed song", res.data)
                    removeFromSongs(s)
                    setSuc2(true)
                }
            ).catch(
                err => {
                    if (err.response) {
                        console.log(err.response)
                        setErrMsg(err.response.data.message)
                    }
                }
            )
        }
    }, [songs])

    const removeFromSongs = (s: Song) => {
        let filteredArray = songs.filter(item => item.id !== s.id)
        setSongs(filteredArray)
    }

    useEffect(() => {
        if (jamid && Props.isLogged) {
            getJam(jamid).then(
                res => {
                    console.log("Got jam", res.data)
                    setJam(res.data)
                }
            ).catch(
                err => {
                    if (err.response) {
                        console.log(err.response)
                    }
                }
            )
        }
    }, [Props.isLogged, jamid])

    useEffect(() => {
        if (errMsg) {
            setErr(true)
        }
    }, [errMsg])


    useEffect(() => {
        if (jam) {
            getSong(jam.playlist[0]).then(
                res => {
                    setCurrsong(res.data)
                }
            ).catch(
                err => {
                    if (err.response) {
                        console.log(err.response)
                    }
                }
            )
            getJamSongs(jam.id).then(
                res => {
                    setSongs(res.data.slice(1, res.data.length))
                }
            ).catch(
                err => {
                    if (err.response) {
                        console.log(err.response)
                    }
                }
            )
        }
    }, [Props.isLogged, jam])

    const leaveJamRequest = () => {
        if(jam) {
            leaveJam(jam.id).then(
                res => {
                    Props.leavejam()
                    navigate("/jams")
                }
            ).catch(
                err => {
                    if (err.response) {
                        //Should never happen
                        console.log(err.response)
                        alert(err.response.data.message)
                    }
                }
            )
        }
    }

    const closeSuc = () => {
        setSuc(false)
    }

    const closeSuc2 = () => {
        setSuc(false)
    }

    const closeErr = () => {
        setErr(false)
    }

    const resetSnackbars = () => {
        setErrMsg(undefined)
        setErr(false)
        setSuc(false)
        setSuc2(false)
    }

    return (
        <div className="JamPageWrapper">
            {
                jam && currSong && (
                    <>
                        <Snackbar open={sucOpen} autoHideDuration={3000} onClose={closeSuc}>
                            <Alert variant="filled" onClose={closeSuc} severity="success" sx={{ width: '100%' }}>
                                Song added to queue!
                            </Alert>
                        </Snackbar>
                        <Snackbar open={sucOpen2} autoHideDuration={3000} onClose={closeSuc2}>
                            <Alert variant="filled" onClose={closeSuc2} severity="success" sx={{ width: '100%' }}>
                                Song removed from queue!
                            </Alert>
                        </Snackbar>
                        <Snackbar open={errOpen} autoHideDuration={3000} onClose={closeErr}>
                            <Alert variant="filled" onClose={closeErr} severity="error" sx={{ width: '100%' }}>
                                {errMsg}
                            </Alert>
                        </Snackbar>
                        <div className="JamPageLeft">
                            <Typography
                                variant="h6"
                                style={{ textAlign: "left" }}
                            >
                                Now playing on {jam.host}'s {jam.name}
                            </Typography>
                            <div className="MusicDisplayer">
                                <div className="MusicDisplayerLeft">
                                    <img
                                        src={currSong.imageUrl}
                                        alt="songimagejam-logo"
                                        className="songimagejam"
                                    >
                                    </img>
                                </div>
                                <div className="MusicDisplayerMid">
                                    <div className="SongDetails">
                                        <Typography
                                            variant="h6"
                                            style={{ color: "rgb(129, 103, 184)" }}
                                        >
                                            Now playing:
                                        </Typography>
                                        <Typography variant="h6">{currSong.name} - {currSong.artist}</Typography>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <Typography style={{ color: "rgb(129, 103, 184)", fontWeight: "900", paddingRight: "5px" }} variant="body1">BPM:</Typography>
                                            <Typography variant="subtitle1">{currSong.bpm}</Typography>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <Typography style={{ color: "rgb(129, 103, 184)", fontWeight: "900", paddingRight: "5px" }} variant="body1">Key:</Typography>
                                            <Typography variant="subtitle1">{currSong.key}</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="MusicDisplayerRight">
                                    <img
                                        src={songwave}
                                        alt="songwave-logo"
                                        className="songwave"
                                    >
                                    </img>
                                    <LikeButtons />
                                </div>
                            </div>
                            <Typography style={{ textAlign: "left", paddingTop: "1vh" }} variant="h6">Track Selection</Typography>
                            <div className="JamPageTrackSelection">
                                <div className="SuggestedAndSearch">
                                    <div className="SuggestedGridWrapper">
                                        <Typography variant="h6" style={{ paddingLeft: "6vw", textAlign: "left" }}>Suggested</Typography>
                                        <SuggestedGrid addCallback={addToQueueCallback} jamid={jam.id} currSong={currSong} isHost={Props.username === jam.host} />
                                    </div>
                                    <div className="SmallSearchTracks">
                                        <MiniSearch isHost={Props.username === jam.host} addCallback={addToQueueCallback} />
                                    </div>
                                </div>
                                <div className="Queue">
                                    <Typography style={{ paddingLeft: "6vw", textAlign: "left" }} variant="h6">Queue</Typography>
                                    {
                                        songs && (
                                            <JamQueue
                                                jamid={jam.id}
                                                currSong={currSong}
                                                songs={songs}
                                                delCallback={removeFromQueueCallback} />
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="JamPageRight">
                            <JamChat fProps={Props} participants={jam.participants}/>
                            <Button 
                            color="error" 
                            variant="contained" 
                            style={{width:"70%", borderRadius:"25px", marginTop:"2vh"}}
                            onClick={leaveJamRequest}
                            >
                               {
                                   Props.username === jam.host ? (
                                        <Typography variant="h6">End jam</Typography>
                                   ) : (
                                        <Typography variant="h6">Leave jam</Typography>
                                   )
                               }
                            </Button>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(JamPage)