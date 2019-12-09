import React, { Component } from 'react';
import axios from 'axios'

export default class FormINeedNoteTaker extends Component {

    constructor(props){
        super(props)

        this.state = {
            last_name: "",
            first_name: "",
            ufr: "",
            year: "",
            cm: "",
            dispo: "",
            password: "default"
        }

    }

    createUser = async () => {

        const response = await axios.post(
            '/api/createUser',
            this.state,
            { headers: { 'Content-Type': 'application/json' } }
          )

        console.log(response.data)
    }

    printFormINeedNoteTaker = () => {
        if (this.props.printFormINeedNoteTaker === true)
        {
            return(
            <div style={styles.formulaire}>
                    <label style={styles.legend}><span style={styles.number}>1</span> Identité</label>
                    <br/>
                    <input type="text" placeholder="Nom" style={styles.textArea} value={this.state.last_name} onChange = {(event) => {this.setState({last_name: event.target.value})}}/>
                    <br/>
                    <input type="text" placeholder="Prénom" style={styles.textArea} value={this.state.first_name} onChange = {(event) => {this.setState({first_name: event.target.value})}}/>
                    <br/>
                    <br/>
                    <label style={styles.legend}><span style={styles.number}>2</span> Informations Etudiantes</label>
                    <br/>
                    <input type="text" placeholder="UFR" style={styles.textArea} value={this.state.ufr} onChange = {(event) => {this.setState({ufr: event.target.value})}}/>
                    <br/>
                    <input type="text" placeholder="Année" style={styles.textArea} value={this.state.year} onChange = {(event) => {this.setState({year: event.target.value})}}/>
                    <br/>
                    <input type="text" placeholder="CM" style={styles.textArea} value={this.state.cm} onChange = {(event) => {this.setState({cm: event.target.value})}}/>
                    <br/>
                    <br/>
                    <label style={styles.legend}><span style={styles.number}>3</span> Disponibilités</label>
                    <br/>
                    <textarea type="text" placeholder="Disponibilités" style={styles.textArea} value={this.state.dispo} onChange = {(event) => {this.setState({dispo: event.target.value})}}/>
                    <br/><br/><br/>
                    <button onClick={this.createUser}></button>
            </div>)
      }else{
          return(<div></div>)
      }
    }

    render()
    {
        return(
            <this.printFormINeedNoteTaker/>
        );
    }
}

const styles = {

    formulaire: {
        width: '20%',
        height: '80vh',
        left: '15%',
        top: '15%',
        position: 'fixed',
        zIndex: 2,
    	padding: 20,
    	backgroundColor: '#f4f7f8',
    	margin: 10,
    	backgroundColor: '#f4f7f8',
    	borderRadius: 8,
    	fontFamily: "Georgia"
    },

    number:{
        background: '#1abc9c',
    	color: '#fff',
    	height: 30,
    	width: 30,
    	display: 'inline-block',
    	fontSize: 20,
    	lineHeight: 1.3,
    	textAlign: 'center',
    	textShadow: 'rgba(255,255,255,0.2)',
    	borderRadius: 15,
    },

    legend:{
        fontSize: 20,
    },

    textArea: {
        fontFamily: "Georgia",
    	background: "rgba(255,255,255,.1)",
    	border: "none",
    	borderRadius: 4,
    	fontSize: 15,
    	margin: 0,
    	outline: 0,
    	padding: 10,
    	width: '100%',
    	boxSizing: 'border-box',
    	webkitBoxSizing: 'border-box',
    	mozBoxSizing: 'border-box',
    	backgroundColor: '#e8eeef',
    	color: '#8a97a0',
    	webkitBoxShadow: "rgba(0,0,0,0.03)",
    	boxShadow: "rgba(0,0,0,0.03)",
    	marginBottom: 30}
    }
