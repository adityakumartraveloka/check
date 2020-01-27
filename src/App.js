import React, { Component } from 'react';
import { BrowserRouter, Switch, Route} from "react-router-dom";

import Home from "./Components/Home/Home";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Private from "./Components/Private/Private";

class App extends Component{

  constructor(props){
    super(props);

    this.state = {
      loggedInStatus : "NO_LOGGED_IN",
      token: ""
    }

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin = (data) => {
    console.log("[App.js] Reaching here");
    this.setState({
        loggedInStatus: "LOGGED_IN",
        token: data.token
    });
    console.log("[App.js] state", this.state);
  }

  render() {
      return (
          <div className="App">
              <BrowserRouter>
                <Switch>

                    <Route 
                        exact 
                        path="/"
                        render={props => (
                            <Home 
                                { ...props } 
                                loggedInStatus={this.state.loggedInStatus}
                                token={this.state.token}
                            />
                        )}
                    />

                    <Route 
                        exact 
                        path="/signup" 
                        render={props => (
                            <Signup 
                                { ...props } 
                                loggedInStatus={this.state.loggedInStatus}
                                token={this.state.token}
                                handleSuccessfulAuth={this.handleLogin}
                            />
                        )}
                    />
                    
                    <Route 
                        exact 
                        path="/login"
                        render={props => (
                            <Login 
                                { ...props } 
                                loggedInStatus={this.state.loggedInStatus}
                                token={this.state.token}
                                handleSuccessfulAuth={this.handleLogin}
                            />
                        )} 
                    />

                    <Route 
                        exact 
                        path="/private"
                        render={props => (
                            <Private 
                                { ...props } 
                                loggedInStatus={this.state.loggedInStatus}
                                token={this.state.token}
                            />
                        )}
                    />
                </Switch>
              </BrowserRouter>
          </div>
      )
  }


}

export default App;