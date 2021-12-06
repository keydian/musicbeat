import { Alert, Box, Button, IconButton, Modal, Snackbar, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { connect } from "react-redux";
import { dispatch_to_props, state_to_props } from "../../redux/redux";
import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';
import '../../styles/collection/CreateCollection.css'
import { CreateCollection } from "../../types/types";
import ImageIcon from '@mui/icons-material/Image';
import { createCollection, uploadPicture } from "../../axios/axios";
import { useNavigate } from "react-router";
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface CreateColInterface {
    mode: string
}

function CreateCollectionModal(Props: CreateColInterface) {
    let navigate = useNavigate();
    const [createCol, setCreateCol] = useState<CreateCollection>({ name: "", description: "", imageUrl: "" })
    const [open, setOpen] = useState<boolean>(false)
    const [opensnack, setOpensnack] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)


    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setCreateCol({ name: "", description: "", imageUrl: "" })
        setError(false)
        setOpensnack(false)
    }
    const handleCloseSnack = () => setOpensnack(false);



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
        }
    }

    const uploadFile = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            uploadPicture(event.target.files[0]).then(
                res => {
                    console.log(res.data)
                    setCreateCol({ ...createCol, imageUrl: res.data })
                    setOpensnack(true)
                }
            ).catch(
                err => {
                    event.target.files = null
                    if (err.response) {
                        console.log(err.response)
                    }
                }
            );
        }
    }


    const canCreate = () => {
        if (createCol.name === undefined || createCol.name.trim() === '') {
            return false;
        }
        return true;
    }

    const createColRequest = () => {
        if (canCreate()) {
            createCollection(createCol).then(
                res => {
                    console.log("Collection created")
                    navigate("/mycollections")
                }
            ).catch(
                err => {
                    if (err.response) {
                        console.log(err.response)
                    }
                }
            )
        } else {
            setError(true)
        }
    }

    return (
        <div className="createColWrapper">
            {
                Props.mode === 'button' ? (
                    <Button
                        startIcon={<AddBoxSharpIcon />}
                        variant="contained"
                        className="createColButton"
                        onClick={handleOpen}>
                        Collection
                    </Button>
                ) : (
                    <IconButton onClick={handleOpen} style={{ top: "40%", color: "black" }} size="large">
                        <AddCircleIcon fontSize="large" />
                    </IconButton>
                )
            }

            <Modal
                open={open}
                onClose={handleClose}
            >
                <>
                    <Snackbar open={opensnack} autoHideDuration={3000} onClose={handleCloseSnack}>
                        <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
                            Image uploaded with success!
                        </Alert>
                    </Snackbar>
                    <Box sx={style}>
                        <div className="BoxDiv">
                            <div className="UploadWrapper">
                                <input
                                    id="file"
                                    name="file"
                                    style={{ display: 'none' }}
                                    type="file"
                                    accept="image/*"
                                    onChange={uploadFile}
                                ></input>
                                <label htmlFor="file">
                                    {
                                        createCol.imageUrl !== '' && createCol.imageUrl !== undefined && (
                                            <>
                                                <img
                                                    src={createCol.imageUrl}
                                                    alt="collectionpic"
                                                    className="mycollectionpic"
                                                >
                                                </img>
                                            </>
                                        )
                                    }
                                    <Typography variant="h6">Upload Here</Typography>
                                    <IconButton aria-label="Upload Picture" component="span">
                                        <ImageIcon fontSize="large" />
                                    </IconButton>
                                </label>
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
                                    onChange={(e) => {
                                        changeCreateCol(e)
                                    }}
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
                                        onClick={createColRequest}
                                        style={{ backgroundColor: "rgba(215, 223, 217, 0.377)", color: "black", border: "1px solid black" }}
                                    >
                                        <Typography variant="button">Create</Typography>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Box>
                </>
            </Modal>
        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(CreateCollectionModal)
