import React, { Component } from 'react';
import FormSignUp from './Components/FormSignUp'

class App extends Component {

    constructor(props){
        super(props)

        this.state = {
            printFormSignUp: false,
        }

    }

    toggleSignUp = () => {
        this.setState({printFormSignUp: !this.state.printFormSignUp})
    }

    render()
    {
        return(
            <div style={styles.main_container}>
                <div style={styles.nav}>
                    <button style={styles.connexion_button}>Connexion</button>
                </div>
                <div style={styles.inscription}>
                <button
                    style={styles.I_need_note_taker}
                    onClick={this.toggleSignUp}
                    >I need a note taker
                    <FormSignUp printFormSignUp = {this.state.printFormSignUp} role = {"NEED"}/>
                </button>
                <button
                    style={styles.become_note_taker}
                    onClick={this.toggleSignUp}
                    >I want to become a note taker
                    <FormSignUp printFormSignUp = {this.state.printFormSignUp} role = {"BECOME"}/>
                </button>
                </div>
            </div>
        );
    }
}

export default App;

const styles = {
    main_container: {
        width: "100%"
    },
    nav: {
        backgroundColor: '#1abc9c',
        width: '100%',
        height: '10vh'
    },
    inscription: {
        width: '100%',
        height: '90vh',
        display: 'flex',
        backgroundImage: "url(" + "https://www.bloghoptoys.fr/wp-content/uploads/2018/07/handicap-etudiant-mesures.jpg" + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    },
    become_note_taker: {
        position: 'absolute',
        width: 200,
        height: 50,
        left: '45%',
        top: '55%',
        border: 'none',
	    padding: 6,
	    borderRadius: 8,
	    background: '#109177',
	    font: 'bold 13px Arial',
	    color: '#fff'
    },
    I_need_note_taker: {
        position: 'absolute',
        width: 200,
        height: 50,
        left: '45%',
        top: '65%',
        border: 'none',
	    padding: 6,
	    borderRadius: 8,
	    background: '#109177',
	    font: 'bold 13px Arial',
	    color: '#fff'
    },
    connexion_button: {
        backgroundColor: '#1abc9c',
        height: 40,
        width: 150,
        border: '2px solid black',
        font: 'bold 17px Arial',
        borderRadius: '10px',
        position: 'fixed',
        right: '0%',
        top: '5%',
        transform: "translate(-50%, -50%)"
    }
}
