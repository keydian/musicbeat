import { useEffect, useState } from "react"
import { getJamSuggested } from "../../axios/axios"
import { Song } from "../../types/types"
import '../../styles/jams/SuggestedGrid.css'
import RefreshIcon from '@mui/icons-material/Refresh';
import { Grid } from "@mui/material";

interface SuggestedGridInterface {
    addCallback: Function,
    jamid: string
}


function SuggestedGrid(Props: SuggestedGridInterface) {
    const [suggested, setSuggested] = useState<Song[]>()

    useEffect(() => {
        if (!suggested) {
            getJamSuggested(Props.jamid).then(
                res => {
                    setSuggested(res.data)
                }
            ).catch(
                err => {
                    if (err.response) {
                        console.log(err.response)
                    }
                }
            )
        }
    }, [suggested])

    return (
        <div className="SuggestedGridWrapper">
            {
                suggested && suggested.length > 0 ? (
                    <>
                        <Grid container spacing={2} columns={2}>
                            {suggested.map((s,i) => (
                                <Grid item xs={1}>
                                    
                                </Grid>
                            ))}
                        </Grid>
                    </>
                ) : (
                    <>
                    </>
                )
            }
        </div>
    )
}

export default SuggestedGrid