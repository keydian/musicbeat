import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { dispatch_to_props, FullProps, state_to_props } from "../redux/redux";
import { User } from "../types/types";
import '../styles/Profile.css'
import { Avatar } from "@mui/material";
import { getUser } from "../axios/axios";


function Profile(Props: FullProps) {
    let pathParams = useParams();
    let navigate = useNavigate();
    const avatarFolder = process.env.PUBLIC_URL + "/avatar/";

    const [user, setUser] = useState<User>()

    useEffect(() => {
        if (pathParams.username) {
            getUser(pathParams.username).then(
                (res) => {
                    console.log(res.data)
                }
            ).catch(
                (err) => {
                    if (err.response) {
                        console.log(err.response)
                        alert(err.response.data.message)
                    }
                }
            )
        }
    }, [pathParams])


    return (
        <div>
            <div className="UserBanner">
                <img
                    src={avatarFolder + 'defaultavatar.png'}
                    alt="defaultavatar-logo"
                    className="defaultavatar"
                >
                </img>
                <div className="UserInfo">
                    <p>{pathParams.username}</p>
                    <p>4 Collections | 6 Reviews</p>
                </div>
                <div className="OtherInfo">
                    <p>LINKED ACCOUNTS</p>
                </div>
            </div>
            <div className="LowerPartWrapper">
                <div className="CollectionsDisplay">

                </div>
                <div className="ReviewsDisplay">

                </div>

            </div>
        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(Profile);