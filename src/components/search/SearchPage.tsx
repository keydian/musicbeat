import { dispatch_to_props, FullProps, state_to_props } from "../../redux/redux";
import { connect } from "react-redux";
import React, { useState } from "react";
import '../../styles/search/SearchPage.css'
import SearchIcon from '@mui/icons-material/Search'
import { FormControl, InputLabel, NativeSelect, FormHelperText, TextField, InputAdornment } from "@mui/material";
import SearchUsers from "../search/SearchUsers";
import SearchSongs from "../search/SearchSongs";
import SearchAlbums from "../search/SearchAlbums";


function SearchPage(Props: FullProps) {

    const [searchBy, setBy] = useState<string>("Songs");
    const [constraint, setConstraint] = useState<string>("all");
    //const [search, setSearch] = useState<number>(0);
    const [val, setVal] = useState<string>("");
    const [valForChild, setValForChild] = useState<string>("");

    const setSearchBy = (
        eventReact: React.ChangeEvent<unknown>,
        newBy: string) => {
        setBy(newBy);
    };

    const setSearchConstraint = (
        eventReact: React.ChangeEvent<unknown>,
        searchConstraint: string) => {
        setConstraint(searchConstraint);
    }

    const submitSearch = () => {
        setValForChild(val)
        console.log('do validate2 ' + val)
        //setSearch((search) => search + 1)
    };

    return (
        <div className="searchPageWrapper">
            {
                Props.isLogged && (
                    <>
                        <div className="searchBody">
                            
                            {constraint !== "all" &&
                                <TextField
                                    className="searchTextField"
                                    id="searchbar"
                                    type="search"
                                    style={{ textAlign: "center" }}
                                    inputProps={{
                                        startAdornment: (
                                            <InputAdornment position="end">
                                                <SearchIcon
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => {
                                                        //submitSearch(e.target.value);
                                                        console.log('do validate1')
                                                    }}
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={(e) => {
                                        setVal(e.target.value);
                                    }}
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            submitSearch();
                                        }
                                    }}
                                />
                            }
                            <FormControl className="selectForm">
                                <InputLabel htmlFor="by-helper">
                                    Search For:
                                </InputLabel>
                                <NativeSelect
                                    value={searchBy}
                                    style={{ marginLeft: "3vh"}}
                                    onChange={(e) => { setSearchBy(e, e.target.value); setValForChild(""); setConstraint("all") }}
                                    inputProps={{
                                        name: "Search by:",
                                        id: "by-helper"
                                    }}
                                >
                                    <option value={"Songs"}>Songs</option>
                                    <option value={"Albums"}>Album</option>
                                    <option value={"Users"}>Users</option>
                                </NativeSelect>
                            </FormControl >
                            {searchBy !== "Users" &&
                                <FormControl className="selectForm">
                                    <InputLabel htmlFor="by-helper">
                                        By:
                                    </InputLabel>
                                    <NativeSelect
                                        value={constraint}
                                        style={{ marginLeft: "3vh"}}
                                        onChange={(e) => setSearchConstraint(e, e.target.value)}
                                        inputProps={{
                                            name: "Search by:",
                                            id: "constraint-helper"
                                        }}
                                    >
                                        <option value={"all"}>All</option>
                                        <option value={"artist"}>Artist</option>
                                        <option value={"name"}>Name</option>
                                    </NativeSelect>
                                </FormControl>
                            }
                        </div>
                        
                        {searchBy === "Users" &&
                            <div className="searchResults">
                                <SearchUsers
                                    by={"all"}
                                    valForChild={valForChild}
                                    Props={Props}
                                />
                            </div>
                        }
                        {searchBy === "Songs" &&
                            <div className="searchResults">
                                <SearchSongs
                                    Props={Props}
                                    by={constraint}
                                    valForChild={valForChild}
                                />
                            </div>
                        }
                        {searchBy === "Albums" &&
                            <div className="searchResults">
                                <SearchAlbums
                                    Props={Props}
                                    by={constraint}
                                    valForChild={valForChild}
                                />
                            </div>
                        }
                    </>
                )
            }

        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(SearchPage);