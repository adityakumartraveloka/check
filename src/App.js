import React, { Component } from 'react';
import { BrowserRouter, Switch, Route} from "react-router-dom";
import axios from "axios";
import cookie from "react-cookie";

import Home from "./Components/Home/Home";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Private from "./Components/Private/Private";

class App extends Component{

  constructor(props){
    super(props);

    this.state = {
      loggedInStatus : "NOT_LOGGED_IN",
      token: ""
    }

    this.handleLogin = this.handleLogin.bind(this);
  }

    checkLoggedInStatus = () => {
        axios.get("http://localhost:5000/user/auth",{
            headers: {
                authorization: "Bearer " + this.state.token
            }
        },
        {
            withCredentials: true
        }).then(response => {
            if(response.status == 200 && this.state.loggedInStatus === "NOT_LOGGED_IN"){
                this.setState({
                    loggedInStatus: "LoggedIn",
                    token: "Bearer " + response.data.token
                })
            }
            else if( response.status == 404 && this.state.loggedInStatus === "LoggedIn"){
                this.setState({
                    loggedInStatus: "NOT_LOGGED_IN",
                    token: ""
                });
            }
        }).catch(errors => {
            console.log(errors.response);
        })
    }

    componentDidMount () {
        // this.checkLoggedInStatus();
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