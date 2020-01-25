import React, { Component} from 'react';
import { validateHelper } from '../Middleware/firebase'

// Components for / url showing the people who wants to help the curren tuser for needers-only content
export default class TheyWantToHelpYou extends Component {

    render()
    {
        return(
            <div>
                <div style={styles.theyWantToHelpYouTitle}>Ils veulent vous aider</div>
                <div style={{display: 'inline'}}>
                    <div
                            style={{
                                position: "absolute",
                                top: 120,
                                right: 50,
                                height: "85%",
                                width: "20%",
                                overflowY: "scroll"
                            }}
                        >
                    {
                        this.props.theyWantToHelpYou.map( (value, index) => {
                            let start = new Date(value.start.seconds*1000)
                            let end = new Date(value.end.seconds*1000)
                            return(
                                <div style={StyleTheyWantToHelpYou(value.color)}>
                                    <h3>{value.title}</h3>
                                    <div>{value.location}</div>
                                    <div>{'Du ' + start.getDay() + '/' + start.getMonth()+1 + '/' + start.getFullYear() + ' à ' + start.getHours() + 'h' + start.getMinutes() + ' au ' + end.getDay() + '/' + end.getMonth()+1 + '/' + end.getFullYear() + ' à ' + end.getHours() + 'h' + end.getMinutes() }</div>
                                    <div>Ils souhaitent vous aider : </div>
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

function StyleTheyWantToHelpYou(color){

    return (
        {
            font: '14px Arial',
            height: 180,
            marginTop: 5,
            padding: 20,
            border: '1px solid #CCCCCC ',
            shadowOffset:{  width: 10,  height: 10,  },
            shadowColor: 'black',
            shadowOpacity: 1.0,  
            backgroundColor: color
        }
    )
}

const styles = {

    theyWantToHelpYouTitle: {
        position: 'absolute',
        color: "#515459",
        font: 'bold 18px Arial',
        width: '20%',
        right: 50,
        top: 70,
        marginTop: 15,
        paddingBottom: 3,
        borderBottom: '1px solid black'
    }
}