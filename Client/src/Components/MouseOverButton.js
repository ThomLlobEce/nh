import React, { Component } from 'react';

/** Components for a reactive button to the transit of the user's mouse */
export default class MouseOverButton extends Component {

    state = {
        over: false
    }

    render()
    {
        return(
            <div 
                onMouseOut={() => this.setState({over: false})} 
                onMouseOver={() => this.setState({over: true})}>
                    {
                        this.state.over ? 
                            // Mouse is over the button
                            <div
                                onClick={this.props.onClick} 
                                style={this.props.style_over}
                                >
                                {this.props.text}
                            </div>
                            :
                            // Mouse is not over the button
                            <div 
                                onClick={this.props.onClick} 
                                style={this.props.style}
                                >
                                {this.props.text}
                            </div>
                    }
            </div>
        );
    }
}