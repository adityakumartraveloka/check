import React, { Component } from "react";
import axios from "axios";



class Home extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        axios.get("http://localhost:5000/album")
            .then(response => {
                console.log(response);
                this.setState({album: response.data.data})
            })
            .then(error => {
                console.log(error);
            })
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <h1>This is Home.</h1>
                <h1>Login Status: {this.props.loggedInStatus}</h1>
            </div>
        )
    }
}

export default Home;