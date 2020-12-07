import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
    useHistory,
    withRouter,
  } from 'react-router-dom'
  import React, { useEffect } from 'react'
  import { AuthorisationForm } from './AuthorisationForm'
  import {MessageForm} from './MessageForm'
  
  export const Main_ = (props: any) => {
    return (
      <Router>
        <Switch>
          <Route exact path={'/login'} component={AuthorisationForm} />
          <Route exact path="/messenger" component={MessageForm} />
          <Redirect from='/' to='/login'/>
        </Switch>
      </Router>
    )
  }
  
  export const Main = withRouter(Main_)