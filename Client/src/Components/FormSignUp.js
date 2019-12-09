import React, { Component } from 'react';
import axios from 'axios'

export default class FormSignUp extends Component {

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

    printFormSignUp = () => {
        if (this.props.printFormSignUp === true)
        {
            return(
            <div style={styles.formulaire}>
                    <button onClick={this.props.toggleSignUp} style={styles.cross}>X</button>
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
                    <button onClick={this.createUser} style={styles.submitButton}>Envoyer</button>
            </div>)
      }else{
          return(<div></div>)
      }
    }

    render()
    {
        return(
            <this.printFormSignUp/>
        );
    }
}

const styles = {

    formulaire: {
        width: '20%',
        height: '90vh',
        left: '37%',
        top: '10%',
        position: 'fixed',
        zIndex: 2,
    	padding: 20,
    	backgroundColor: '#f4f7f8',
    	margin: 10,
    	borderRadius: 8,
    	fontFamily: "Georgia"
    },

    number:{
        background: '#1abc9c',
    	color: '#FFF',
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
        color: '#1abc9c',
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
    	marginBottom: 30
    },

    submitButton: {
        position: 'relative',
	    display: 'block',
	    padding: '19px 39px 18px 39px',
        color: '#FFF',
        margin: 'auto',
        background: '#1abc9c',
        fontSize: 18,
        textAlign: 'center',
        fontStyle: 'normal',
        width: '100%',
        border: '1px solid #16a085',
        borderWidth: '1px 1px 3px',
        marginBottom: 10
    },

    cross: {
        position: 'absolute',
        top: 5,
        right: 5,
        border: "none",
        backgroundColor: '#f4f7f8',
    }

    }
