import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUserCollections } from "../../axios/axios";
import { dispatch_to_props, state_to_props } from "../../redux/redux";
import { Collection } from "../../types/types";
import '../../styles/profile/ProfileCollectionDisplay.css'

function ProfileCollectionDisplay(username: string) {
    const [collections, setCollections] = useState<Collection[]>()

    let c : Collection[] = [
        {
            id: "0",
            name: "Collection1",
            creator: username,
            songs: [],
            image: "http://2.bp.blogspot.com/-t_j3mWFnRro/Tgo2PQ5r0NI/AAAAAAAAACs/OTTWy-PVEHM/s1600/tour.jpg"
        },
        {
            id: "1",
            name: "Collection2",
            creator: username,
            songs: [],
            image: "https://i.pinimg.com/736x/f5/31/be/f531be33d92a1431d5b274e65eae3a52.jpg"
        },
        {
            id: "2",
            name: "Collection3",
            creator: username,
            songs: [],
            image: "https://www.artmajeur.com/medias/standard/d/o/domballada/artwork/10620700_wedding-party-02.jpg"
        },
        {
            id: "3",
            name: "Collection4",
            creator: username,
            songs: [],
            image: "https://static.nationalgeographic.co.uk/files/styles/image_3200/public/cat-odyssey-turkey-04.jpg?w=1900&h=1267"
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

    const renderItem = (col: Collection, ind: number) => {
        return (
            <>
                {
                    ind < 6 && (
                        <Grid id={col.name + ind} item xs={4}>
                            <img
                                src={col.image}
                                alt="collectionpic"
                                className="collectionpic"
                            >
                            </img>
                            <Typography variant="h6">{col.name}</Typography>
                        </Grid>
                    )
                }
            </>
        )
    }

    return (
        <div className="GridWrapper">
            {
                c && c.length > 0 ? (
                    <Grid container
                        justifyContent="flex-start"
                        alignItems="center"
                        rowSpacing={4}
                    >
                        {c.map((col, i) => (
                            renderItem(col, i)
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