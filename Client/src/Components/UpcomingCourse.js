import React, { Component } from 'react';

// Components for / url showing the Upcoming course for the needers-only content
export default class UpcomingCourse extends Component {

    render()
    {
        return(
            <div>
                
                <div style={styles.upcomingCourseTitle}>Vos prochains cours</div>
                <div style={{display: 'inline'}}>
                    <div
                            style={{
                                position: "absolute",
                                top: 120,
                                left: 50,
                                height: "85%",
                                width: "20%",
                                overflowY: "scroll"
                            }}
                        >
                    {
                        
                        this.props.timetable.map( (value, index) => {
                            return(
                                <div onClick={() => this.props.contextualMenu(value)} style={UpcomingCourseStyle(value.color)}>
                                    <h3>{value.title}</h3>
                                    <div>{value.location}</div>
                                    <div>{'Du ' + value.startDay + '/' + value.startMonth+1 + '/' + value.startYear + ' à ' + value.startHours + 'h' + value.startMinutes + ' au ' + value.endDay + '/' + value.endMonth+1 + '/' + value.endYear + ' à ' + value.endHours + 'h' + value.endMinutes}</div>
                                    <div>{value.helper ? value.helperFirstName + " vous aidera sur cet événement !" : null}</div>
                                </div>)
                            })
                    }
                    </div>
                </div>
            </div>
        )
    }
}

function UpcomingCourseStyle(color){
    return (
        {
            font: '14px Arial',
            height: 150,
            marginTop: 5,
            padding: 20,
            border: '1px solid #CCCCCC',
            shadowOffset:{  width: 10,  height: 10,  },
            shadowColor: 'black',
            shadowOpacity: 1.0,  
            backgroundColor: color
        }
    )
}

const styles = {
    upcomingCourseTitle: {
        position: 'absolute',
        color: "#515459",
        font: 'bold 18px Arial',
        width: '20%',
        left: 50,
        top: 70,
        marginTop: 15,
        paddingBottom: 3,
        borderBottom: '1px solid black'
    }
}