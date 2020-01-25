import React, { Component} from 'react';
import { validateHelper } from '../Middleware/firebase'

// Components for / url showing the people who wants to help the curren tuser for needers-only content
export default class TheyWantToHelpYou extends Component {

    render()
    {
        return(
            <div>
                <div style={styles.theyWantToHelpYouTitle}>Ils veulent vous aider : </div>
                <div style={styles.theyWantToHelpYou}>
                    <div style={{display: 'inline'}}>
                    {
                        this.props.theyWantToHelpYou.map( (value, index) => {
                            return(
                                <div style={StyleTheyWantToHelpYou(index, "#FFFFFF")}>
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

function StyleTheyWantToHelpYou(offset, color){

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
            backgroundColor: color
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