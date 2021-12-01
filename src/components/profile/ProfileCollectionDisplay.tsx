import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUserCollections } from "../../axios/axios";
import { dispatch_to_props, state_to_props } from "../../redux/redux";
import { Collection } from "../../types/types";
import '../../styles/profile/ProfileCollectionDisplay.css'
import { useNavigate } from "react-router";

interface ProfileCollectionDisplayInterface {
    profileUser : string
}

function ProfileCollectionDisplay(Props: ProfileCollectionDisplayInterface) {
    let navigate = useNavigate()
    const [collections, setCollections] = useState<Collection[]>()
    const defaultImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"

    useEffect(() => {
            if (Props.profileUser) {
                console.log("AAAAAAAAAAAAAAAA",Props.profileUser)
                getUserCollections(Props.profileUser, 0, 6).then(
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
    }, [Props.profileUser])

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
                            <Grid className="GridItemDiv" id={col.id + i} item xs={4} >
                                <img
                                    src={colImg(col)}
                                    alt="collectionpic"
                                    className="collectionpic Clickable"
                                    onClick={() => navigate("/collection/"+col.id)}
                                >
                                </img>
                                <Typography 
                                className="mycolname Clickable" 
                                variant="h6"
                                onClick={() => navigate("/collection/"+col.id)}
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