import { Box, Button, Modal } from "@mui/material"
import { useCallback, useState } from "react"
import { FullProps } from "../../redux/redux";
import SelectCollectionDisplay from "./SelectCollectionDisplay";

interface SelectColInterface {
    fProps : FullProps,
    setPlaylist : Function
}

function SelectCollection(props : SelectColInterface) {
    const [open, setOpen] = useState<boolean>(false)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const closeCallback = useCallback(() => {
        handleClose()
    }, [open])

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

    return (
        <div>
            <Button
                variant="contained"
                className="createJamButton"
                onClick={handleOpen}>
                Pick
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <SelectCollectionDisplay closeModal={closeCallback} setPlaylist={props.setPlaylist} fProps={props.fProps}/>
                </Box>
            </Modal>
        </div>
    )
}

export default SelectCollection