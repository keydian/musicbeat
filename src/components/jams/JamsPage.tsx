import { Typography } from "@mui/material";
import { connect } from "react-redux";
import { dispatch_to_props, FullProps, state_to_props } from "../../redux/redux";
import '../../styles/jams/JamsPage.css'
import JamsPageDisplay from "./JamsPageDisplay";


function JamsPage(Props : FullProps) {


    return (
        <div className="JamPageWrapper">
            <div className="JamPageHeader">
                <Typography variant="h4">Ongoing Jams</Typography>
            </div>
            <div className="JamDisplayWrapper">
                <JamsPageDisplay fProps={Props} />
            </div>  
        </div>
    )
}

export default connect(state_to_props,dispatch_to_props)(JamsPage)