import { TextField } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { searchSongs } from '../../axios/axios'
import '../../styles/jams/MiniSearch.css'
import { SongMinimal } from '../../types/types'

function MiniSearch() {
    const [search, setSearch] = useState<string>()
    const [results, setResults] = useState<SongMinimal>()

    useEffect(() => {
        if(search && search !== '' && search.trim() !== '') {
            searchSongs("name",search,0,3).then(
                res => {

                }
            ).catch(
                err => {
                    
                }
            )
        }
    }, [search])

    const changeInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        setSearch(value)
    }

    return (
        <div className="MiniSearchWrapper">
            <TextField
                required
                id="minisearchinput"
                className="Minisearchinput"
                label="Songs..."
                variant="filled"
                onChange={(e) => {
                    changeInput(e)
                }} />
        </div>
    )
}

export default MiniSearch