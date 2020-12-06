import React, { useState, useEffect } from "react"
import { withRouter } from 'react-router-dom'
import { Grid, Paper, List, ListItem, Button, TextField, withStyles } from "@material-ui/core"
import styles from './Page.module.scss'

import { MessageList_ } from './MessageList'

const style = {
    background: '#686080',
    border: 0,
    color: 'white',
};

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
            },
        },
    },
})(TextField);

interface IPerson {
    id: string
    name: string
    password: string
}
interface IMessage {
    id: string
    text: string
    idFrom: string
    idTo: string
}

export const MessageForm_ = (props: any) => {
    const [messages, setMessages] = useState<IMessage[]>([])
    const [people, setPeople] = useState<IPerson[]>([])
    const [companionId, setId] = useState("")
    const [companionName, setName] = useState("Начните диалог")


    useEffect(() => {
        fetch('http://localhost:8000/persons').then(function (response) {
            if (!response.ok) {
                console.log(response.status + ': ' + response.statusText);
                return;
            }
            response.json().then(function (data) {
                setPeople(data)
            });
        }
        )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }, [])

    useEffect(() => {
        setTimeout("", 2000)
        fetch('http://localhost:8000/messagefromto/' + localStorage.getItem('key') + '/' + companionId).then(function (response) {
            if (!response.ok) {
                setMessages([])
                console.log(response.status + ': ' + response.statusText);
                return;
            }
            response.json().then(function (data) {
                setTimeout(data, 2000)
                setMessages(data)
                console.log(data)
                console.log(companionId)
                
            });
        }
        )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }, [messages])

    people.map((person) => { if (person.id == localStorage.getItem('key')) people.splice(people.indexOf(person), 1) })

    let socket = new WebSocket("ws://localhost:8000/messenger");

    socket.onopen = function (result) {
        console.log("Соединение открыто" + result);
    };

    socket.onmessage = function (event) {
        console.log("Данные" + event.data)
    };

    console.log("Данные")
    console.log(people)
    console.log(typeof (people))
    console.log(messages)
    console.log(typeof (messages))
    return (
        <div className={styles.root}>
            <Grid container className={styles.grid}>
                <Grid item xs={3} className={styles.gridPart1}>
                    <List id="list">
                        {
                            people.map((person) => (
                                <ListItem>
                                    <Button
                                        style={style}
                                        className={styles.buttonPerson}
                                        onClick={() => {
                                            setId(person.id)
                                            setName(person.name)
                                        }}
                                    >
                                        {person.name}
                                    </Button>
                                </ListItem>
                            ))
                        }
                    </List>
                </Grid>
                <Grid item xs={9} className={styles.gridPart2}>
                    <div className={styles.text}>{companionName}</div>
                    <MessageList_ messages={messages} id={companionId} />
                </Grid>
                <Grid container className={styles.gridDown}>
                    <Grid item xs={3}>
                        <Button
                            style={style}
                            className={styles.buttonOut}
                            onClick={() => {
                                localStorage.removeItem('key')
                                props.history.push('/login')
                            }}
                        >
                            Выйти
                    </Button>
                    </Grid>
                    <Grid item xs={9}>
                        <CssTextField
                            id="text"
                            variant="outlined"
                            className={styles.textField}
                        ></CssTextField>
                        <Button
                            className={styles.button}
                            style={style}
                            onClick={() => {
                                if ((document.getElementById("text") as HTMLInputElement).value != null) {
                                    let message = {
                                        text: (document.getElementById("text") as HTMLInputElement).value,
                                        idFrom: localStorage.getItem('key'),
                                        idTo: companionId
                                    }
                                    console.log(message)
                                    let json = JSON.stringify(message)
                                    fetch('http://localhost:8000/createmessage', { method: "POST", body: json, headers: { 'Content-Type': 'application/json' } })
                                }
                                (document.getElementById("text") as HTMLInputElement).value = null
                            }
                            }
                        >Отправить</Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}


export const MessageForm = withRouter(MessageForm_)