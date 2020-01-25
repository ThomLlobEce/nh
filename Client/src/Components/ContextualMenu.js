import React, { Component } from 'react';
import { requestHelp } from '../Middleware/firebase'
import MouseOverButton from './MouseOverButton';

// Components for / url showing the contextual meenu for the needers-only content
export default class ContextualMenu extends Component {

    render()
    {
        return(
            <div>
                {
                    this.props.show ? 
                        <div style={styles.window}>
                            <h3>{this.props.event.title}</h3>
                            <div>{this.props.event.location}</div>
                            <div>{'Du ' + this.props.event.startDay + '/' + this.props.event.startMonth+1 + '/' + this.props.event.startYear + ' à ' + this.props.event.startHours + 'h' + this.props.event.startMinutes + ' au ' + this.props.event.endDay + '/' + this.props.event.endMonth+1 + '/' + this.props.event.endYear + ' à ' + this.props.event.endHours + 'h' + this.props.event.endMinutes}</div>
                            <div>{ 
                                this.props.event.helper ? 
                                    this.props.event.helperFirstName + " vous aidera sur cet événement !"
                                    :
                                    <MouseOverButton text = {"Rechercher un preneur de note pour cette horraire ?"} style_over = {{color: "#57a5ff", textDecoration: "underline"}} style={{color: "blue"}} onClick={() => requestHelp(this.props.event)} />
                            }</div>
                        </div>
                        :
                        null
                }
            </div>
        )
    }
}

const styles = {
    window: {
        width: 400, 
        left: '50%', 
        top: '70%', 
        position: 'fixed', 
        zIndex: 2, 
        padding: 20, 
        backgroundColor: '#f4f7f8', 
        margin: 10, 
        borderRadius: 8, 
        fontFamily: "Georgia", 
        transform: "translate(-50%, -50%)", 
        shadowOffset: {  
            width: 20,  
            height: 20
        }, 
        shadowColor: 'black', 
        shadowOpacity: 1.0, 
        border: '2px solid black'
    }
}