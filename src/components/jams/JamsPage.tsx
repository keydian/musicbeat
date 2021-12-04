import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { dispatch_to_props, FullProps, state_to_props } from "../../redux/redux";
import '../../styles/jams/JamsPage.css'
import JamsPageDisplay from "./JamsPageDisplay";


function JamsPage(Props: FullProps) {
    let navigate = useNavigate()
    const [redirect, setRedirect] = useState<boolean>(false)

    /*
    useEffect(() => {
        if (Props.jam !== undefined && Props.jam.trim() !== "") {
            navigate("/jam/"+Props.jam)
        }
    }, [Props])
    */

    useEffect(() => {
        if(redirect) {
            navigate("/jam/"+Props.jam)
        }
        if(Props.jam !== undefined && Props.jam.trim() !== "") {
            setRedirect(true)
        }
    }, [redirect, Props])

    return (
        <div className="JamsPageWrapper">
            {
                !redirect && (
                    <>
                        <div className="JamPageHeader">
                            <Typography variant="h4">Ongoing Jams</Typography>
                        </div>
                        <div className="JamDisplayWrapper">
                            <JamsPageDisplay fProps={Props} />
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(JamsPage)