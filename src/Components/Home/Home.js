import React, { Component } from "react";

class Home extends Component {
    constructor(props){
        super(props);
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