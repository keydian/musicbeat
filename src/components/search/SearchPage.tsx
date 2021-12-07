import {dispatch_to_props, FullProps, state_to_props} from "../../redux/redux";
import {connect} from "react-redux";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search'
import { FormControl, InputLabel, NativeSelect, FormHelperText, TextField, InputAdornment } from "@mui/material";


const [searchBy, setBy] = useState<string>("Song");
const [search, setSearch] = useState<number>(0);
const [val, setVal] = useState<string>("");


const setSearchBy= (
    eventReact: React.ChangeEvent<unknown>,
    newBy: string ) =>{
        setBy(newBy);
    }
;

const submitSearch = () =>{
    setSearch((search) => search+1)
}
;


//TODO: SEPARATE LISTING COMPONENTS, PAGINATION

function SearchPage(Props: FullProps){
    return(
        <div className="searchPage">
            <div className="searchBody">
                <FormControl className="selectForm">
                    <InputLabel htmlFor="by-helper">
                        Search By:
                    </InputLabel>
                    <NativeSelect
                    value={searchBy}
                    onChange={(e)=>setSearchBy(e, e.target.value)}
                    inputProps={{
                        name: "Search by:",
                        id:"by-helper"
                    }}
                    >
                        <option value={"Songs"}>Songs</option>
                        <option value={"Album"}>Album</option>
                        <option value={"Users"}>Users</option>
                        <option value ={"Collections"}>Collections</option>
                    </NativeSelect>
                    <FormHelperText>
                        Select your preferred search method:
                    </FormHelperText>
                </FormControl>
            </div>
            <div>
                <TextField
                className="searchTextField"
                id="searchbar"
                type="search"
                style={{textAlign:"center"}}
                inputProps={{
                    startAdornment:(
                        <InputAdornment position="start">
                            <SearchIcon
                            style={{cursor:"pointer"}}
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
                onKeyPress={(e)=>{
                    if(e.key==="Enter"){
                        submitSearch();
                    }
                }}
                />
            </div>
        </div>
    )
}

export default connect(dispatch_to_props, state_to_props)(SearchPage);