import ReactJkMusicPlayer from 'react-jinke-music-player'
import '../styles/MusicPlayer.css'

function MusicPlayer () {

    const songCover = process.env.PUBLIC_URL + "/musicPlayer/Singularity Cover Concept 3.jpg";
    const song = process.env.PUBLIC_URL + "/musicPlayer/Cardossii & K-DN - Singularity.mp3"


    const audioList= [
        {
            name: "Singularity",
            singer: "K-DN",
            cover: songCover,
            musicSrc: song,
        }
    ]


    return(
        <div>
            <ReactJkMusicPlayer
            getAudioInstance={(instance)=>{
            }}
            audioLists={audioList}
            mode="full"
            toggleMode = {false}
            showThemeSwitch ={false}
            showDownload = {false}
            remove={false}
            />
        </div>
    )
       
}
export default MusicPlayer;