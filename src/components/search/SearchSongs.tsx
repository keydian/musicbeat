import { calcTotalPages } from "../utils/funcs";
import { dispatch_to_props, FullProps, state_to_props } from "../../redux/redux";
import { connect } from "react-redux";
import {
    ListItemText,
    ListItemSecondaryAction,
    ListItemAvatar,
    ListItem,
    Divider,
    Avatar,
    List
} from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Song } from "../../types/types";
import Pagination from '@mui/material/Pagination';
import { searchSongs } from "../../axios/axios"

interface SearchProps {
    Props: FullProps,
    by: string,
    val: string
}

function SearchSongs(sProps: SearchProps) {
    const [songs, setSongs] = useState<Song[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(5);
    const [dense, setDense] = useState<boolean>(false);

    let navigate = useNavigate();

    const songsPerPage = 5;

    const changePage = (
        eventReact: React.ChangeEvent<unknown>,
        pageNum: number
    ) => {
        setPage(pageNum);
    };

    useEffect(() => {
        if (sProps.Props.isLogged) {
            searchSongs(sProps.by, sProps.val, page - 1, songsPerPage).then(
                (response) => {
                    setSongs(response.data.content);
                    setTotalPages(calcTotalPages(response.data.total, songsPerPage));
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }, [sProps.Props.isLogged, page]);


    return (
        <div>
            <List dense={dense}>
                {songs.map((song) => (
                    <>
                        <ListItem key={song.id}>
                            <img src={song.imageUrl}>
                            </img>
                            <ListItemText
                                key={song.id + "-text"}
                                style={{ marginLeft: "2vh" }}
                                primary={song.name}
                                secondary={song.artist}
                            />
                        </ListItem>
                        <Divider />
                    </>
                ))}
            </List>
            <div>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={changePage}
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                />
            </div>
        </div>
    )
}

export default connect(dispatch_to_props, state_to_props)(SearchSongs);