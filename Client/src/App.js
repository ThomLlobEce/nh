import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home  from "./Components/Home";
import Account from './Components/Account'

class App extends Component {
    
    render()
    {
        return(
            <div className="App" style={{margin: -10}}>
                <div className="App-content">
                    <Router>
                        <Switch>
                            <Route exact path="/Home" render={(props) => <Home {...props} />}/>
                            <Route exact path='/' render={(props) => <Account {...props} />}/>
                        </Switch>
                    </Router>
                </div>
                
            </div>
        );
    }
}

export default App;