import React, { Component } from 'react';
import UpcomingCourse from './UpcomingCourse'
import { getIcalData, addIcal, getTheyWantToHelpYou, db} from '../Middleware/firebase'
import ContextualMenu from './ContextualMenu';
import TheyWantToHelpYou from './TheyWantToHelpYou';

// Components for / url showing the needers-only content
export default class Needers extends Component {

    constructor(props){
        super(props)

        this.state = {
            ical: '', // Contains the ical value of the ical form
            timetable: [], // Contains theupcoming events
            showContextualMenu: false, // Wether the contextual menu should be print or not
            eventForContextualMenu: null, // Contains the specific upcoming event to show in the contextual menu
            theyWantToHelpYou: [], // Contains every request of help concerning the current user,
            init: false
        }

        this.init()
        this.listen()   
    }


    init = async () => {
        console.log("Loading ...")
        this.setState({timetable: await getIcalData(), theyWantToHelpYou: await getTheyWantToHelpYou()})
    }

    listen = () => {
        db.collection('EventsRequiringHelp')
            .onSnapshot(() => { 
                console.log("Changes occured !")
                this.init()
            })
    }

    render()
    {
        return(
            <div>
                <div style={{display: 'flex', marginTop: 70, marginLeft: 50}}>
                    <label> ICAL : 
                        <input 
                            type="text" 
                            name="ical" 
                            value={this.state.ical} 
                            onChange={(event) => this.setState({ical: event.target.value})} 
                            placeholder="https://[...].ics" 
                        />
                    </label>
                    <button onClick={() => { addIcal(this.state.ical); this.init(); }}>GO</button>
                </div>
                <UpcomingCourse 
                    timetable={this.state.timetable}
                    contextualMenu={(event) => this.setState({showContextualMenu: true, eventForContextualMenu: event})}
                    />
                <ContextualMenu show={this.state.showContextualMenu} event={this.state.eventForContextualMenu} />
                <TheyWantToHelpYou theyWantToHelpYou={this.state.theyWantToHelpYou} />
            </div>
        )
    }
}