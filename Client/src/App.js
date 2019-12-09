import React, { Component } from 'react';
import FormBecomeNoteTaker from './Components/FormBecomeNoteTaker'
import FormINeedNoteTaker from './Components/FormINeedNoteTaker'

class App extends Component {

    constructor(props){
        super(props)

        this.state = {
            printFormBecomeNoteTaker: false,
            printFormINeedNoteTaker: false,
        }

    }

    handleINeedNoteTaker = () => {
      this.setState({printFormINeedNoteTaker: true})
      this.setState({printFormBecomeNoteTaker: false})
    }

    handleBecomeNoteTaker = () => {
        this.setState({printFormBecomeNoteTaker: true})
        this.setState({printFormINeedNoteTaker: false})
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
                    onClick={this.handleINeedNoteTaker}
                    >I need a note taker
                    <FormINeedNoteTaker printFormINeedNoteTaker = {this.state.printFormINeedNoteTaker}/>
                </button>
                <button
                    style={styles.become_note_taker}
                    onClick={this.handleBecomeNoteTaker}
                    >I want to become a note taker
                    <FormBecomeNoteTaker printFormBecomeNoteTaker = {this.state.printFormBecomeNoteTaker}/>
                </button>
                </div>
            </div>
        );
    }
}

export default App;

const styles = {
    main_container: {
        width: "100%",
        height: "90vh"
    },
    nav: {
        backgroundColor: 'red',
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
        backgroundColor: 'red',
        border: '2px solid black',
        borderRadius: '10px',
        position: 'fixed',
        right: '0%',
        top: '5%',
        transform: "translate(-50%, -50%)"
    }
}
