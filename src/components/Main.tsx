import {
    BrowserRouter as Router,
    Route,
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
        </Switch>
      </Router>
    )
  }
  
  export const Main = withRouter(Main_)