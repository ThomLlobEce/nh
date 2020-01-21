import React, { Component } from 'react';

/** Components for a reactive button to the transit of the user's mouse */
export default class MouseOverButton extends Component {

    state = {
        over: false
    }

    // Merging properties of styles with basic style for buttons.
    styleButton_over = { ...this.props.style_over, ...{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
    styleButton = { ...this.props.style, ...{display: 'flex', alignItems: 'center', justifyContent: 'center'}}


    render()
    {
        return(
            <div 
                style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                onMouseOut={() => this.setState({over: false})} 
                onMouseOver={() => this.setState({over: true})}>
                    {
                        this.state.over ? 
                            // Mouse is over the button
                            <div
                                onClick={this.props.onClick} 
                                style={this.styleButton_over}
                                >
                                {this.props.text}
                            </div>
                            :
                            // Mouse is not over the button
                            <div 
                                onClick={this.props.onClick} 
                                style={this.styleButton}
                                >
                                {this.props.text}
                            </div>
                    }
            </div>
        );
    }
}