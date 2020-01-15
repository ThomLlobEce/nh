import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home  from "./Components/Home";
import Account from './Components/Account'
import axios from 'axios'

class App extends Component {

    constructor(props){
        super(props)

        this.state = {
            user: false // Contains informations of a logged user
        }
    }

    // Update user state
    addUser = (user) => {
        this.setState({user: user})
    }

    // Update user state if API disconnection call succeed.
    disconnect = async () => {
        await axios.get(
            '/api/disconnect?email='+this.state.user.email
        )
        .then( (res) => {
            if(res.data.message === true){
                this.setState({user: false})
            }
        })
        .catch( () => {
            console.log("Error while disconnecting")
        })
    }

    render()
    {
        return(
            <div className="App" style={{margin: -10}}>
                <div className="App-content">
                    <Router>
                        <Switch>
                            <Route exact path="/" render={(props) => <Home {...props} addUser={this.addUser} />}/>
                            <Route exact path='/dashboard' render={(props) => <Account {...props} user={this.state.user} disconnect={this.disconnect} />}/>
                        </Switch>
                    </Router>
                </div>
                
            </div>
        );
    }
}

export default App;