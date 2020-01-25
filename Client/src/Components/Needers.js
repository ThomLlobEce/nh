import React, { Component, useContext } from 'react';
import UpcomingCourse from './UpcomingCourse'
import { getIcalData, addIcal, requestHelp, getTheyWantToHelpYou, validateHelper, db} from '../Middleware/firebase'

// Components for / url showing the needers-only content
class Needers extends Component {

    constructor(props){
        super(props)

        this.state = {
            ical: '', // Contains the ical value of the ical form
            timetable: [], // Contains the upcomming events
            showContextualMenu: false, // Wether the contextual menu should be print or not
            eventForContextualMenu: null, // Contains the specific upcomming event to show in the contextual menu
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

    loadChanges = async () => {
        console.log("Loading ...")
        this.setState({theyWantToHelpYou: await getTheyWantToHelpYou()})
    }

    listen = () => {
        db.collection('EventsRequiringHelp')
            .onSnapshot(() => { 
                console.log("Changes occured !")
                this.loadChanges()
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
                {
                    this.state.showContextualMenu ? 
                        <div style={{width: 400, left: '50%', top: '50%', position: 'fixed', zIndex: 2, padding: 20, backgroundColor: '#f4f7f8', margin: 10, borderRadius: 8, fontFamily: "Georgia", transform: "translate(-50%, -50%)", shadowOffset:{  width: 20,  height: 20,  }, shadowColor: 'black', shadowOpacity: 1.0, border: '2px solid black'}}>
                            <h3>{this.state.eventForContextualMenu.title}</h3>
                            {this.state.eventForContextualMenu.location}
                            {'Du ' + this.state.eventForContextualMenu.startDay + '/' + this.state.eventForContextualMenu.startMonth+1 + '/' + this.state.eventForContextualMenu.startYear + ' à ' + this.state.eventForContextualMenu.startHours + 'h' + this.state.eventForContextualMenu.startMinutes + ' au ' + this.state.eventForContextualMenu.endDay + '/' + this.state.eventForContextualMenu.endMonth+1 + '/' + this.state.eventForContextualMenu.endYear + ' à ' + this.state.eventForContextualMenu.endHours + 'h' + this.state.eventForContextualMenu.endMinutes}
                            { 
                                this.state.eventForContextualMenu.helper ? 
                                    this.state.eventForContextualMenu.helper + " vous aidera sur cet événement !"
                                    : 
                                    <div onClick={() => requestHelp(this.state.eventForContextualMenu)} style={{color: 'blue'}}>
                                        Rechercher un preneur de note pour cette horraire
                                    </div>
                            }
                        </div>
                        :
                        null
                }
                <div style={styles.theyWantToHelpYouTitle}>Ils veulent vous aider : </div>
                <div style={styles.theyWantToHelpYou}>
                    <div style={{display: 'inline'}}>
                    {
                        this.state.theyWantToHelpYou.map( (value, index) => {
                            return(
                                <div style={StyleTheyWantToHelpYou(index)}>
                                    <h3>{value.title}</h3>
                                    {value.location}
                                    {
                                        value.potentHelper.map( (val, index) => {
                                            return (
                                                <div onClick = {() => {validateHelper(val, value) }}>{val}</div>
                                            )
                                        })
                                    }                                    
                                </div>
                                )
                            })   
                    }
                    </div>
                </div>
            </div>
        )
    }
}

export default Needers;


const colors = ["#ADBF94",  "#E1EEF3", "#E4C4D0", "#DFCAD6", "#BF94A2", "#EFE5EC", "#CC9188"]

let last_color = -1

function StyleTheyWantToHelpYou(offset){

    let r = -2
    do{
         r = Math.floor(Math.random()*colors.length)
    }while(last_color === r)

    last_color = r

    return (
        {
            position: 'absolute',
            font: 'bold 18px Arial',
            width: '25%',
            right: 50,
            height: 180,
            top: 150+250*offset,
            marginTop: 5,
            padding: 20,
            border: '1px solid black ',
            shadowOffset:{  width: 10,  height: 10,  },
            shadowColor: 'black',
            shadowOpacity: 1.0,  
            backgroundColor: `${colors[r]}`
        }
    )
}

const styles = {

    theyWantToHelpYouTitle: {
        position: 'absolute',
        font: 'bold 18px Arial',
        width: '25%',
        right: 50,
        top: 110,
        marginTop: 15
    }
}