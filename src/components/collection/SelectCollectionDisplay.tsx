import { Grid, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getUserCollections } from "../../axios/axios";
import { FullProps } from "../../redux/redux";
import { Collection } from "../../types/types";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import '../../styles/collection/SelectCollectionDisplay.css'

interface SelColDisInterface {
    fProps: FullProps,
    setPlaylist : Function,
    closeModal : Function
}

function SelectCollectionDisplay(Props: SelColDisInterface) {
    let navigate = useNavigate()
    const [collections, setCollections] = useState<Collection[]>()
    const [page, setPage] = useState<number>(0)
    const pageSize = 6;
    const defaultImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"

    useEffect(() => {
        if (Props.fProps.username && page >= 0) {
            getUserCollections(Props.fProps.username, page, pageSize).then(
                res => {
                    setCollections(res.data.content)
                }
            ).catch(
                err => {
                    if (err.response) {
                        //Should never happen
                        console.log(err.response)
                        //alert(err.response.data.message)
                    }
                }
            )
        }
    }, [Props.fProps.username, page])

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

    const chooseCollection = (col: Collection) => {
        Props.setPlaylist(col)
        Props.closeModal()
    }

    return (
        <div className="SelColDisplayWrapper">
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
                                    <>
                                        <Grid container
                                            justifyContent="flex-start"
                                            alignItems="center"
                                            rowSpacing={4}
                                            columns={3}
                                        >
                                            {
                                                collections.map((c, i) => (
                                                    <Grid onClick={() => chooseCollection(c)} id={c.id + i} item xs={1}>
                                                        <div className="SCD-GridItem">
                                                            <img
                                                                src={colImg(c)}
                                                                alt="collectionpic"
                                                                className="SCDmycollectionpic Clickable"
                                                            >
                                                            </img>
                                                            <Typography
                                                                align="center"
                                                                noWrap={true}
                                                                className="SCDmycolname Clickable"
                                                                variant="h6"
                                                            >
                                                                {c.name}
                                                            </Typography>
                                                        </div>
                                                    </Grid>
                                                ))
                                            }
                                        </Grid>
                                    </>
                                ) : (
                                    <>
                                    <Typography variant="h6">No collections here!</Typography>
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

export default SelectCollectionDisplay