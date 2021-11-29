import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUserCollections } from "../../axios/axios";
import { dispatch_to_props, state_to_props } from "../../redux/redux";
import { Collection } from "../../types/types";
import '../../styles/profile/ProfileCollectionDisplay.css'
import { useNavigate } from "react-router";

function ProfileCollectionDisplay(username: string) {
    let navigate = useNavigate()
    const [collections, setCollections] = useState<Collection[]>()
    const defaultImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
    //For debug
    let c: Collection[] = [
        {
            id: "0",
            name: "Collection1",
            description: "",
            creator: username,
            songs: [],
            imageUrl: "http://2.bp.blogspot.com/-t_j3mWFnRro/Tgo2PQ5r0NI/AAAAAAAAACs/OTTWy-PVEHM/s1600/tour.jpg"
        },
        {
            id: "1",
            name: "Collection2",
            description: "",
            creator: username,
            songs: [],
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
        },
        {
            id: "2",
            name: "Collection3",
            description: "",
            creator: username,
            songs: [],
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
        },
        {
            id: "3",
            name: "Collection4",
            description: "",
            creator: username,
            songs: [],
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
        }
    ]

    useEffect(() => {
        console.log("Collections", collections)
        if (!collections) {
            if (username) {
                getUserCollections(username, 0, 6).then(
                    res => {
                        console.log("Collections fetch success")
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
    }, [collections])

    const colImg = (col: Collection) => {
        if (col.imageUrl !== undefined && col.imageUrl.trim() !== '') {
            return col.imageUrl
        }
        return defaultImg
    }

    return (
        <div className="GridWrapper">
            {
                collections && collections.length > 0 ? (
                    <Grid container
                        justifyContent="flex-start"
                        alignItems="center"
                        rowSpacing={4}
                    >
                        {collections.map((col, i) => (
                            <Grid id={col.id + i} item xs={4} >
                                <img
                                    src={colImg(col)}
                                    alt="collectionpic"
                                    className="collectionpic Clickable"
                                    onClick={() => navigate("/collections/"+col.id)}
                                >
                                </img>
                                <Typography 
                                className="Clickable" 
                                variant="h6"
                                onClick={() => navigate("/collections/"+col.id)}
                                >{col.name}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <p>No collections yet!</p>
                )
            }
        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(ProfileCollectionDisplay)