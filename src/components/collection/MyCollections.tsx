import { Typography } from "@mui/material";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { dispatch_to_props, FullProps, state_to_props } from "../../redux/redux";
import '../../styles/collection/MyCollections.css'
import MyCollectionsDisplay from "./MyCollectionsDisplay";


function MyCollections(Props: FullProps) {
    let navigate = useNavigate()

    return (
        <div className="MyCollectionsWrapper">
            <div className="MyColTitleWrapper">
                <Typography variant="h4">My Collections</Typography>
            </div>
            <div className="CollectionsDisplayWrapper">
                <MyCollectionsDisplay {...Props}/>
            </div>    
        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(MyCollections)