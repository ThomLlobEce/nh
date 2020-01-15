import React, { Component } from 'react';
import FormSignUp from './FormSignUp'


class SignUp extends Component {

    render()
    {
        return(
            <div>
                <div
                    onMouseOut={this.props.mouseOutNeed} 
                    onMouseOver={this.props.mouseOverNeed}
                    >
                    {
                        this.props.overNeed ?
                        <button
                            style={styles.need_over}
                            onClick={this.props.toggleNeed}
                            >J'ai besoin d'aide
                        </button>
                        :
                        <button
                            style={styles.need}
                            onClick={this.props.toggleNeed}
                            >J'ai besoin d'aide
                        </button>
                    }            
                </div>
                
                <FormSignUp style={{zIndex: 2}} printFormSignUp = {this.props.printNeed} role = {"NEED"} toggleSignUp = {this.props.toggleNeed} connexion = {this.props.connexion}/>
                
                <div
                    onMouseOut={this.props.mouseOutBecome} 
                    onMouseOver={this.props.mouseOverBecome}
                    >
                    {
                        this.props.overBecome ? 
                            <button
                                style={styles.become_over}
                                onClick={this.props.toggleBecome}
                                >Je veux aider
                            </button>
                            :
                            <button
                                style={styles.become}
                                onClick={this.props.toggleBecome}
                                >Je veux aider
                            </button>
                    }
                </div>
                
                <FormSignUp style={{zIndex: 2}} printFormSignUp = {this.props.printBecome} role = {"BECOME"} toggleSignUp = {this.props.toggleBecome} connexion = {this.props.connexion}/>
            </div>
        )
    }
}

export default SignUp;

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