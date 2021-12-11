import { calcTotalPages } from "../utils/funcs";
import { dispatch_to_props, FullProps, state_to_props } from "../../redux/redux";
import { connect } from "react-redux";
import {
    ListItemText,
    ListItem,
    Divider,
    List
} from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Album } from "../../types/types";
import Pagination from '@mui/material/Pagination';
import { searchAlbums } from "../../axios/axios"
import "../../styles/search/SearchPage.css";

interface SearchProps {
    Props: FullProps,
    by: string,
    valForChild: string
}

function SearchAlbums(sProps: SearchProps) {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(5);
    const [dense, setDense] = useState<boolean>(false);

    let navigate = useNavigate();

    const albumsPerPage = 5;

    const changePage = (
        eventReact: React.ChangeEvent<unknown>,
        pageNum: number
    ) => {
        setPage(pageNum);
    };

    useEffect(() => {
        console.log("pedido pog")
        searchAlbums(sProps.by, sProps.valForChild, page - 1, albumsPerPage).then(
            (response) => {
                setAlbums(response.data.content);
                setTotalPages(calcTotalPages(response.data.total, albumsPerPage));
            },
            (error) => {
                console.log(error);
            }
        );
    }, [page, sProps.valForChild, sProps.by === "all"]);


    return (
        <div>
            <List dense={dense}>
                {albums.map((album) => (
                    <>
                        <ListItem key={album.id}>
                            <img src={album.imageUrl} className="songqueuepic"
                                onClick={() => { navigate("/albums/" + album.name) }}
                                style={{ cursor: "pointer" }}>
                            </img>
                            <ListItemText
                                key={album.id + "-text"}
                                style={{ marginLeft: "2vh" }}
                                primary={album.name}
                                secondary={album.artist}
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
                    className="page-sel"
                />
            </div>
        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(SearchAlbums);