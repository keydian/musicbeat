import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { getJam, getSong } from "../../axios/axios";
import { dispatch_to_props, FullProps, state_to_props } from "../../redux/redux";
import { Jam, SongList } from "../../types/types";
import '../../styles/jams/JamPage.css'
import { Typography } from "@mui/material";

function JamPage(Props: FullProps) {
    const [jam, setJam] = useState<Jam>()
    const [likes, setLikes] = useState<number[]>([0, 0])
    const [currSong, setCurrsong] = useState<SongList>()
    let jamid = useParams().jamid;


    const jamTest = {
        id: "0",
        name: "Indie chill",
        host: "Valgreen",
        participants: ["user0", "user1", "user2", "user3", "user4"],
        playlist: ["0", "1", "2", "3"],
        imageUrl: ''
    }

    /*
    useEffect(() => {
        if (jamid && Props.isLogged) {
            console.log("Got jam", jamTest)
            setJam(jamTest)
        }
    }, [Props.isLogged, jamid])
    */

    
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
                                    <Typography variant="body1">{currSong.name} - {currSong.artist}</Typography>
                                </div>
                                <div className="MusicDisplayerMid">
                                    <div className="SongDetails">
                                        <div style={{ display: "flex" }}>

                                        </div>
                                        <div style={{ display: "flex" }}>

                                        </div>
                                        <Typography variant="body1">BPM: 200</Typography>
                                        <Typography variant="body1">Key: G Major</Typography>
                                    </div>

                                </div>
                                <div className="MusicDisplayerRight">
                                    <p>Music slider here</p>
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
                                    <p>Queue here</p>
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