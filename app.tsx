declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');

class App extends React.Component {

    handleINeedNoteTaker = () => {
        console.log("J'ai besoin d'un preneur de noteee")
    }

    handleBecomeNoteTaker = () => {
        console.log("Je veux devenir un preneur de note")
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
                    </div>
                    <div 
                        style={styles.become_note_taker}
                        onClick={this.handleBecomeNoteTaker}
                        >
                    </div>
                </div>
                <p style = {{position: "fixed", top: "60%", left: "25%",  transform: "translate(-50%, -50%)"}}>J'ai besoin d'un preneur de note</p>
                <p style = {{position: "fixed", top: "60%", left: "75%",  transform: "translate(-50%, -50%)"}}>Je veux devenir preneur de note</p>
                <p style = {{position: "fixed", top: "50%", left: "50%",  transform: "translate(-50%, -50%)"}}>⬅️ Inscription ➡️</p>
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
        backgroundColor: 'yellow',
        width: '100%',
        height: '10vh   '
    },
    inscription: {
        display: 'flex'
    },
    become_note_taker: {
        backgroundColor: 'green',
        width: '50%',
        height: '90vh'
    },
    I_need_note_taker: {
        backgroundColor: 'purple',
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

ReactDOM.render(<App />, document.getElementById('root'));