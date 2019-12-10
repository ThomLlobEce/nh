import React, { Component } from 'react';
import FormSignUp from './FormSignUp'

import NavBar from './NavBar'

class App extends Component {

    constructor(props){
        super(props)

        this.state = {
            printNeed: false,
            printBecome: false
        }

    }

    toggleNeed = () => {
        this.setState({printNeed: !this.state.printNeed})
    }

    toggleBecome = () => {
        this.setState({printBecome: !this.state.printBecome})
    }
    render()
    {
        return(
            <div>
                <NavBar logged={false}/>
                <div style={styles.inscription}>
                    <button
                        style={styles.need}
                        onClick={this.toggleNeed}
                        >Je recherche un preneur de note
                    </button>
                    <FormSignUp style={{zIndex: 2}} printFormSignUp = {this.state.printNeed} role = {"NEED"} toggleSignUp = {this.toggleNeed} />
                    <button
                        style={styles.become}
                        onClick={this.toggleBecome}
                        >Je veux devenir preneur de note
                    </button>
                    <FormSignUp style={{zIndex: 2}} printFormSignUp = {this.state.printBecome} role = {"BECOME"} toggleSignUp = {this.toggleBecome}/>
                </div>
            </div>
        );
    }
}

export default App;

const styles = {
    inscription: {
        width: '100%',
        height: '110vh',
        display: 'flex',
        backgroundImage: "url(https://www.bloghoptoys.fr/wp-content/uploads/2018/07/handicap-etudiant-mesures.jpg)",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        zIndex: 1
    },
    need: {
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
    become: {
        position: 'absolute',
        width: 300,
        height: 50,
        left: '50%',
        top: '55%',
        border: 'none',
	    padding: 6,
	    borderRadius: 8,
	    background: '#109177',
	    font: 'bold 13px Arial',
        color: '#fff',
        transform: "translate(-50%, -50%)"   
    }
}
