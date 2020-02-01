import React, { Component } from "react";
import axios from 'axios';
import "./Login.css";

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            confirm_password: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log('[Login.js] Prevent Default')
        axios.post("http://localhost:5000/user/login", {
            username: this.state.username,
            password: this.state.password
        })
        .then( response => {
            if(response.status === 200){
                this.props.handleSuccessfulAuth(response.data);
                this.props.history.push("/");
            }
            console.log('[Login.js]',response);
        })
        .catch(errors => {
            console.log(errors.response);
        })

    }

    render() {

        const { username, password } = this.state;

        return (
            <div>
                <form className="box" onSubmit={this.handleSubmit}>
                    <h1>Login</h1>
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="username"
                        value={username}
                        onChange={this.handleChange}/>
                    
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password"
                        value={password}
                        onChange={this.handleChange}
                    />

                    <input type="submit" name="" value="Login"/>
                </form>
            </div>
        )
    }
}

export default Login;