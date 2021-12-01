import { useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router'
import { dispatch_to_props, FullProps, state_to_props } from '../../redux/redux'
import '../../styles/jams/JamsPageDisplay.css'
import { Jam } from '../../types/types'

interface JamPageInterface {
    fProps: FullProps,
}

function JamsPageDisplay(Props : JamPageInterface) {
    const [jams, setJams] = useState<Jam[]>()
    const [page, setPage] = useState<number>(0)
    const defaultImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
    const pageSize = 8;
    let navigate = useNavigate()
    
    return (
        <div className="JamDisplayGridWrapper">

        </div>
    )
}

export default connect(state_to_props,dispatch_to_props)(JamsPageDisplay)