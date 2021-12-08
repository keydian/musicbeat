import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { dispatch_to_props, FullProps, state_to_props } from "../../redux/redux";
import { connect } from "react-redux";
import { User } from "../../types/types";
import { calcTotalPages} from "../utils/funcs";
import {getUsersPage} from "../../axios/axios"
import { ListItemText,
    ListItemSecondaryAction,
    ListItemAvatar,
    ListItem,
    Divider,
    Avatar,
    List} from "@mui/material"
import Pagination from '@mui/material/Pagination';

interface SearchProps{
    Props : FullProps,
    val: string
}

function SearchUsers(sProps: SearchProps){
    
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(5);
    const [dense, setDense] = useState<boolean>(false);

    let navigate = useNavigate();

    const usersPerPage = 5;

    const changePage = (
        eventReact: React.ChangeEvent<unknown>,
        pageNum: number
    )=>{
        setPage(pageNum);
    };

    useEffect(() => {
        if (sProps.Props.isLogged) {
          getUsersPage(sProps.val, page - 1, usersPerPage).then(
            (response) => {
              setUsers(response.data.content);
              setTotalPages(calcTotalPages(response.data.total, usersPerPage));
            },
            (error) => {
              console.log(error);
            }
          );
        }
      }, [sProps.Props.isLogged, page]);


    return(
        <div>
            <List dense={dense}>
                {users.map((user) => (
                    <>
                    <ListItem key = {user.username}>
                    <ListItemAvatar className="avatar-holder" key={user.username + "-avatar"}>
                    <Avatar className={"Avatar Clickable"} sx={{ marginTop: "1vw" }} onClick={()=> navigate('/profile/'+user.username)}/>
                    </ListItemAvatar>
                        <ListItemText
                          key={user.username + "-text"}
                          style={{ marginLeft: "2vh" }}
                          primary={user.username}
                        />
                    </ListItem>
                    <Divider/>
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

export default connect(dispatch_to_props, state_to_props)(SearchUsers);