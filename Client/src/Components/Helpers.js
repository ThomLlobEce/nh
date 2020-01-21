import React, { Component } from 'react';
import NavBar from './NavBar'
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import Needers from './Needers';

// Components for /dashboard url, showing the helpers-only content
class Helpers extends Component {

    constructor(props){
        super(props)

        this.getUpcommingEventsLookingForHelpers()
    }

    state = {
        upcommingEventsLookingForHelpers: [] // Contains the upcoming events looking for helpers for the need=false users
    }

    /** Method for loading from server the upcomming events looking for helpers */
    getUpcommingEventsLookingForHelpers = async () => {
        await axios.get(
            '/api/getUpcommingEvents'
        )
        .then( (res) => {
            if(res.data.status === 'success'){
                console.log("Upcomming events correctly loaded")
                this.setState({upcommingEventsLookingForHelpers: res.data.message})
            }
            else{
                console.log("Error while getting upcomming events " + res.data.message)
            }
        })
        .catch(error => { console.log(error)})
    }

    render()
    {
        return(
            <div>
            {
                this.state.upcommingEventsLookingForHelpers.map( (value) => {
                    return(
                        <div>
                            <h3>Prénom du requêtant {value.requester.firstName}</h3>
                            <h4>Nom de l'évenement: {value.event.title}</h4>
                            <h5>Lieu : {value.event.location}</h5>
                            <h5>Date : Du {value.event.startDay}/{value.event.startMonth+1}/{value.event.startYear} au {value.event.endDay}/{value.event.endMonth+1}/{value.event.endYear} de {value.event.startHours}h{value.event.startMinutes} au {value.event.endHours}h{value.event.endMinutes}</h5>
                        </div>
                    )
                })
            }
        </div>)
    }
}

export default Helpers;