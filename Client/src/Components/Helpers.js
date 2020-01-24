import React, { Component } from 'react';
import { getUpcommingEventsLookingForHelpers } from '../Middleware/firebase'
import MouseOverButton from './MouseOverButton';
import { submit, db} from '../Middleware/firebase'

// Components for /dashboard url, showing the helpers-only content
class Helpers extends Component {

    constructor(props){
        super(props)

        this.state = {
            upcommingEventsLookingForHelpers: [] // Contains the upcoming events looking for helpers for the need=false users
        }

        this.getUpcommingEventsLookingForHelpers() // Getting upcomming events from server
        this.listen()
    }

    listen = () => {
        db.collection('EventsRequiringHelp')
            .onSnapshot(() => { 
                console.log("Changes occured !")
                this.getUpcommingEventsLookingForHelpers()
            })
    }
    

    /** Method for loading from server the upcomming events looking for helpers */
    getUpcommingEventsLookingForHelpers = async () => {
        this.setState({upcommingEventsLookingForHelpers: await getUpcommingEventsLookingForHelpers()})
        
    }

    render()
    {
        return(
            <div>
                
                {console.log(this.state.upcommingEventsLookingForHelpers)}
            {
                this.state.upcommingEventsLookingForHelpers.map( (value) => {
                    return(
                        <div>
                            <h3>Prénom du requêtant {value.requester}</h3>
                            <h4>Nom de l'évenement: {value.title}</h4>
                            <h5>Lieu : {value.location}</h5>
                            <h5>Date : Du {} au {}</h5>
                            <MouseOverButton text="Postuler" style={styles.submitButton} style_over={styles.submitButton_over} onClick ={() => submit(value)} />
                        </div>
                    )
                })
            }
        </div>)
    }
}

export default Helpers;

const styles = {
    submitButton: {
        position: 'relative',
	    display: 'block',
	    padding: '19px 39px 18px 39px',
        color: '#FFF',
        margin: 'auto',
        background: '#EC670A',
        fontSize: 18,
        textAlign: 'center',
        fontStyle: 'normal',
        width: '100%',
        border: '1px solid #EC670A',
        borderWidth: '1px 1px 3px',
        marginBottom: 10
    },

    submitButton_over: {
        position: 'relative',
	    display: 'block',
	    padding: '19px 39px 18px 39px',
        color: '#FFF',
        margin: 'auto',
        background: '#EC8E0A',
        fontSize: 18,
        textAlign: 'center',
        fontStyle: 'normal',
        width: '100%',
        border: '1px solid #EC8E0A',
        borderWidth: '1px 1px 3px',
        marginBottom: 10
    }
}