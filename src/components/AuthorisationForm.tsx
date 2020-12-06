import React, { useState } from 'react'
import { TextField, Button, withStyles} from '@material-ui/core'
import styles from './Page.module.scss'
import { withRouter } from 'react-router-dom'

const style = {
  background: '#686080',
  border: 2,
  color: 'white',
  margin: 5,
};

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#686080',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#686080',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#686080',
      },
      '&:hover fieldset': {
        borderColor: '#686080',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#686080',
      },
    },
  },
})(TextField);

export const AuthorisationForm_ = (props: any) => {
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  document.title = 'Вход'
  return (
    <div className={styles.rootAut}>
      <div className={styles.block}>
        <CssTextField
          classes={props.classes}
          id="name"
          label="Имя"
          onChange={(e) => setUserName(e.target.value)}
        />
        <br/>
        <CssTextField
          classes={props.classes}
          id="password"
          label="Пароль"
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <br />
        <br />
        <Button
        style = {style}
          onClick={async () => {
            if (userName == '') alert('Ошибка! Неверные данные')
            else {
              if (userPassword == '') alert('Ошибка! Неверные данные')
              else {
                fetch('http://localhost:8000/personByPassword/' + userPassword + '/' + userName, { method: "GET", headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                  if (!response.ok) {
                    alert('Неверный логин или пароль')
                    console.log(response.status + ': ' + response.statusText);
                    return;
                  }
                  response.json().then(function (data) {
                    localStorage.setItem('key', data.id)
                    props.history.push('/messenger')
                  });
                })
              }
            }
          }
          }
        >
          Войти
          </Button>
          <br/>
        <Button
        style = {style}
          onClick={async () => {
            if (userName == '') alert('Ошибка! Неверные данные')
            else {
              if (userPassword == '') alert('Ошибка! Неверные данные')
              else {
                let person = {
                  name: userName,
                  password: userPassword
                }
                let json = JSON.stringify(person)
                fetch('http://localhost:8000/createperson', { method: "POST", body: json, headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                  if (!response.ok) {
                    alert('Такой пароль уже есть')
                    console.log(response.status + ': ' + response.statusText);
                    return;
                  }
                  else {
                    fetch('http://localhost:8000/personByPassword/' + userPassword + '/' + userName, { method: "GET", headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                      if (!response.ok) {
                        alert('Неверный логин или пароль')
                        console.log(response.status + ': ' + response.statusText);
                        return;
                      }
                      response.json().then(function (data) {
                        localStorage.setItem('key', data.id)
                        props.history.push('/messenger')
                      });
                    })
                  }
                })
              }
            }
          }
          }
        >
          Зарегистрироваться
          </Button>
      </div>
    </div>
  )
}

export const AuthorisationForm = withRouter(AuthorisationForm_)