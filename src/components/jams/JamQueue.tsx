import { Grid, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { getJamSongs } from '../../axios/axios';
import '../../styles/jams/JamQueue.css'
import { Song } from '../../types/types';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function JamQueue(jamid: string) {
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
            raters: [],
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
            raters: [],
            bpm: 150,
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
            raters: [],
            bpm: 150,
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
            raters: [],
            bpm: 150,
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
        if (!songs && jamid) {
            getJamSongs(jamid).then(
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
    }, [songs, jamid])


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
                                songs.map((s, i) => (
                                    <>
                                        <Grid id={s.id+i} item xs={1}>
                                            <div className="SongQueueWrapper">

                                            </div>
                                        </Grid>
                                    </>
                                ))
                            }
                        </Grid>
                        <div className="QueueDisplayRightArrow">
                            <IconButton size="large" onClick={forwardPage} disabled={Math.ceil(songs.length / pageSize) === page}>
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