import React, { Component } from 'react';
import FormSignUp from './FormSignUp'
import MouseOverButton from './MouseOverButton'

/** Component managing the sign up forms (for needers & helpers) */
export default class SignUp extends Component {

    state = {
        printNeed: false, // true if the form for needers should be printed
        printBecome: false // true if the form for helpers should be printed
    }

    connexion = () => {
        this.setState({printBecome: false, printNeed: false})
        this.props.connexion()
    }

    render()
    {
        return(
            <div>
                {/** Buttons to toggle forms */}
                <MouseOverButton text={"J'ai besoin d'aide"} style={styles.need} style_over={styles.need_over} onClick={() => this.setState({printNeed: true})} />
                <MouseOverButton text={"Je veux aider"} style={styles.become} style_over={styles.become_over} onClick={() => this.setState({printBecome: true})} />

                { /** Forms, shown above the buttons if users has pressed one  */}
                <FormSignUp style={{zIndex: 2}} printFormSignUp = {this.state.printNeed} role = {true} toggleSignUp = {() => this.setState({printNeed: !this.state.printNeed})} connexion = {() => this.connexion()} createUser={this.props.createUser}/>
                <FormSignUp style={{zIndex: 2}} printFormSignUp = {this.state.printBecome} role = {false} toggleSignUp = {() => this.setState({printBecome: !this.state.printBecome})} connexion = {() => this.props.connexion()}  createUser={this.props.createUser}/>
            </div>
        )
    }
}

const styles = {
    need: {
        position: 'absolute',
        width: 300,
        height: 50,
        left: '50%',
        top: '45%',
        border: 'none',
	    padding: 6,
	    borderRadius: 8,
	    background: '#EC670A',
	    font: 'bold 13px Arial',
        color: 'white',
        transform: "translate(-50%, -50%)"   
    },
    need_over: {
        position: 'absolute',
        width: 300,
        height: 50,
        left: '50%',
        top: '45%',
        border: 'none',
	    padding: 6,
	    borderRadius: 8,
	    background: '#EC8E0A',
	    font: 'bold 13px Arial',
        color: 'white',
        transform: "translate(-50%, -50%)"   
    },
    become: {
        position: 'absolute',
        width: 300,
        height: 50,
        left: '50%',
        top: '55%',
        border: 'none',
	    padding: 6,
	    borderRadius: 8,
        background: '#EC670A',
	    font: 'bold 13px Arial',
        color: 'white',
        transform: "translate(-50%, -50%)"   
    },
    become_over: {
        position: 'absolute',
        width: 300,
        height: 50,
        left: '50%',
        top: '55%',
        border: 'none',
	    padding: 6,
	    borderRadius: 8,
        background: '#EC8E0A',
	    font: 'bold 13px Arial',
        color: 'white',
        transform: "translate(-50%, -50%)"   
    }
}