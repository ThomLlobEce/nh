import React, { Component } from 'react';
import axios from 'axios'
import { getIcalData, addIcal, requestHelp } from '../Middleware/firebase'

// Components for /dashboard url showing the needers-only content
class Needers extends Component {

    constructor(props){
        super(props)

        this.state = {
            ical: '', // Contains the ical value of the ical form
            timetable: [], // Contains the upcomming events
            showContextualMenu: false, // Wether the contextual menu should be print or not
            eventForContextualMenu: null, // Contains the specific upcomming event to show in the contextual menu
        }

        this.init()        
    }

    async init() {
        this.setState({timetable: await getIcalData()})
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
                <div style={styles.upcommingCourseTitle}>Vos prochains cours : </div>
                <div style={styles.upcommingCourse}>
                    <div style={{display: 'inline'}}>
                    {
                        this.state.timetable.map( (value) => {
                            return(
                                <div onClick={() => this.setState({showContextualMenu: true, eventForContextualMenu: value})} style={{border: '1px solid black', padding: 5}}>
                                    <h3>{value.title}</h3>
                                    {value.location}
                                    {'Du ' + value.startDay + '/' + value.startMonth+1 + '/' + value.startYear + ' à ' + value.startHours + 'h' + value.startMinutes + ' au ' + value.endDay + '/' + value.endMonth+1 + '/' + value.endYear + ' à ' + value.endHours + 'h' + value.endMinutes}
                                </div>
                                )
                            })
                    }
                    </div>
                </div>
                {
                    this.state.showContextualMenu ? 
                        <div style={{width: 400, left: '50%', top: '50%', position: 'fixed', zIndex: 2, padding: 20, backgroundColor: '#f4f7f8', margin: 10, borderRadius: 8, fontFamily: "Georgia", transform: "translate(-50%, -50%)", shadowOffset:{  width: 20,  height: 20,  }, shadowColor: 'black', shadowOpacity: 1.0, border: '2px solid black'}}>
                            <h3>{this.state.eventForContextualMenu.title}</h3>
                            {this.state.eventForContextualMenu.location}
                            {'Du ' + this.state.eventForContextualMenu.startDay + '/' + this.state.eventForContextualMenu.startMonth+1 + '/' + this.state.eventForContextualMenu.startYear + ' à ' + this.state.eventForContextualMenu.startHours + 'h' + this.state.eventForContextualMenu.startMinutes + ' au ' + this.state.eventForContextualMenu.endDay + '/' + this.state.eventForContextualMenu.endMonth+1 + '/' + this.state.eventForContextualMenu.endYear + ' à ' + this.state.eventForContextualMenu.endHours + 'h' + this.state.eventForContextualMenu.endMinutes}
                            <div onClick={() => requestHelp(this.state.eventForContextualMenu)} style={{color: 'blue'}}>
                                Rechercher un preneur de note pour cette horraire
                            </div>
                        </div>
                        :
                        null
                }
                <div style={styles.theyWantToHelpYouTitle}>Ils veulent vous aider : </div>
                <div style={styles.theyWantToHelpYou}>
                    <div style={{display: 'inline'}}>
                    {
                        
                    }
                    </div>
                </div>
            </div>
        )
    }
}

export default Needers;

const styles = {
    upcommingCourse: {
        width: '25%',
        marginLeft: 50,
        marginTop: 15,
        padding: 20,
        border: '1px solid black ',
        shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: 'black',
        shadowOpacity: 1.0,  
    },
    upcommingCourseTitle: {
        font: 'bold 18px Arial',
        width: '25%',
        marginLeft: 50,
        marginTop: 15
    },
    theyWantToHelpYouTitle: {
        position: 'absolute',
        font: 'bold 18px Arial',
        width: '25%',
        right: 50,
        top: 70,
        marginTop: 15
    }
}