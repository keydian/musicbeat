import '../../styles/jams/LikeButtons.css'
import { useState } from "react"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Button } from "@mui/material";

function LikeButtons() {
    const [likes, setLikes] = useState<number>(12)
    const [dislikes, setDislikes] = useState<number>(4)
    const [liked, setLiked] = useState<boolean>(false)
    const [disliked, setDisliked] = useState<boolean>(false)

    const like = () => {
        if (!liked && !disliked) {
            setLikes((likes) => likes + 1)
            setLiked(true)
        } else if (liked) {
            setLikes(12)
            setLiked(false)
        }
    }

    const dislike = () => {
        if (!liked && !disliked) {
            setDislikes((dislikes) => dislikes + 1)
            setDisliked(true)
        } else if (disliked) {
            setDislikes(4)
            setDisliked(false)
        }
    }

    return (
        <div className="MusicLikes">
            <div style={{marginLeft:"auto", paddingRight:"2vw"}}>
                <Button
                    variant="contained"
                    startIcon={<ThumbUpIcon />}
                    style={{ backgroundColor: "rgb(106, 90, 205,0.5)" }}
                    onClick={like}
                >
                    {likes}
                </Button>
                <Button
                    variant="contained"
                    startIcon={<ThumbDownIcon />}
                    style={{ backgroundColor: "rgb(106, 90, 205,0.5)", marginLeft:"1vw" }}
                    onClick={dislike}
                >
                    {dislikes}
                </Button>
            </div>

        </div>
    )
}

export default LikeButtons