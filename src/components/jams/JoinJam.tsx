import { Alert, Box, Button, Modal, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FullProps } from "../../redux/redux";
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from "react-router";
import CancelIcon from '@mui/icons-material/Cancel';
import { JamWithSong } from "../../types/types";
import { joinJam } from "../../axios/axios";

interface JoinJamInterface {
    jam: JamWithSong,
    fProps: FullProps
}

function JoinJam(Props: JoinJamInterface) {
    let navigate = useNavigate()

    const [sucOpen, setSuc] = useState<boolean>(false)
    const [errOpen, setErr] = useState<boolean>(false)
    const [errMsg, setErrMsg] = useState<string>()
    const [open, setOpen] = useState<boolean>(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 350,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: "25px"
    };

    const joinAttempt = () => {
        resetSnackbars()
        joinJam(Props.jam.id).then(
            res => {
                //alert("Joined succesfully! Redirecting!")
                navigate("/jam/" + Props.jam.id)
                Props.fProps.joinjam(Props.jam.id)
                setSuc(true)
            }
        ).catch(
            err => {
                if (err.response) {
                    console.log(err.response)
                    //alert(err.response.data.message)
                    setErrMsg(err.response.data.message)
                }
            }
        )
    }

    useEffect(() => {
        if (errMsg) {
            setErr(true)
        }
    }, [errMsg])

    const closeSuc = () => {
        setSuc(false)
    }

    const closeErr = () => {
        setErr(false)
    }

    const resetSnackbars = () => {
        setErrMsg(undefined)
        setErr(false)
        setSuc(false)

    }

    return (
        <div>
            <Snackbar open={sucOpen} autoHideDuration={4000} onClose={closeSuc}>
                <Alert variant="filled" onClose={closeSuc} severity="success" sx={{ width: '100%' }}>
                    Jam joined! Redirecting...
                </Alert>
            </Snackbar>
            <Snackbar open={errOpen} autoHideDuration={4000} onClose={closeErr}>
                <Alert variant="filled" onClose={closeErr} severity="error" sx={{ width: '100%' }}>
                    {errMsg}
                </Alert>
            </Snackbar>
            <Button
                variant="contained"
                startIcon={<SendIcon />}
                style={{ backgroundColor: "rgb(106, 90, 205)", color: "white", borderRadius: "20px" }}
                onClick={handleOpen}
            >
                Join
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography variant="h6">
                        Are you sure you want to join this jam?
                    </Typography>
                    <div style={{ display: "flex", justifyContent: "center", paddingTop: "2vh" }}>
                        <Button
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            style={{ borderRadius: "20px", marginRight: "2vw" }}
                            color="error"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<SendIcon />}
                            style={{ backgroundColor: "rgb(106, 90, 205)", color: "white", borderRadius: "20px" }}
                            onClick={joinAttempt}
                        >
                            Yes, let me join!
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default JoinJam;