import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { getJam, getSong } from "../../axios/axios";
import { dispatch_to_props, FullProps, state_to_props } from "../../redux/redux";
import { Jam, SongList } from "../../types/types";
import '../../styles/jams/JamPage.css'
import { Typography } from "@mui/material";
import JamQueue from "./JamQueue";
import LikeButtons from "./LikeButtons";


function JamPage(Props: FullProps) {
    const [jam, setJam] = useState<Jam>()
    const [currSong, setCurrsong] = useState<SongList>()
    let jamid = useParams().jamid;
    const songwave = process.env.PUBLIC_URL + "/other/songwave.png";

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
        if (jam) {
            getSong(jam.playlist[0]).then(
                res => {
                    console.log("Next song", res.data)
                    setCurrsong(res.data)
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

    return (
        <div className="JamPageWrapper">
            {
                jam && currSong && (
                    <>
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
                                        <p>Suggested grid here</p>
                                    </div>
                                    <div className="SmallSearchTracks">
                                        <p>Small search tracks here here</p>
                                    </div>
                                </div>
                                <div className="Queue">
                                    <Typography style={{paddingLeft: "6vw", textAlign: "left",paddingBottom:"1vh"}} variant="h6">Queue</Typography>
                                    <JamQueue jamid={jam.id} currSong={currSong} />
                                </div>
                            </div>
                        </div>
                        <div className="JamPageChat">

                        </div>
                    </>
                )
            }

        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(JamPage)