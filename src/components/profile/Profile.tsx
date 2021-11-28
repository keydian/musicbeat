import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { dispatch_to_props, FullProps, state_to_props } from "../../redux/redux";
import { User } from "../../types/types";
import '../../styles/profile/Profile.css'
import { getUser } from "../../axios/axios";
import { Typography } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import ProfileReviewsDisplay from "./ProfileReviewsDisplay";
import ProfileCollectionDisplay from "./ProfileCollectionDisplay";
import CreateCollection from "../collection/CreateCollection";

function Profile(Props: FullProps) {
    let username = useParams().username;
    let navigate = useNavigate();
    const avatarFolder = process.env.PUBLIC_URL + "/avatar/";

    const [user, setUser] = useState<User>()
    const [pathusername, setPathusername] = useState<string>()

    useEffect( () => {
        if(!pathusername) {
            setPathusername(username)
        }
    }, [pathusername,username])

    useEffect(() => {
        if (username && Props.isLogged) {
            getUser(username).then(
                (res) => {
                    console.log("Profile success")
                    setUser(res.data)
                }
            ).catch(
                (err) => {
                    if (err.response) {
                        //Should never happen
                        console.log(err.response)
                        //alert(err.response.data.message)
                    }
                }
            )
        }
    }, [Props.isLogged, username, pathusername])


    return (
        <div>
            {
                user && (
                    <>
                        <div className="UserBanner">
                            <img
                                src={avatarFolder + 'defaultavatar.png'}
                                alt="defaultavatar-logo"
                                className="defaultavatar"
                            >
                            </img>
                            <div className="UserInfo">
                                <Typography variant="h2" gutterBottom component="div">
                                    {username}
                                </Typography>
                                <p>{user.collections.length} Collections | 6 Reviews</p>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <AddCircleOutlineIcon sx={{}} />
                                    <p>Add as friend</p>
                                </div>
                            </div>
                            <div className="OtherInfo">
                                <div className="LinkedAcc">
                                    <Typography variant="subtitle1">LINKED ACCOUNTS:</Typography>
                                    <TwitterIcon fontSize={"large"} htmlColor={"rgb(51, 153, 255)"} />
                                    <FacebookIcon fontSize={"large"} htmlColor={"rgb(0, 102, 204)"} />
                                </div>
                            </div>
                        </div>
                        <div className="LowerPartWrapper">
                            <div className="CollectionsDisplay">
                            <div className="CollectionsDisplayHeader">
                            <Typography variant="h4" style={{textAlign:"left", paddingLeft:"1vw", paddingBottom:"1vh"}}>{username}'s Collections</Typography>
                            <CreateCollection/>
                            </div>
                                {
                                    username && (
                                        <ProfileCollectionDisplay
                                        {...username}
                                        />
                                    )
                                }
                            </div>
                            <div className="ReviewsDisplay">
                                <Typography variant="h5" style={{textAlign:"left", paddingLeft:"1vw", paddingBottom:"2vh"}}>Recent reviews</Typography>
                                <ProfileReviewsDisplay/>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(Profile);