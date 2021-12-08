import { dispatch_to_props, FullProps, state_to_props } from "../../redux/redux";
import { connect } from "react-redux";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search'
import { FormControl, InputLabel, NativeSelect, FormHelperText, TextField, InputAdornment } from "@mui/material";
import SearchUsers from "../search/SearchUsers";
import SearchSongs from "../search/SearchSongs";
import SearchAlbums from "../search/SearchAlbums";


function SearchPage(Props: FullProps) {


    const [searchBy, setBy] = useState<string>("Songs");
    const [constraint, setConstraint] = useState<string>("All");
    const [search, setSearch] = useState<number>(0);
    const [val, setVal] = useState<string>("");


    const setSearchBy = (
        eventReact: React.ChangeEvent<unknown>,
        newBy: string) => {
        setBy(newBy);
    }
        ;

    const setSearchConstraint = (
        eventReact: React.ChangeEvent<unknown>,
        searchConstraint: string) => {
        setConstraint(searchConstraint);
    }

    const submitSearch = () => {
        setSearch((search) => search + 1)
    }
        ;

    return (
        <div className="searchPage">
            <div className="searchBody">
                <FormControl className="selectForm">
                    <InputLabel htmlFor="by-helper">
                        Search By:
                    </InputLabel>
                    <NativeSelect
                        value={searchBy}
                        onChange={(e) => setSearchBy(e, e.target.value)}
                        inputProps={{
                            name: "Search by:",
                            id: "by-helper"
                        }}
                    >
                        <option value={"Songs"}>Songs</option>
                        <option value={"Album"}>Album</option>
                        <option value={"Users"}>Users</option>
                    </NativeSelect>
                    <FormHelperText>
                        Select your preferred search method:
                    </FormHelperText>
                </FormControl>
                {searchBy === "Songs" &&
                    <FormControl className="selectForm">
                        <InputLabel htmlFor="by-helper">
                            Search By:
                        </InputLabel>
                        <NativeSelect
                            value={constraint}
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
            <div>
                <TextField
                    className="searchTextField"
                    id="searchbar"
                    type="search"
                    style={{ textAlign: "center" }}
                    inputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        submitSearch();
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
            </div>
            {searchBy === "Users" &&
                <div>
                    <SearchUsers
                        by={"name"}
                        val={val}
                        Props={Props}
                    />
                </div>
            }
            {searchBy === "Songs" &&
                <div>
                    <SearchSongs
                        Props={Props}
                        by={constraint}
                        val={val}
                    />
                </div>
            }
            {searchBy === "Albums" &&
                <div>
                    <SearchAlbums

                    />
                </div>
            }
        </div>
    )
}

export default connect(dispatch_to_props, state_to_props)(SearchPage);