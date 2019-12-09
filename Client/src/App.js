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
                    <div
                        style={styles.I_need_note_taker}
                        onClick={this.handleINeedNoteTaker}
                        >
                        <FormINeedNoteTaker printFormINeedNoteTaker = {this.state.printFormINeedNoteTaker}/>
                    </div>
                    <div
                        style={styles.become_note_taker}
                        onClick={this.handleBecomeNoteTaker}
                        >
                        <FormBecomeNoteTaker printFormBecomeNoteTaker = {this.state.printFormBecomeNoteTaker}/>
                    </div>

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
        height: '10vh   '
    },
    inscription: {
        display: 'flex',
        backgroundImage: "url(" + "https://imagesia.com/images/2019/12/06/background2.png" + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    },
    become_note_taker: {
        width: '50%',
        height: '90vh'
    },
    I_need_note_taker: {
        width: '50%',
        height: '90vh'
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
