import { Typography } from "@mui/material"
import { connect } from "react-redux"
import { dispatch_to_props, state_to_props } from "../../redux/redux"
import '../../styles/songs/SongTabDisplay.css'
import { Album } from "../../types/types"
import MusicNoteIcon from '@mui/icons-material/MusicNote';

interface SongTabDisplayInt {
    tabval: number,
    album: Album
}

const reviews = [
    {
        title: "A great song",
        author: "author-here",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent augue neque, pulvinar et tortor nec, blandit finibus metus. Curabitur eros magna, feugiat a varius ut, facilisis dignissim tellus. Suspendisse potenti. Maecenas imperdiet ac enim at suscipit. Cras tempus et ex quis faucibus. Quisque bibendum mattis sapien vel consectetur. In hac habitasse platea dictumst. Donec id justo orci. Suspendisse elementum odio quis imperdiet mollis. Nam vulputate magna a nibh dictum lacinia. In commodo nec enim eget venenatis. Aenean blandit lacus aliquam, ornare purus quis, pretium nulla. Aliquam imperdiet justo a elit volutpat, at sodales odio fringilla. In hac habitasse platea dictumst. Etiam mollis quam euismod neque volutpat dapibus. ",
        rating: 8.0
    },
    {
        title: "A great song 2",
        author: "author-here",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent augue neque, pulvinar et tortor nec, blandit finibus metus. Curabitur eros magna, feugiat a varius ut, facilisis dignissim tellus. Suspendisse potenti. Maecenas imperdiet ac enim at suscipit. Cras tempus et ex quis faucibus. Quisque bibendum mattis sapien vel consectetur. In hac habitasse platea dictumst. Donec id justo orci. Suspendisse elementum odio quis imperdiet mollis. Nam vulputate magna a nibh dictum lacinia. In commodo nec enim eget venenatis. Aenean blandit lacus aliquam, ornare purus quis, pretium nulla. Aliquam imperdiet justo a elit volutpat, at sodales odio fringilla. In hac habitasse platea dictumst. Etiam mollis quam euismod neque volutpat dapibus. ",
        rating: 2.0
    },
    {
        title: "A great song 3",
        author: "author-here",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent augue neque, pulvinar et tortor nec, blandit finibus metus. Curabitur eros magna, feugiat a varius ut, facilisis dignissim tellus. Suspendisse potenti. Maecenas imperdiet ac enim at suscipit. Cras tempus et ex quis faucibus. Quisque bibendum mattis sapien vel consectetur. In hac habitasse platea dictumst. Donec id justo orci. Suspendisse elementum odio quis imperdiet mollis. Nam vulputate magna a nibh dictum lacinia. In commodo nec enim eget venenatis. Aenean blandit lacus aliquam, ornare purus quis, pretium nulla. Aliquam imperdiet justo a elit volutpat, at sodales odio fringilla. In hac habitasse platea dictumst. Etiam mollis quam euismod neque volutpat dapibus. ",
        rating: 5.0
    }
]

function SongTabDisplay(props: SongTabDisplayInt) {

    return (
        <div className="SongTabDisplayWrapper">
            {
                props.tabval === 0 && (
                    <div className="CriticsDisplay">
                        {
                            reviews.map((r, i) => (
                                <>
                                    {
                                        i < 2 && (
                                            <div className="ReviewWrapper">
                                                <div className="ReviewHeader">
                                                    <div className="ReviewAuthorTitle">
                                                        <Typography variant="h6">{r.title}</Typography>
                                                        <Typography
                                                            variant="subtitle1"
                                                            style={{ color: "rgba(52, 52, 52, 0.8)" }}
                                                        >by {r.author}</Typography>
                                                    </div>
                                                    <Typography
                                                        variant="h6"
                                                        style={{ marginLeft: "auto" }}
                                                    >
                                                        {r.rating.toFixed(1)}/10<MusicNoteIcon/>Beats
                                                    </Typography>
                                                </div>
                                                <div className="ReviewContentWrapper">
                                                    <Typography variant="body1">{r.content}</Typography>
                                                </div>
                                            </div>
                                        )
                                    }
                                </>
                            ))
                        }
                    </div>
                )
            }
            {
                props.tabval === 1 && (
                    <div className="LyricsAndInfoDisplay">
                        <Typography style={{textAlign:"left"}} variant="body1">other-info-here</Typography>
                    </div>
                )
            }
        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(SongTabDisplay)