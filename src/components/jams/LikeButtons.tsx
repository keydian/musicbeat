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
        if (liked) {
            setLikes(12)
            setLiked(false)
        } else if (disliked) {
            setDisliked(false)
            setLiked(true)
            setLikes((likes) => likes + 1)
            setDislikes((likes) => likes - 1)
        } else{
            setLikes((likes) => likes + 1)
            setLiked(true)
        }
    }

    const dislike = () => {
        if (disliked) {
            setDislikes(4)
            setDisliked(false)
        } else if (liked) {
            setDisliked(true)
            setLiked(false)
            setLikes((likes) => likes - 1)
            setDislikes((likes) => likes + 1)
        }else{
            setDislikes((dislikes) => dislikes + 1)
            setDisliked(true)
        }
    }

    const likedColor = () => {
        if (liked) {
            return 'rgb(159, 78, 162)'
        }
        return 'white'
    }

    const dislikedColor = () => {
        if (disliked) {
            return 'rgb(159, 78, 162)'
        }
        return 'white'
    }

    return (
        <div className="MusicLikes">
            <div style={{ marginLeft: "auto", paddingRight: "2vw" }}>
                <Button
                    variant="contained"
                    startIcon={<ThumbUpIcon />}
                    style={{ backgroundColor: "rgb(106, 90, 205,0.5)", color:likedColor() }}
                    onClick={like}
                >
                    {likes}
                </Button>
                <Button
                    variant="contained"
                    startIcon={<ThumbDownIcon />}
                    style={{ backgroundColor: "rgb(106, 90, 205,0.5)", marginLeft: "1vw", color:dislikedColor() }}
                    onClick={dislike}
                >
                    {dislikes}
                </Button>
            </div>

        </div>
    )
}

export default LikeButtons