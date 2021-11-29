import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getFullCollection } from "../../axios/axios";
import { dispatch_to_props, FullProps, state_to_props } from "../../redux/redux";
import { CollectionFull } from "../../types/types";
import '../../styles/collection/CollectionPage.css'
import { Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

function CollectionPage(Props: FullProps) {
    let collectionid = useParams().collectionid;
    let navigate = useNavigate();
    const [collection, setCollection] = useState<CollectionFull>()


    useEffect(() => {
        if (collectionid && Props.isLogged) {
            getFullCollection(collectionid).then(
                res => {
                    console.log(res.data)
                    setCollection(res.data)
                }
            ).catch(
                err => {
                    if (err.response) {
                        console.log(err.response)
                    }
                }
            )
        }
    }, [Props.isLogged, collectionid])

    const descCheck = () => {
        if (collection) {
            if (collection.description === undefined || collection.description.trim() === '') {
                return false
            }
            return true
        }
        return false
    }

    return (
        <div className="CollectionPageWrapper">
            {
                collection && (
                    <>
                        <div className="ColPageUpper">
                            <img
                                src={collection.imageUrl}
                                alt="collectionimage-logo"
                                className="collectionimage"
                            >
                            </img>
                            <div className="CollectionInfo">
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Typography style={{ paddingRight: "10px" }} variant="h3">{collection.name}</Typography>
                                    {
                                        collection.creator === Props.username && (
                                            <EditIcon color="action" />
                                        )
                                    }
                                </div>
                                <Typography onClick={()=> navigate('/profile/'+collection.creator)}gutterBottom={true} variant="h5">by {collection.creator}</Typography>
                                <div className="coldescriptionwrapper">
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <Typography style={{ paddingRight: "10px" }} variant="h6">Description:</Typography>
                                        {
                                            collection.creator === Props.username && (
                                                <EditIcon color="action" />
                                            )
                                        }
                                    </div>
                                    {
                                        descCheck() ? (
                                            <Typography align="left" variant="body1">{collection.description}</Typography>
                                        ) : (
                                            <Typography variant="body1">Creator didn't provide a description.</Typography>
                                        )
                                    }
                                </div>
                                <Typography variant="h6">{collection.songs.length} songs</Typography>
                            </div>
                            <div className="CollectionShare">
                                <TwitterIcon fontSize="large" style={{color:"rgb(60, 140, 245)"}}/>
                                <FacebookIcon fontSize="large"  style={{color:"rgb(34, 62, 248)"}}/>
                                <InstagramIcon fontSize="large"  style={{color:"rgb(255, 51, 0)"}}/>
                            </div>
                        </div>
                        <div className="ColPageLower">
 
                        </div>
                    </>
                )
            }

        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(CollectionPage)

