import React, { Component } from 'react';
import axios from 'axios'

// Components for /dashboard url showing the needers-only content
class Needers extends Component {

    constructor(props){
        super(props)

        this.getIcalData()
    }

    state = {
        ical: '', // Contains the ical value of the ical form
        timetable: [], // Contains the upcomming events
        showContextualMenu: false, // Wether the contextual menu should be print or not
        eventForContextualMenu: null, // Contains the specific upcomming event to show in the contextual menu
    }

    /** Method for submitting to the server a event that needs a helper & the profile of the requester (current user) */
    requestHelp = async () => {
        await axios.post(
            '/api/addHelpRequest',
            {
                requester: this.props.user,
                event: this.state.eventForContextualMenu
            },
            { headers: { 'Content-Type': 'application/json' } }
        )
        .then( (res) => {
            if(res.data.status === 'success'){
                console.log("Request has correctly been submited")
                this.setState({showContextualMenu: false, eventForContextualMenu: null})
            }
            else{
                console.log("Error while getting ical data " + res.data.message)
            }
        })
        .catch(error => { console.log(error)})
    }

    /** Method for loading from server the upcomming events of the current user from its ical-associated url*/
    getIcalData = async () => {
        await axios.get(
            '/api/getIcalData?email='+this.props.user.email
        )
        .then( (res) => {
            if(res.data.status === 'success'){
                console.log("Data has been successfully gotten from ical")
                this.setState({timetable: res.data.message})
            }
            else{
                console.log("Error while getting ical data " + res.data.message)
            }
        })
        .catch(error => { console.log(error)})
    }

    /** Method to add server-side an ical url to the current user */
    addIcal = async () => {
        await axios.post(
            '/api/addIcalToUser',
            {
                email: this.props.user.email,
                ical: this.state.ical
            },
            { headers: { 'Content-Type': 'application/json' } }
        )
        .then( (res) => {
            if(res.data.status === 'success'){
                this.getIcalData()
            }
            else{
                console.log("Error while adding ical " + res.data.message)
            }
        })
        .catch(error => { console.log(error)})
    }

    render()
    {
        return(
            <div>
                <div style={{display: 'flex', marginTop: 50}}>
                    <label> ICAL : 
                        <input 
                            type="text" 
                            name="ical" 
                            value={this.state.ical} 
                            onChange={(event) => this.setState({ical: event.target.value})} 
                            placeholder="https://[...].ics" 
                        />
                    </label>
                    <button onClick={this.addIcal}>GO</button>
                </div>
                <div style={{display: 'inline'}}>
                    {
                        this.state.timetable.map( (value) => {
                            return(
                                <div onClick={() => this.setState({showContextualMenu: true, eventForContextualMenu: value})}>
                                    <h3>{value.title}</h3>
                                    {value.location}
                                    {'Du ' + value.startDay + '/' + value.startMonth+1 + '/' + value.startYear + ' à ' + value.startHours + 'h' + value.startMinutes + ' au ' + value.endDay + '/' + value.endMonth+1 + '/' + value.endYear + ' à ' + value.endHours + 'h' + value.endMinutes}
                                </div>
                                )
                            })
                    }
                </div>
                {
                    this.state.showContextualMenu ? 
                        <div style={{width: 400, left: '50%', top: '50%', position: 'fixed', zIndex: 2, padding: 20, backgroundColor: '#f4f7f8', margin: 10, borderRadius: 8, fontFamily: "Georgia", transform: "translate(-50%, -50%)", shadowOffset:{  width: 20,  height: 20,  }, shadowColor: 'black', shadowOpacity: 1.0, border: '2px solid black'}}>
                            <h3>{this.state.eventForContextualMenu.title}</h3>
                            {this.state.eventForContextualMenu.location}
                            {'Du ' + this.state.eventForContextualMenu.startDay + '/' + this.state.eventForContextualMenu.startMonth+1 + '/' + this.state.eventForContextualMenu.startYear + ' à ' + this.state.eventForContextualMenu.startHours + 'h' + this.state.eventForContextualMenu.startMinutes + ' au ' + this.state.eventForContextualMenu.endDay + '/' + this.state.eventForContextualMenu.endMonth+1 + '/' + this.state.eventForContextualMenu.endYear + ' à ' + this.state.eventForContextualMenu.endHours + 'h' + this.state.eventForContextualMenu.endMinutes}
                            <div onClick={() => this.requestHelp()} style={{color: 'blue'}}>
                                Rechercher un preneur de note pour cette horraire
                            </div>
                        </div>
                        :
                        null
                }
            </div>
        )
    }
}

export default Needers;