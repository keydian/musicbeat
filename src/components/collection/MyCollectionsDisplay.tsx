import { Grid, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUserCollections } from "../../axios/axios";
import { dispatch_to_props, FullProps, state_to_props } from "../../redux/redux";
import { Collection } from "../../types/types";
import '../../styles/collection/MyCollectionsDisplay.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router";

function MyCollectionsDisplay(Props: FullProps) {
    const [collections, setCollections] = useState<Collection[]>()
    const [page, setPage] = useState<number>(0)
    const defaultImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
    const pageSize = 8;
    let navigate = useNavigate()

    let c: Collection[] = [
        {
            id: "0",
            name: "Collection1",
            description: "",
            creator: Props.username,
            songs: [],
            imageUrl: "http://2.bp.blogspot.com/-t_j3mWFnRro/Tgo2PQ5r0NI/AAAAAAAAACs/OTTWy-PVEHM/s1600/tour.jpg"
        },
        {
            id: "1",
            name: "Collection2",
            description: "",
            creator: Props.username,
            songs: [],
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
        },
        {
            id: "2",
            name: "Collection3",
            description: "",
            creator: Props.username,
            songs: [],
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
        },
        {
            id: "3",
            name: "Collection4",
            description: "",
            creator: Props.username,
            songs: [],
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
        },
        {
            id: "4",
            name: "Collection5",
            description: "",
            creator: Props.username,
            songs: [],
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
        },
        {
            id: "5",
            name: "Collection6",
            description: "",
            creator: Props.username,
            songs: [],
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
        },
        {
            id: "6",
            name: "Collection7",
            description: "",
            creator: Props.username,
            songs: [],
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
        },
        {
            id: "7",
            name: "Collection8",
            description: "",
            creator: Props.username,
            songs: [],
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
        }
    ]

    useEffect(() => {
        console.log("Trying to retrieve collections", collections)
        if (Props.isLogged && page >= 0) {
            if (Props.username) {
                console.log("Retrieving collections")
                getUserCollections(Props.username, page, pageSize).then(
                    res => {
                        console.log("Collections fetch success", res.data.content)
                        setCollections(res.data.content)
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
    }, [Props.isLogged, page])

    const colImg = (col: Collection) => {
        if (col.imageUrl !== undefined && col.imageUrl.trim() !== '') {
            return col.imageUrl
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

    useEffect(() => {
        console.log(page)
    }, [page])

    return (
        <div className="MyColGridWrapper">
            {
                collections && (
                    <>
                        <div className="MyColLeftArrow">
                            <IconButton size="large" disabled={page === 0} onClick={backwardPage}>
                                <ArrowBackIosIcon />
                            </IconButton>
                        </div>
                        <div className="MyColMidDisplay">
                            {
                                collections.length > 0 ? (
                                    <Grid container
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        rowSpacing={8}
                                    >
                                        {collections.map((col, i) => (
                                            <Grid id={col.id + i} item xs={3}>
                                                <div className="GridItemDiv">
                                                    <img
                                                        src={colImg(col)}
                                                        alt="collectionpic"
                                                        className="mycollectionpic Clickable"
                                                        onClick={() => navigate("/collections/"+col.id)}
                                                    >
                                                    </img>
                                                    <Typography 
                                                    align="center" 
                                                    noWrap={true} 
                                                    className="mycolname Clickable" 
                                                    variant="h6"
                                                    onClick={() => navigate("/collections/"+col.id)}
                                                    >
                                                        {col.name}
                                                    </Typography>
                                                </div>
                                            </Grid>
                                        ))}
                                    </Grid>
                                ) : (
                                    <>
                                        {
                                            page === 0 ? (
                                                <p>No collections yet!</p>
                                            ) : (
                                                <p>No more collections!</p>
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                        <div className="MyColRightArrow">
                            <IconButton size="large" onClick={forwardPage} disabled={page > 0 && collections?.length === 0}>
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </div>
                    </>
                )
            }

        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(MyCollectionsDisplay)