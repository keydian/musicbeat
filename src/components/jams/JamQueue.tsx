import { Grid, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import '../../styles/jams/JamQueue.css'
import { Song, SongList } from '../../types/types';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface JamQueueInterface {
    jamid: string,
    currSong: SongList,
    songs : Song[]
}

function JamQueue(props: JamQueueInterface) {
    const [page, setPage] = useState<number>(0)
    const pageSize = 3;

    const forwardPage = () => {
        setPage((page) => page + 1)
    }

    const backwardPage = () => {
        if (page > 0) {
            setPage((page) => page - 1)
        }
    }

    const canRender = (i: number) => {
        let min = page * pageSize;
        let max = (page + 1) * pageSize
        return i >= min && i < max
    }

    const goForward = () => {
        if (props.songs) {
            return Math.floor((props.songs.length - 1) / pageSize) === page
        } else {
            return false
        }
    }

    const bpmCalc = (bpm: number) => {
        let diff = Math.abs(bpm - props.currSong.bpm)
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
        if (key === props.currSong.key) {
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
        <div className="QueueWrapper">
            {
                props.songs.length > 0 && (
                    <>
                        <div className="QueueDisplayLeftArrow">
                            <IconButton size="large" disabled={page === 0} onClick={backwardPage}>
                                <ArrowBackIosIcon />
                            </IconButton>
                        </div>
                        <Grid container spacing={2} columns={3}>
                            {
                                props.songs.map((s, i) => (
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
                                                            {keyIndicator(s.key)}
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
                            <IconButton size="large" onClick={forwardPage} disabled={goForward()}>
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

/*


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
            key: "F#"
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
            key: "G"
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
            key: "A"
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
            key: "B"
        },
        {
            id: "4",
            name: "Something Good Can Work 2",
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
            key: "B"
        }
    ]

*/