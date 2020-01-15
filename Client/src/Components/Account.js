import React, { Component } from 'react';
import NavBar from './NavBar'
import { Link } from 'react-router-dom';
import axios from 'axios'

// Dashboard view
class Account extends Component {

    
    constructor(props){
        super(props)

        this.content()
    }

    state = {
        readyToRender: false, // false while fetching API data, true when ready to render
        logged: false, // Wether there is a logged user
    }

    // Trying to know if the client user is authed on server-side
    content = async () => {
        await axios.get(
            '/api/isAuth?email='+this.props.user.email
        )
        .then( (res) => {
            if(res.data.message === true){
                this.setState({readyToRender: true, logged: true})
            }
            else{
                
                this.setState({readyToRender: true})
            }
        })
        .catch(error => {
            this.setState({readyToRender: true})
            console.log(error)
        })
    }

    render()
    {
        return(
            <div>

                <div style={styles.inscription}>
                    { 
                        this.state.readyToRender ?
                        this.state.logged ? 
                            <div>
                                <NavBar logged={true} disconnect={this.props.disconnect} />
                                <h1 style={{color: "red"}}>HELLO</h1>
                            </div>
                            : 
                            <div>
                                <NavBar logged={false} />
                                <div style={styles.inscription}>
                                    <h1 style={styles.back_button}>You are not logged in. <Link to = {'/signin'} style={{color: 'blue'}}>Please sign in</Link> or <Link to="/" style={{color: 'blue'}}>create an account</Link></h1>
                                </div>
                            </div>
                            : 
                            null
                    }
                </div>
            </div>)
    }
}

export default Account;

const styles = {

    inscription: {
        width: '100%',
        height: '110vh',
        display: 'flex',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        zIndex: 1
    },
    back_button: {
        position: 'absolute',
        width: 300,
        height: 50,
        left: '50%',
        top: '45%',
        border: 'none',
	    padding: 6,
	    borderRadius: 8,
	    background: '#109177',
	    font: 'bold 13px Arial',
        color: '#fff',
        transform: "translate(-50%, -50%)"   
    },
    formulaire: {

        width: 400,
        left: '50%',
        top: '50%',
        position: 'absolute',
        zIndex: 2,

    	padding: 20,
    	backgroundColor: '#f4f7f8',
    	margin: 10,
    	borderRadius: 8,
    	fontFamily: "Georgia",
        transform: "translate(-50%, -50%)"
    },

    number:{
        background: '#1abc9c',

    	color: '#FFF',
    	height: 30,
    	width: 30,
    	display: 'inline-block',
    	fontSize: 18,
    	lineHeight: 1.2,
    	textAlign: 'center',
    	textShadow: 'rgba(255,255,255,0.2)',
    	borderRadius: 15,
    },

    textArea: {
        fontFamily: "Georgia",
    	background: "rgba(255,255,255,.1)",
    	border: "none",
    	borderRadius: 4,
    	fontSize: 12,
    	margin: 0,
    	outline: 0,
    	padding: 10,
    	width: '100%',
    	boxSizing: 'border-box',
    	WebkitBoxSizing: 'border-box',
    	MozBoxSizing: 'border-box',
    	backgroundColor: '#e8eeef',
    	color: '#8a97a0',
    	WebkitBoxShadow: "rgba(0,0,0,0.03)",
        boxShadow: "rgba(0,0,0,0.03)",
        marginBottom: 5
    },

    submitButton: {
        position: 'relative',
	    display: 'block',
	    padding: '19px 39px 18px 39px',
        color: '#FFF',
        margin: 'auto',
        background: '#1abc9c',
        fontSize: 18,
        textAlign: 'center',
        fontStyle: 'normal',
        width: '100%',
        border: '1px solid #16a085',
        borderWidth: '1px 1px 3px',
        marginBottom: 10
    },
}
