import React, { Component } from "react";
import axios from 'axios';

class Signup extends Component{

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

        axios.post("http://localhost:5000/user/signup", {
            username: this.state.username,
            password: this.state.password
        },{
            withCredentials: true
        }).then( response => {
            if(response.status === 200){
                this.props.handleSuccessfulAuth(response.data);
                this.props.history.push("/");
            }
        }).catch(errors => {
            console.log(errors.response);
        })

    }

    render() {

        const { username, password, confirm_password } = this.state;

        return (
            <div>
                <form className="box" onSubmit={this.handleSubmit}>
                    <h1>Signup</h1>
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

                    <input 
                        type="password" 
                        name="confirm_password" 
                        placeholder="Password"
                        value={confirm_password}
                        onChange={this.handleChange}
                    />
                    
                    <input type="submit" name="" value="Signup"/>
                </form>
            </div>
        )
    }
}

export default Signup;