import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { uploadPicture } from '../../axios/axios';
import '../../styles/jams/CreateJam.css'
import { CreateJam } from '../../types/types';
import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';
import ImageIcon from '@mui/icons-material/Image';
import { Alert, Box, Button, IconButton, Modal, Snackbar, TextField, Typography } from '@mui/material';
import { FullProps } from '../../redux/redux';
import SelectCollection from '../collection/SelectCollection';

interface CreateJamInterface {
    fProps: FullProps
}

function CreateJamModal(props: CreateJamInterface) {
    let navigate = useNavigate();
    const [create, setCreate] = useState<CreateJam>({ name: "", collectionId: "", imageUrl: "" })
    const [open, setOpen] = useState<boolean>(false)
    const [opensnack, setOpensnack] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setCreate({ name: "", collectionId: "", imageUrl: "" })
        setError(false)
        setOpensnack(false)
    }
    const handleCloseSnack = () => setOpensnack(false);
    
    const setPlaylist = useCallback((collectionId : string) => {
        setCreate({ ...create, collectionId: collectionId })
    }, [create])


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

    const changeCreate = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        validateInput(value)
        setCreate({ ...create, name: value })
    }

    const uploadFile = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            uploadPicture(event.target.files[0]).then(
                res => {
                    setCreate({ ...create, imageUrl: res.data })
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
        if (create.name === undefined || 
            create.name.trim() === '' || 
            create.collectionId === undefined || 
            create.collectionId.trim() === '') {
            return false;
        }
        return true;
    }

    const createJamRequest = () => {
        if (canCreate()) {
            //send request
        } else {
            setError(true)
        }
    }

    return (
        <div>
            <Button
                startIcon={<AddBoxSharpIcon />}
                variant="contained"
                className="createJamButton"
                onClick={handleOpen}>
                Collection
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <>
                    <Snackbar open={opensnack} autoHideDuration={3000} onClose={handleCloseSnack}>
                        <Alert variant="filled" onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
                            Image uploaded with success!
                        </Alert>
                    </Snackbar>
                    <Box sx={style}>
                        <div className="CreateJamBoxDiv">
                            <div className="CJInputWrapper">
                                <Typography variant="h6">Your jam's name</Typography>
                                <TextField
                                    required
                                    error={error}
                                    id="createjamname"
                                    className="CreatJamInput"
                                    label="Name"
                                    variant="standard"
                                    onChange={(e) => {
                                        changeCreate(e)
                                    }}
                                />
                            </div>
                            <div className="CreateJamLower">
                                <div className="CreateJamPlayPick">
                                    <Typography variant="h6">Choose a collection to play!</Typography>
                                    <SelectCollection setPlaylist={setPlaylist} fProps={props.fProps}/>
                                </div>
                                <div className="CreateJamUploadWrapper">
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
                                            create.imageUrl !== '' && create.imageUrl !== undefined && (
                                                <>
                                                    <img
                                                        src={create.imageUrl}
                                                        alt="cjpic"
                                                        className="cjpic"
                                                    >
                                                    </img>
                                                </>
                                            )
                                        }
                                        <Typography variant="h6">Upload</Typography>
                                        <IconButton aria-label="Upload Picture" component="span">
                                            <ImageIcon fontSize="large" />
                                        </IconButton>

                                    </label>
                                </div>
                            </div>
                            <div className="InputButtonsWrapper">
                                <Button
                                    className="CreateJamInputButton"
                                    variant="outlined"
                                    color="error"
                                    disableElevation={true}
                                    onClick={handleClose}
                                    style={{marginRight:"1vw"}}
                                >
                                    <Typography variant="button">Cancel</Typography>
                                </Button>
                                <Button
                                    className="CreateJamInputButton"
                                    variant="contained"
                                    onClick={createJamRequest}
                                    style={{ backgroundColor: "rgba(215, 223, 217, 0.377)", color: "black", border: "1px solid black" }}
                                >
                                    <Typography variant="button">Create</Typography>
                                </Button>
                            </div>
                        </div>
                    </Box>
                </>
            </Modal>
        </div>
    )
}

export default CreateJamModal