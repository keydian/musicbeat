import ReactJkMusicPlayer from 'react-jinke-music-player'
import '../styles/MusicPlayer.css'

function MusicPlayer () {

    const audioList= [
        {
            name: "Singularity",
            singer: "K-DN",
            cover: process.env.PUBLIC_URL + "/musicPlayer/SingularityCoverConcept3.jpg",
            musicSrc: process.env.PUBLIC_URL + "/musicPlayer/Cardossii & K-DN - Singularity.mp3",
        }
    ]


    return(
        <div>
            <ReactJkMusicPlayer
            getAudioInstance={(instance)=>{
            }}
            autoPlay ={false}
            autoHiddenCover={false}
            audioLists={audioList}
            mode="full"
            showThemeSwitch ={false}
            showDownload = {false}
            remove={false}
            bounds={100}
            />
        </div>
    )
       
}
export default MusicPlayer;