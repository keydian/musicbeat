import { Grid, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getJamSongs } from '../../axios/axios';
import '../../styles/jams/JamQueue.css'
import { Song, SongList } from '../../types/types';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface JamQueueInterface {
    jamid: string,
    currSong : SongList
}

function JamQueue(props: JamQueueInterface) {
    const [songs, setSongs] = useState<Song[]>()
    const [page, setPage] = useState<number>(0)
    const pageSize = 3;


    const testSongs = [
        {
            id: "0",
            name: "What You Know",
            album: "Tourist History",
            artist: "Two Door Cinema Club",
            info: "other-info-here",
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/b/b2/Two_Door_Cinema_Club_-_Tourist_History.png",
            length: 190,
            genres: [
                "Alt",
                "Rock"
            ],
            rating: 10.0,
            numRates: [],
            bpm: 150,
            key: "G#"
        },
        {
            id: "1",
            name: "Undercover Martyn",
            album: "Tourist History",
            artist: "Two Door Cinema Club",
            info: "other-info-here",
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/b/b2/Two_Door_Cinema_Club_-_Tourist_History.png",
            length: 167,
            genres: [
                "Alt",
                "Rock"
            ],
            rating: 10.0,
            numRates: [],
            bpm: 160,
            key: "G#"
        },
        {
            id: "2",
            name: "I Can Talk",
            album: "Tourist History",
            artist: "Two Door Cinema Club",
            info: "other-info-here",
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/b/b2/Two_Door_Cinema_Club_-_Tourist_History.png",
            length: 176,
            genres: [
                "Alt",
                "Rock"
            ],
            rating: 10.0,
            numRates: [],
            lyrics: "",
            bpm: 180,
            key: "G#"
        },
        {
            id: "3",
            name: "Something Good Can Work",
            album: "Tourist History",
            artist: "Two Door Cinema Club",
            info: "other-info-here",
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/b/b2/Two_Door_Cinema_Club_-_Tourist_History.png",
            length: 167,
            genres: [
                "Alt",
                "Rock"
            ],
            rating: 10.0,
            numRates: [],
            bpm: 200,
            key: "G#"
        }
    ]

    const forwardPage = () => {
        setPage((page) => page + 1)
    }

    const backwardPage = () => {
        if (page > 0) {
            setPage((page) => page - 1)
        }
    }

    useEffect(() => {
        if (!songs && props.jamid) {
            getJamSongs(props.jamid).then(
                res => {
                    console.log("Jam songs received", res.data)
                    setSongs(res.data)
                }
            ).catch(
                err => {
                    if (err.response) {
                        console.log(err.response)
                    }
                }
            )
        }
    }, [songs, props.jamid])

    const canRender = (i: number) => {
        let min = page * pageSize;
        let max = (page + 1) * pageSize
        return i >= min && i < max
    }

    const bpmCalc = (bpm : number) => {
       let diff = Math.abs(bpm - props.currSong.bpm)
       if(diff <= 10) {
        //green
        return "rgba(90, 205, 100, 0.5)"
       } else if (diff >10 && diff <=30) {
        //yellow
        return "rgba(194, 170, 63, 0.5)"
       } else {
        //red
        return "rgba(218, 64, 64, 0.5)"
       }
    }

    const bpmIndicator = (bpm : number) => {
        return (
            <p style={{backgroundColor:bpmCalc(bpm), borderRadius:"5px",padding:"3px"}}>{bpm}</p>
        )
    }
       
    


    const keyCalc = () => {

    }

    const keyIndicator = () => (
        <p></p>
    )

    return (
        <div className="QueueWrapper">
            {
                songs && (
                    <>
                        <div className="QueueDisplayLeftArrow">
                            <IconButton size="large" disabled={page === 0} onClick={backwardPage}>
                                <ArrowBackIosIcon />
                            </IconButton>
                        </div>
                        <Grid container spacing={2} columns={3}>
                            {
                                testSongs.map((s, i) => (
                                    <>
                                        {
                                            canRender(i) && (
                                                <Grid id={s.id + i} item xs={1}>
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
                                                        <div className="SongIndicators">
                                                            {bpmIndicator(s.bpm)}
                                                        </div>
                                                    </div>
                                                </Grid>
                                            )
                                        }
                                    </>
                                ))
                            }
                        </Grid>
                        <div className="QueueDisplayRightArrow">
                            <IconButton size="large" onClick={forwardPage} disabled={Math.floor(testSongs.length / pageSize) === page}>
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default JamQueue;