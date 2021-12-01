import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { FullProps } from "../../redux/redux";
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from "react-router";
import CancelIcon from '@mui/icons-material/Cancel';
import { JamWithSong } from "../../types/types";

interface JoinJamInterface {
    jam: JamWithSong,
    fProps: FullProps
}

function JoinJam(Props : JoinJamInterface) {
    let navigate = useNavigate()

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
        borderRadius:"25px"
    };

    const joinAttempt = () => {
        //send join request, if 200 then go to jam page, otherwise byebye
    }

    return (
        <div>
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
                    <div style={{ display: "flex", justifyContent:"center", paddingTop:"2vh" }}>
                        <Button
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            style={{ borderRadius: "20px", marginRight:"2vw" }}
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