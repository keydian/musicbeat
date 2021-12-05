import { List, ListItem, TextField, Typography } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { FullProps } from '../../redux/redux'
import '../../styles/jams/JamChat.css'
import * as faker from 'faker';
import MoodIcon from '@mui/icons-material/Mood';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

interface Message {
    author: string,
    msg: string
}

interface JamChatInterface {
    fProps: FullProps,
    participants: string[]
}

function JamChat(Props: JamChatInterface) {
    const [messages, setMessages] = useState<Message[]>([])
    const [content, setContent] = useState<string>("")

    const changeContent = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        setContent(value)
    };

    const sendMsg = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            if (content !== '' && content.trim() !== '') {
                setMessages([...messages, { author: Props.fProps.username, msg: content }])
                setContent("")
            }
        }
    };

    const genFakeMsg = () => {
        if (Math.random() < 0.5) {
            let user = Props.fProps.username
            while (user === Props.fProps.username) {
                user = Props.participants[Math.floor(Math.random() * Props.participants.length)]
            }
            let newMsg: Message = {
                author: user,
                msg: faker.lorem.sentence()
            }
            console.log(newMsg)
            setMessages([...messages, newMsg])
        }
    }


    useEffect(() => {
        if (messages.length > 0 && messages[messages.length - 1].author === Props.fProps.username) {
            genFakeMsg()
        }
    }, [messages])

    return (
        <div className="JamChat">
            <div className="JamChatHeader">
                <Typography variant="h4">Chat</Typography>
                <div style={{display:"flex",paddingLeft:"1vw"}}>
                    <PeopleAltIcon fontSize="large"/>
                    <Typography variant="body1">{Props.participants.length}</Typography>
                </div>
            </div>

            <div className="InnerChat">
                <>
                    {
                        messages.length > 0 ? (
                            <>
                                <List
                                    sx={{
                                        width: '100%',
                                        position: 'relative',
                                        alignItems: 'center',
                                        maxHeight: "50vh",
                                        overflow: 'auto',
                                        padding: "0",
                                        borderRadius: "10px 0px 0px 10px"
                                    }}
                                >
                                    {
                                        messages.map((m) => (
                                            <ListItem className="ChatListItem" key={Date.now() + Math.random()}>
                                                <div className="Message">
                                                    <Typography className="MessageAuthor" variant="body1">{m.author}:</Typography>
                                                    <Typography className="MessageContent" variant="body1"> {m.msg}</Typography>
                                                </div>
                                            </ListItem>
                                        ))
                                    }
                                </List>

                            </>
                        ) : (
                            <Typography variant="h6">No messages yet!</Typography>
                        )
                    }
                </>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginLeft: "auto", justifyContent: "center" }}>
                <TextField
                    id="msgcontent"
                    value={content}
                    type="content"
                    className="MsgInput"
                    label="Text..."
                    variant="outlined"
                    size="small"
                    onKeyPress={(e) => {
                        sendMsg(e)
                    }}
                    onChange={(e) => {
                        changeContent(e)
                    }} />
                <MoodIcon fontSize="medium" className="EmojiIcon" />
            </div>

        </div>
    )
}

export default JamChat