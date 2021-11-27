import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { dispatch_to_props, FullProps, state_to_props } from "../../redux/redux";
import { Collection } from "../../types/types";


function ProfileCollectionDisplay(Props : FullProps) {
    const [collections, setCollections] = useState<Collection[]>()

    useEffect(() => {
        if(!collections) {
            //pedir collections
        }
    }, [collections])

    return (
        <div>
            <Grid container>
                {collections?.map( (col, i) => (
                    <Grid item>
                        <p>{col.name}</p>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(ProfileCollectionDisplay)