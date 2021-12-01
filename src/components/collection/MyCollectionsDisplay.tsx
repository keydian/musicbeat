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
import CreateCollection from "./CreateCollection";

interface MyColInterface {
    fProps: FullProps,
    targetUser: string
}

function MyCollectionsDisplay(Props: MyColInterface) {
    const [collections, setCollections] = useState<Collection[]>()
    const [page, setPage] = useState<number>(0)
    const defaultImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
    const pageSize = 7;
    let navigate = useNavigate()


    useEffect(() => {
        console.log("Trying to retrieve collections", collections)
        if (Props.fProps.isLogged && page >= 0) {
            if (Props.targetUser) {
                console.log("Retrieving collections", Props.targetUser)
                getUserCollections(Props.targetUser, page, pageSize).then(
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
    }, [Props.fProps.isLogged, page, Props.targetUser])

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
                                                        onClick={() => navigate("/collection/" + col.id)}
                                                    >
                                                    </img>
                                                    <Typography
                                                        align="center"
                                                        noWrap={true}
                                                        className="mycolname Clickable"
                                                        variant="h6"
                                                        onClick={() => navigate("/collection/" + col.id)}
                                                    >
                                                        {col.name}
                                                    </Typography>
                                                </div>
                                            </Grid>
                                        ))}
                                        {
                                            Props.fProps.username === Props.targetUser && (
                                                <Grid id={"addcolgrid"+Props.targetUser} item xs={3}>
                                                    <div className="GridItemDiv">
                                                        <CreateCollection mode={"icon"} />
                                                    </div>
                                                </Grid>
                                            )
                                        }
                                    </Grid>
                                ) : (
                                    <>
                                        {
                                            page === 0 ? (
                                                <p>No collections yet!</p>
                                            ) : (
                                                <>
                                                    <Typography variant="h6">No more collections!</Typography>
                                                    {
                                                        Props.fProps.username === Props.targetUser && (
                                                            <CreateCollection mode={"icon"} />
                                                        )
                                                    }
                                                </>
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