import React, { Component } from 'react';
import { getIcalData, addIcal, requestHelp, getTheyWantToHelpYou, validateHelper, db} from '../Middleware/firebase'

// Components for / url showing the upcomming course for the needers-only content
export default class UpcomingCourse extends Component {

    render()
    {
        return(
            <div>
                
                <div style={styles.upcommingCourseTitle}>Vos prochains cours : </div>
                <div style={{display: 'inline'}}>
                    {
                        this.props.timetable.map( (value, index) => {
                            return(
                                <div onClick={() => this.props.contextualMenu(value)} style={upcomingCourse(index, value.color)}>
                                    <h3>{value.title}</h3>
                                    {value.location}
                                    {'Du ' + value.startDay + '/' + value.startMonth+1 + '/' + value.startYear + ' à ' + value.startHours + 'h' + value.startMinutes + ' au ' + value.endDay + '/' + value.endMonth+1 + '/' + value.endYear + ' à ' + value.endHours + 'h' + value.endMinutes}
                                    {value.helper ? value.helper + " vous aidera sur cet événement !" : null}
                                </div>
                                )
                            })
                    }
                </div>
            </div>
        )
    }
}

function upcomingCourse(offset, color){
    return (
        {
            position: 'absolute',
            font: 'bold 18x Arial',
            width: '25%',
            height: 180,
            left: 50,
            top: 150+200*offset,
            padding: 20,
            border: '1px solid black ',
            shadowOffset:{  width: 10,  height: 10,  },
            shadowColor: 'black',
            shadowOpacity: 1.0,  
            backgroundColor: color
        }
    )
}

const styles = {
    upcommingCourseTitle: {
        position: 'absolute',
        font: 'bold 18px Arial',
        width: '25%',
        left: 50,
        top: 110,
        marginTop: 15
    }
}