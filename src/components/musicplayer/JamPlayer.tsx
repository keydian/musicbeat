import { useEffect, useState } from 'react'
import ReactJkMusicPlayer from 'react-jinke-music-player'
import { Song, SongList } from '../../types/types'
import '../../styles/MusicPlayer.css'

interface JamPlayer {
    currSong : SongList
}

interface PlayerSong {
    name: string,
    singer: string,
    cover: string,
    musicSrc: string
}

function JamPlayer (Props : JamPlayer) {
    const [songs, setSongs] = useState<PlayerSong[]>([]) 
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
        if(songs.length === 0 && Props) {
            setSongs([...songs, {
                name:Props.currSong.name, 
                singer:Props.currSong.artist,
                cover:Props.currSong.imageUrl,
                musicSrc:getSrc(Props.currSong)}])
            
        } 
    }, [songs])

    const getSrc = (s : SongList) => {
        return process.env.PUBLIC_URL + "/musicPlayer/" + s.id+".mp3"
    }


    return(
        <div>
            {
                 songs.length > 0 && (
                    <ReactJkMusicPlayer
                    getAudioInstance={(instance)=>{
                    }}
                    autoPlay ={false}
                    autoHiddenCover={false}
                    audioLists={songs}
                    mode="full"
                    showThemeSwitch ={false}
                    showDownload = {false}
                    remove={false} />
                 )
            }
           
        </div>
    )
       
}
export default JamPlayer;