import { Typography } from "@mui/material";
import { connect } from "react-redux";
import { dispatch_to_props, FullProps, state_to_props } from "../../redux/redux";
import '../../styles/profile/ProfileReviewsDisplay.css'
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function ReviewsDisplay(Props: FullProps) {


    return (
        <div>
            <div className="ReviewsWrapper">
                <div className="SmallReview">
                    <div className="SmallReviewHeader">
                        <div className="SongImg">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/pt/thumb/a/a6/Oasis_-_%28What%27s_the_Story%29_Morning_Glory%3F.jpg/220px-Oasis_-_%28What%27s_the_Story%29_Morning_Glory%3F.jpg"
                                alt="defaultavatar-logo"
                                className="SongImg2"
                            >
                            </img>
                        </div>
                        <div className="SongHeaderTitle">
                            <Typography variant="h5">Wonderwall</Typography>
                            <Typography variant="subtitle1">Oasis</Typography>
                        </div>
                        <div className="ReviewRating">
                            <Typography variant="h6">9.0</Typography>
                            <MusicNoteIcon fontSize="large"/>
                        </div>
                    </div>
                    <div className="ReviewBody">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget nulla id dolor cursus molestie ut non sem. Nunc orci mi, varius vel pellentesque vel, maximus id urna. In eget pulvinar risus. Nullam aliquet nisl at nulla aliquet, nec laoreet ipsum tincidunt. Sed dictum, justo nec maximus finibus, enim nisi mollis eros, eu dapibus tellus mi ac enim.</p>
                    </div>

                </div>
                <div className="SmallReview">
                    <div className="SmallReviewHeader">
                        <div className="SongImg">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/pt/7/73/Capa_de_Despacito.jpeg"
                                alt="defaultavatar-logo"
                                className="SongImg2"
                            >
                            </img>
                        </div>
                        <div className="SongHeaderTitle">
                            <Typography variant="h5">Despacito</Typography>
                            <Typography variant="subtitle1">Luis Fonsi</Typography>
                        </div>
                        <div className="ReviewRating">
                            <Typography variant="h6">2.0</Typography>
                            <MusicNoteIcon fontSize="large"/>
                        </div>
                    </div>
                    <div className="ReviewBody">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget nulla id dolor cursus molestie ut non sem. Nunc orci mi, varius vel pellentesque vel, maximus id urna. In eget pulvinar risus. Nullam aliquet nisl at nulla aliquet, nec laoreet ipsum tincidunt. Sed dictum, justo nec maximus finibus, enim nisi mollis eros, eu dapibus tellus mi ac enim. eu dapibus tellus mi ac enim. eu dapibus tellus mi ac enim. eu dapibus tellus mi ac enim. eu dapibus tellus mi ac enim.</p>
                    </div>
                </div>
                <KeyboardArrowDownIcon fontSize="large" htmlColor="grey"/>
            </div>
            
        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(ReviewsDisplay)