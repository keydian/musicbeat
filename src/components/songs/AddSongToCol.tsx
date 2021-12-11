import { Alert, Box, Button, IconButton, Modal, Snackbar } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useCallback, useEffect, useState } from "react";
import { Collection } from "../../types/types";
import SelectCollectionDisplay from "../collection/SelectCollectionDisplay";
import { FullProps } from "../../redux/redux";
import { addSongToCol } from "../../axios/axios";

interface AddSongToColInterface {
    fProps: FullProps,
    songId: string,
    iconMode: boolean
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    bgcolor: 'rgb(149, 162, 241);',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: "25px"
};

function AddSongToCol(Props: AddSongToColInterface) {
    const [selCol, setSelCol] = useState<Collection>()
    const [open, setOpen] = useState<boolean>(false)
    const [sucSnack, setSucSnack] = useState<boolean>(false)
    const [errSnack, setErrSnack] = useState<boolean>(false)
    const [err, setErr] = useState<string>()

    //Snackbars & modal handlers
    const handleOpen = () => { setOpen(true); }
    const handleClose = () => {
        setOpen(false);
    }
    const handleCloseErrSnack = () => {
        setErrSnack(false)
        setErr(undefined)
    }
    const closeCallback = useCallback(() => {
        handleClose()
    }, [open])

    //Set selected collection callback
    const setPlaylist = useCallback((c: Collection) => {
        setSelCol(c)
    }, [selCol])


    //Use effects
    useEffect(() => {
        if (selCol) {
            addSongToColRequest()
        }
    }, [selCol])

    useEffect(() => {
        if (err) {
            setErrSnack(true)
        }
    }, [err])

    const addSongToColRequest = () => {
        if (selCol && Props.songId) {
            addSongToCol(selCol.id, Props.songId).then(
                res => {
                    console.log(selCol)
                    setSucSnack(true)
                    setSelCol(undefined)
                }
            ).catch(
                err => {
                    if (err.response) {
                        console.log(err.response)
                        setErr(err.response.data.message)
                    }
                }
            )
        }
    }


    return (
        <div>
            <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} open={sucSnack} autoHideDuration={3000} onClose={() => setSucSnack(false)}>
                <Alert variant="filled" onClose={() => setSucSnack(false)} severity="success" sx={{ width: '100%' }}>
                    Song added!
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} open={errSnack} autoHideDuration={3000} onClose={handleCloseErrSnack}>
                <Alert variant="filled" onClose={handleCloseErrSnack} severity="error" sx={{ width: '100%' }}>
                    {err}
                </Alert>
            </Snackbar>
            {Props.iconMode ? (
                <IconButton  onClick={handleOpen} style={{ color: 'black' }} >
                    <AddIcon/>
                </IconButton>
            ) : (
                <Button
                    onClick={handleOpen}
                    variant="outlined"
                    style={{ color: "rgb(106, 90, 205)", border: "1px solid rgb(106, 90, 205)" }}
                    startIcon={<AddIcon />} >
                    Add to Collection
                </Button>
            )
            }
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <SelectCollectionDisplay mode={"addToCol"} closeModal={closeCallback} setPlaylist={setPlaylist} fProps={Props.fProps} />
                </Box>
            </Modal>
        </div >
    )
}

export default AddSongToCol