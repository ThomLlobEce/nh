import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home  from "./Components/Home";
import SignIn  from "./Components/SignIn";

class App extends Component {

    render()
    {
        return(
            <div className="App" style={{margin: -10}}>
                <div className="App-content">
                    <Router>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/signin" component={SignIn} />
                        </Switch>
                    </Router>
                </div>
                
            </div>
        );
    }
}

export default App;