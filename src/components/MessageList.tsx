import React from "react"
import { List, ListItem, Paper } from "@material-ui/core"
import styles from './Page.module.scss'

const style1 = {
  background: '#686080',
  border: 0,
  padding: 10,
  color: 'white',
};

const style2 = {
  background: '#eeedea',
  border: 0,
  padding: 10,
};

export const MessageList_ = (props: any) => {
  return (
    <List id="list">
      {
        props.messages.map((message) => (
          <ListItem>
            {message.idFrom === localStorage.getItem('key') ? 
          (<Paper style={style1}>
            {message.text}
          </Paper>) : 
          (<Paper style={style2}>
            {message.text}
          </Paper>)}

          </ListItem>
        ))
      }
    </List>
  )
}