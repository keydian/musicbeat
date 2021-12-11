import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { dispatch_to_props, FullProps, state_to_props } from "../../redux/redux";
import { connect } from "react-redux";
import { User } from "../../types/types";
import { calcTotalPages } from "../utils/funcs";
import { getUsersPage } from "../../axios/axios"
import {
  ListItemText,
  ListItemSecondaryAction,
  ListItemAvatar,
  ListItem,
  Divider,
  Avatar,
  List
} from "@mui/material"
import Pagination from '@mui/material/Pagination';

interface SearchProps {
  Props: FullProps,
  by: string,
  valForChild: string
}

function SearchUsers(sProps: SearchProps) {

  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(5);
  const [dense, setDense] = useState<boolean>(false);

  let navigate = useNavigate();

  const usersPerPage = 5;

  const changePage = (
    eventReact: React.ChangeEvent<unknown>,
    pageNum: number
  ) => {
    setPage(pageNum);
  };

  useEffect(() => {
    console.log("Request done")
    getUsersPage(sProps.by, sProps.valForChild, page, usersPerPage).then(
      (response) => {
        console.log(response.data.content)
        setUsers(response.data.content);
        setTotalPages(calcTotalPages(response.data.total, usersPerPage));
      },
      (error) => {
        console.log(error);
      }
    );
  }, [page, sProps.valForChild]);

  return (
    <div>
      <List dense={dense}>
        {users.map((user) => (
          <>
            <ListItem key={user.name}>
              <ListItemAvatar className="avatar-holder" key={user.name + "-avatar"}>
                <Avatar className={"Avatar Clickable"} sx={{ marginTop: "1vw" }} onClick={() => navigate('/profile/' + user.name)} />
              </ListItemAvatar>
              <ListItemText
                key={user.name + "-text"}
                style={{ marginLeft: "2vh" }}
                primary={user.name}
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

export default connect(state_to_props, dispatch_to_props)(SearchUsers);