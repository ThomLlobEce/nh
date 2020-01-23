import React, { Component } from 'react';
import NavBar from './NavBar'
import { Redirect } from 'react-router-dom';
import Needers from './Needers';
import Helpers from './Helpers';
import User from './User'
import { isAuth, getNeedStatus } from '../Middleware/firebase'

// Components for /dashboard url
export default class Account extends Component {

    constructor(props){
        super(props)

        this.content() // Verify that a user is logged before showing logged-only content
    }

    state = {
        readyToRender: false, // false while fetching API data, true when ready to render
        logged: false, // Wether there is a logged user
        need: null, // true means the user is looking for help, false means the user is looking for helping (to show the correct content)

    }

    // Get wether a client can access or not the content of this restricted for auths only users page
    content = async () => {
        if(await isAuth()){
            this.setState({readyToRender: true, logged: true, need: await getNeedStatus()})
        }
        else{
            this.setState({readyToRender: true, logged: false})
        }
    }

    render()
    {
        return(
            <div>
                <div style={styles.mainWindow}>
                    { 
                        this.state.readyToRender ?
                            /** Content is ready to render */
                            this.state.logged ? 
                                /** User is allowed to access the content of this page */
                                <div>
                                    <User user = {this.props.user} />
                                    <div>
                                        <NavBar logged={true} disconnect={this.props.disconnect} />
                                        { /** Common to every users */}
                                        {
                                            this.state.need ? <Needers user = {this.props.user} /> : <Helpers />
                                        }
                                    </div>
                                </div>
                                : 
                                /** User is not allowed to access the content of this page */
                                <div>
                                    <Redirect to="/" />
                                </div>
                            : 
                            /** Content is not ready to render */
                            null
                        }
                </div>
            </div>)
    }
}

const styles = {

    mainWindow: {
        width: '100%',
        height: '110vh',
        display: 'flex',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        zIndex: 1
    }
}
