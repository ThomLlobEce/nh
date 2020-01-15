import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from '../Images/logo.png'

const infos = ["Qui sommes-nous ? ", "Comment ça marche ?"]

export default class NavBar extends Component {

    constructor(props){
        super(props)

        this.state = {connexion_over: false, infos: [false, false]}
    }

    mouseOutConnexion() {
        this.setState({connexion_over: false});
    }
      
    mouseOverConnexion() {
        this.setState({connexion_over: true});
    }

    mouseOutInfos(i) {
        this.state.infos[i] = false
        this.forceUpdate()
    }
      
    mouseOverInfos(i) {
        this.state.infos[i] = true
        this.forceUpdate()
    }

    render()
    {
        return(
            <div style={styles.nav}>
                <Link to = {"/"}>
                    <img src={logo} height={"100%"} style={{marginLeft: 30}} alt={"Logo"}/>
                </Link>
                {
                    this.props.logged ? 
                    (
                        <Link to = {"/"}>
                            <button onClick={() => {this.props.disconnect()}} style={styles.connexion_button}>Sign out</button>
                        </Link>
                    ) :
                    (
                        <div>
                            <div style={styles.infos}>
                                {
                                    infos.map( (value, index) => {
                                        return (
                                            <div onClick = {() => {this.props.moveTo(index)}} onMouseOut={() => this.mouseOutInfos(index)} onMouseOver={() => this.mouseOverInfos(index)} >
                                                {this.state.infos[index] ? 
                                                    <div style={styles.infos_item_over}>{value}</div> 
                                                    :
                                                    <div style={styles.infos_item}>{value}</div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div onMouseOut={() => this.mouseOutConnexion()} onMouseOver={() => this.mouseOverConnexion()}>
                                
                                    { 
                                        this.state.connexion_over ? 
                                            <button onClick={this.props.connexion} style={styles.connexion_button_over}>Connexion</button>
                                            :
                                            <button onClick={this.props.connexion} style={styles.connexion_button}>Connexion</button>
                                    }
                            </div>
                        </div>
                    )
                }   
            </div>
        )
    }
}

const styles = {
    nav: {
        backgroundColor: 'white',
        width: '100%',
        height: 50,
        shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: 'black',
        shadowOpacity: 1.0,
        top: 0,
        position: 'fixed',
        zIndex: 4
    },
    connexion_button: {
        backgroundColor: "white",
        height: 30,
        width: 150,
        border: '2px solid #F29203',
        font: 'bold 17px Arial',
        color: '#EC670A',
        borderRadius: '25px',
        position: 'fixed',
        right: 0,
        top: 25,
        transform: "translate(-50%, -50%)"
    },
    connexion_button_over: {
        backgroundColor: "white",
        height: 30,
        width: 150,
        border: '2px solid #F29203',
        font: 'bold 17px Arial',
        color: '#EC8E0A',
        borderRadius: '25px',
        position: 'fixed',
        right: 0,
        top: 25,
        transform: "translate(-50%, -50%)"
    },
    infos: {
        position: 'fixed',
        left: 200,
        top: 25,
        display: 'flex'
    },
    infos_item: {
        font: '17px Arial',
        color: "#1f1f1f",
        position: 'relative',
        marginLeft: 30,
        transform: "translate(-50%, -50%)"
    },
    infos_item_over: {
        font: '17px Arial',
        color: "#e3528a",
        position: 'relative',
        marginLeft: 30,
        transform: "translate(-50%, -50%)"
    }
}
