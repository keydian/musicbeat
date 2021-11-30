import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getSong } from "../../axios/axios";
import { dispatch_to_props, FullProps, state_to_props } from "../../redux/redux";
import { Song } from "../../types/types";
import '../../styles/songs/SongPage.css'
import { Typography } from "@mui/material";


function SongPage(Props: FullProps) {
    const [song, setSong] = useState<Song>()
    const [imageUrl, setImageurl] = useState<string>()
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



    return (
        <div className="SongPageWrapper">
            {
                song && (
                    <>
                        <div className="SongPageUpper">
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
                                <Typography variant="h6">
                                    {calcTimeMin(song.length)}:{calcTimeSec(song.length)} Min
                                </Typography>
                                <div style={{paddingTop:"30%"}}>
                                    <Typography variant="h6">Genres</Typography>
                                    <Typography variant="overline">{song.genres.join(', ')}</Typography>
                                </div>

                            </div>
                            <div className="SongRates">

                            </div>
                        </div>
                        <div className="SongPageLower">

                        </div>
                    </>
                )
            }

        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(SongPage)