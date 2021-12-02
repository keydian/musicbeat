import { Grid, IconButton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { searchJams } from '../../axios/axios'
import { FullProps } from '../../redux/redux'
import '../../styles/jams/JamsPageDisplay.css'
import { JamWithSong } from '../../types/types'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import JoinJam from './JoinJam'

interface JamPageInterface {
    fProps: FullProps,
}

function JamsPageDisplay(Props: JamPageInterface) {
    const [jams, setJams] = useState<JamWithSong[]>()
    const [page, setPage] = useState<number>(0)
    const defaultImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
    const pageSize = 8;
    let navigate = useNavigate()

    const jamsTest: JamWithSong[] = [
        {
            id: "0",
            name: "Indie chill",
            host: "Valgreen",
            participants: ["0", "1", "2", "3", "4"],
            playlist: ["0"],
            imageUrl: '',
            firstSong: {
                id: "0",
                name: "What You Know",
                artist: "Two Door Cinema Club",
                imageUrl: "https://upload.wikimedia.org/wikipedia/en/b/b2/Two_Door_Cinema_Club_-_Tourist_History.png",
            }
        },
        {
            id: "1",
            name: "Indie chill",
            host: "Valgreen",
            participants: ["0", "1", "2", "3", "4"],
            playlist: ["0"],
            imageUrl: '',
            firstSong: {
                id: "0",
                name: "What You Know",
                artist: "Two Door Cinema Club",
                imageUrl: "https://upload.wikimedia.org/wikipedia/en/b/b2/Two_Door_Cinema_Club_-_Tourist_History.png",
            }
        },
        {
            id: "2",
            name: "Indie chill",
            host: "Valgreen",
            participants: ["0", "1", "2", "3", "4"],
            playlist: ["0"],
            imageUrl: '',
            firstSong: {
                id: "0",
                name: "What You Know",
                artist: "Two Door Cinema Club",
                imageUrl: "https://upload.wikimedia.org/wikipedia/en/b/b2/Two_Door_Cinema_Club_-_Tourist_History.png",
            }
        },
        {
            id: "3",
            name: "Indie chill",
            host: "Valgreen",
            participants: ["0", "1", "2", "3", "4"],
            playlist: ["0"],
            imageUrl: '',
            firstSong: {
                id: "0",
                name: "What You Know",
                artist: "Two Door Cinema Club",
                imageUrl: "https://upload.wikimedia.org/wikipedia/en/b/b2/Two_Door_Cinema_Club_-_Tourist_History.png",
            }
        },
        {
            id: "4",
            name: "Indie chill",
            host: "Valgreen",
            participants: ["0", "1", "2", "3", "4"],
            playlist: ["0"],
            imageUrl: '',
            firstSong: {
                id: "0",
                name: "What You Know",
                artist: "Two Door Cinema Club",
                imageUrl: "https://upload.wikimedia.org/wikipedia/en/b/b2/Two_Door_Cinema_Club_-_Tourist_History.png",
            }
        },
        {
            id: "5",
            name: "Indie chill",
            host: "Valgreen",
            participants: ["0", "1", "2", "3", "4"],
            playlist: ["0"],
            imageUrl: '',
            firstSong: {
                id: "0",
                name: "What You Know",
                artist: "Two Door Cinema Club",
                imageUrl: "https://upload.wikimedia.org/wikipedia/en/b/b2/Two_Door_Cinema_Club_-_Tourist_History.png",
            }
        }
    ]

    useEffect(() => {
        if (Props.fProps.isLogged && page >= 0) {
            console.log("Searching for jams")
            searchJams(page, pageSize).then(
                res => {
                    console.log(res.data)
                    setJams(res.data.content)
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
    }, [Props.fProps.isLogged, page])

    const jamImg = (jam: JamWithSong) => {
        if (jam.firstSong.imageUrl !== undefined && jam.firstSong.imageUrl.trim() !== '') {
            return jam.firstSong.imageUrl
        }
        return defaultImg
    }

    const forwardPage = () => {
        setPage((page) => page + 1)
    }

    const backwardPage = () => {
        if (page > 0) {
            setPage((page) => page - 1)
        }
    }


    return (
        <div className="JamDisplayGridWrapper">
            {
                jams && (
                    <>
                        <div className="JamsDisplayLeftArrow">
                            <IconButton size="large" disabled={page === 0} onClick={backwardPage}>
                                <ArrowBackIosIcon />
                            </IconButton>
                        </div>
                        <div className="JamsDisplayMid">
                            {
                                jams.length > 0 ? (
                                    <Grid container
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        rowSpacing={8}
                                    >
                                        {jams.map((j, i) => (
                                            <>
                                                <Grid id={j.id + i} item xs={3}>
                                                    <div className="JamItemDiv">
                                                        <img
                                                            src={jamImg(j)}
                                                            alt="jamgridpic"
                                                            className="jamgridpic"
                                                        >
                                                        </img>
                                                        <div className="JamImgOverview">
                                                            <Typography style={{color:"rgb(96, 0, 128)"}}noWrap={true} variant="h6">{j.name}</Typography>
                                                            {
                                                                j.firstSong && (
                                                                    <div className="JamItemPlaying">
                                                                        <Typography variant="subtitle1">Playing:</Typography>
                                                                        <Typography variant="body1">{j.firstSong.name} - {j.firstSong.artist}</Typography>

                                                                    </div>
                                                                )
                                                            }
                                                            <div style={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                            }}>
                                                                <RecordVoiceOverIcon style={{ paddingRight: "5px" }} />
                                                                <Typography variant="body1">{j.host}</Typography>
                                                                <div style={{ paddingLeft: "20px", display: "flex", alignItems: "center" }}>
                                                                    <p>{j.participants.length}</p>
                                                                    <PeopleAltIcon />
                                                                </div>
                                                            </div>
                                                            <JoinJam fProps={Props.fProps} jam={j} />
                                                        </div>
                                                    </div>
                                                </Grid>
                                            </>
                                        ))}
                                    </Grid>
                                ) : (
                                    <Typography variant="h3">No one jamming at the moment...</Typography>
                                )
                            }
                        </div>
                        <div className="JamsDisplayRightArrow">
                            <IconButton size="large" onClick={forwardPage} disabled={page > 0 && jams?.length === 0}>
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default JamsPageDisplay