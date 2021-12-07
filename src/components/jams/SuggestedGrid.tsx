import { useEffect, useState } from "react"
import { getJamSuggested } from "../../axios/axios"
import { Song, SongList } from "../../types/types"
import '../../styles/jams/SuggestedGrid.css'
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import { Grid, IconButton, Typography } from "@mui/material";

interface SuggestedGridInterface {
    addCallback: Function,
    jamid: string,
    currSong: SongList,
    isHost : boolean
}


function SuggestedGrid(Props: SuggestedGridInterface) {
    const [suggested, setSuggested] = useState<Song[]>()

    useEffect(() => {
        if (!suggested) {
            getJamSuggested(Props.jamid).then(
                res => {
                    setSuggested(res.data)
                }
            ).catch(
                err => {
                    if (err.response) {
                        console.log(err.response)
                    }
                }
            )
        }
    }, [suggested])

    const bpmCalc = (bpm: number) => {
        let diff = Math.abs(bpm - Props.currSong.bpm)
        if (diff <= 10) {
            //green
            return "rgba(90, 205, 100, 0.5)"
        } else if (diff > 10 && diff <= 30) {
            //yellow
            return "rgba(194, 170, 63, 0.5)"
        } else {
            //red
            return "rgba(218, 64, 64, 0.5)"
        }
    }

    const bpmIndicator = (bpm: number) => {
        return (
            <Typography
                style={{ backgroundColor: bpmCalc(bpm), borderRadius: "5px", border: "1px solid black", marginBottom: "5px" }}>
                {bpm}
            </Typography>
        )
    }


    const keyCalc = (key: string) => {
        if (key === Props.currSong.key) {
            return "rgba(90, 205, 100, 0.5)"
        }
        let val = Math.random()
        if (val <= 0.3) {
            return "rgba(90, 205, 100, 0.5)"
        } else if (val > 0.3 && val <= 0.6) {
            return "rgba(194, 170, 63, 0.5)"
        } else {
            return "rgba(218, 64, 64, 0.5)"
        }
    }

    const keyIndicator = (key: string) => {
        return (
            <Typography
                style={{ backgroundColor: keyCalc(key), borderRadius: "5px", border: "1px solid black" }}
            >{key}</Typography>
        )
    }

    return (
        <div className="SuggestedGridWrapper">
            {
                suggested && suggested.length > 0 ? (
                    <>
                        <Grid container spacing={2} columns={2}>
                            {suggested.map((s, i) => (
                                <Grid item xs={1}>
                                    <div className="SongQueueWrapper">
                                        <img
                                            src={s.imageUrl}
                                            alt="songqueuepic"
                                            className="songqueuepic"
                                        >
                                        </img>
                                        <div className="SongQueueNameArtist">
                                            <Typography variant="body1">
                                                {s.name} - {s.artist}
                                            </Typography>
                                        </div>
                                        {
                                            Props.isHost && (
                                                <IconButton onClick={() => { Props.addCallback(s) }}>
                                                    <AddIcon/>
                                                </IconButton>
                                            )
                                        }
                                        <div className="SongIndicators">
                                            {bpmIndicator(s.bpm)}
                                            {keyIndicator(s.key)}
                                        </div>
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </>
                ) : (
                    <Typography variant="h6">We couldn't find similar songs!</Typography>
                )
            }
        </div>
    )
}

export default SuggestedGrid