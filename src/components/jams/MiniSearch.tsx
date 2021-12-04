import { Divider, IconButton, List, ListItem, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { searchSongs } from '../../axios/axios'
import '../../styles/jams/MiniSearch.css'
import { Song } from '../../types/types'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

interface MiniSearchInterface {
    addCallback : Function
}

function MiniSearch(props : MiniSearchInterface) {
    const [search, setSearch] = useState<string>()
    const [subSearch, setSubsearch] = useState<number>(0)
    const [results, setResults] = useState<Song[]>([])

    useEffect(() => {
        if (search && search !== '' && search.trim() !== '') {
            searchSongs("name", search, 0, 20).then(
                res => {
                    setResults(res.data.content)
                }
            ).catch(
                err => {
                    if (err.response) {
                        console.log(err.response)
                    }
                }
            )
        }
    }, [subSearch])


    const submitSearch = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            setSubsearch((subSearch) => subSearch + 1);
        }
    };

    const changeInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        setSearch(value)
        if(value === '' && value.trim() === '') {
            setResults([])
        }
    }

    return (
        <div className="MiniSearchWrapper">
            <div className="MiniSearchBar">
                <TextField
                    id="minisearchinput"
                    className="Minisearchinput"
                    label="Songs (case sensitive)"
                    variant="filled"
                    onKeyPress={(e) => {
                        submitSearch(e)
                    }}
                    onChange={(e) => {
                        changeInput(e)
                    }} 
                    sx={{backgroundColor:"rgb(255, 255, 255, 0.5)"}}/>
                <IconButton onClick={(e) => { setSubsearch((subSearch) => subSearch + 1); }}>
                    <SearchIcon />
                </IconButton>
            </div>
            {
                results.length > 0 && (
                    <List
                        sx={{
                            width: '100%',
                            bgcolor: 'rgb(106, 90, 205,0.5)',
                            position: 'relative',
                            alignItems: 'center',
                            maxHeight: 100,
                            overflow: 'auto',
                            padding: "0",
                            borderRadius:"0px 0px 0px 10px"
                        }}
                    >
                        {results.map((s, i) => (
                            <ListItem className="MiniSearchSongItem" key={s.id}>
                                <div className="MiniSearchSongInfo">
                                    <Typography variant="subtitle1">{s.name} - {s.artist}</Typography>
                                </div>
                                <IconButton onClick={() => {
                                    props.addCallback(s)
                                }}>
                                    <AddIcon />
                                </IconButton>
                                {
                                    i < results.length - 1 && (
                                        <Divider />
                                    )
                                }
                            </ListItem>
                        ))}
                    </List>
                )
            }
        </div>
    )
}

export default MiniSearch