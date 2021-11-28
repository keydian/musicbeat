import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { connect } from "react-redux";
import { dispatch_to_props, state_to_props } from "../../redux/redux";
import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';
import '../../styles/collection/CreateCollection.css'
import { CreateCollection } from "../../types/types";
import ImageIcon from '@mui/icons-material/Image';

function CreateCollectionModal() {
    const [createCol, setCreateCol] = useState<CreateCollection>({ name: "", description: "", image: "" })
    const [open, setOpen] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "30%",
        bgcolor: 'rgb(149, 162, 241);',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: "25px"
    };


    const validateInput = (val: String) => {
        if (val === null || val.trim() === '') {
            setError(true)
        } else {
            setError(false)
        }
    }

    const changeCreateCol = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        const id = event.currentTarget.id;
        switch (id) {
            case "createcolname":
                validateInput(value)
                setCreateCol({ ...createCol, name: value })
                break;
            case "createcoldescription":
                setCreateCol({ ...createCol, description: value })
                break;
            case "createcolimg":
                setCreateCol({ ...createCol, image: value })
                break;
        }
    }

    return (
        <div className="createColWrapper">
            <Button
                startIcon={<AddBoxSharpIcon />}
                variant="contained"
                className="createColButton"
                onClick={handleOpen}>
                Collection
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <div className="BoxDiv">
                        <div className="UploadWrapper">
                            <Typography variant="h6">Upload Here</Typography>
                            <ImageIcon fontSize="large" />
                        </div>
                        <div className="InputWrapper">
                            <Typography variant="h6">Your collection's name</Typography>
                            <TextField
                                required
                                error={error}
                                id="createcolname"
                                className="CreatColInput"
                                label="Collection name"
                                variant="filled"
                                onChange={(e) => {
                                    changeCreateCol(e)
                                }} />
                            <Typography variant="h6">Your collection's description</Typography>
                            <TextField
                                required
                                error={error}
                                id="createcoldescription"
                                className="CreatColInput"
                                label="Description"
                                variant="filled"
                            />
                            <div className="InputButtonsWrapper">
                                <Button
                                    className="CreateColInputButton"
                                    variant="outlined"
                                    color="error"
                                    disableElevation={true}
                                    onClick={handleClose}
                                >
                                    <Typography variant="button">Cancel</Typography>
                                </Button>
                                <Button
                                    className="CreateColInputButton"
                                    variant="contained"
                                    style={{ backgroundColor: "rgba(215, 223, 217, 0.377)", color: "black", border: "1px solid black" }}
                                >
                                    <Typography variant="button">Create</Typography>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(CreateCollectionModal)


/*
  const uploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (profileUser && event.target.files) {
      uploadProfilePicture(event.target.files[0], profileUser.username);
    }
  }
  */