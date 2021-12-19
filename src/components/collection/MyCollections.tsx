import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { dispatch_to_props, FullProps, state_to_props } from "../../redux/redux";
import '../../styles/collection/MyCollections.css'
import MyCollectionsDisplay from "./MyCollectionsDisplay";


function MyCollections(Props: FullProps) {
    let usernamePath = useParams().username
    const [username, setUsername] = useState<string>('')

    useEffect(() => {
        if (usernamePath && (username === undefined || username.trim() === '' || username !== usernamePath)) {
            setUsername(usernamePath)
        }
    }, [username, usernamePath])

    return (
        <div className="MyCollectionsWrapper">
            {
                username && (
                    <div className="CollectionsDisplayWrapper">
                        <MyCollectionsDisplay fProps={Props} targetUser={username} />
                    </div>
                )
            }
        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(MyCollections)