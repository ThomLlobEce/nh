import React, { Component } from 'react';

export default class FormBecomeNoteTaker extends Component {

    constructor(props){
        super(props)

        this.state = {
            become_nom: "",
            become_prenom: "",
            become_ufr: "",
            become_year: "",
            become_cm: "",
            become_dispo: ""
        }

    }

    printFormBecomeNoteTaker = () => {
        if (this.props.printFormBecomeNoteTaker === true)
        {
            return(
            <div style={styles.formulaire2}>
                <form onSubmit={this.handleSubmit}>
                <label style={styles.legend}><span style={styles.number}>1</span> Identité</label>
                <br/>
                <input type="text" placeholder="Nom" style={styles.textArea} value={this.state.become_nom} onChange = {(event) => {this.setState({become_nom: event.target.value})}}/>
                <br/>
                <input type="text" placeholder="Prénom" style={styles.textArea} value={this.state.become_prenom} onChange = {(event) => {this.setState({become_prenom: event.target.value})}}/>
                <br/>
                <br/>
                <label style={styles.legend}><span style={styles.number}>2</span> Informations Etudiantes</label>
                <br/>
                <input type="text" placeholder="UFR" style={styles.textArea} value={this.state.become_ufr} onChange = {(event) => {this.setState({become_ufr: event.target.value})}}/>
                <br/>
                <input type="text" placeholder="Année" style={styles.textArea} value={this.state.become_year} onChange = {(event) => {this.setState({become_year: event.target.value})}}/>
                <br/>
                <input type="text" placeholder="CM" style={styles.textArea} value={this.state.become_cm} onChange = {(event) => {this.setState({become_cm: event.target.value})}}/>
                <br/>
                <br/>
                <label style={styles.legend}><span style={styles.number}>3</span> Disponibilités</label>
                <br/>
                <textarea type="text" placeholder="Disponibilités" style={styles.textArea} value={this.state.become_dispo} onChange = {(event) => {this.setState({become_dispo: event.target.value})}}/>
                <br/><br/><br/>
                <input type="submit" value="Envoyer" />
              </form>
          </div>)
      }else{
          return(<div></div>)
      }
    }

    render()
    {
        return(
            <this.printFormBecomeNoteTaker/>
        );
    }
}

const styles = {
    formulaire2: {
        width: '20%',
        height: '80vh',
        right: '15%',
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
