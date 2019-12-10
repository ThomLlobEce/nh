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
            email: "",
            password: "",
            role: this.props.role,
            error: ["", "", "", "", "", "", ""]
        }

    }

    createUser = async () => {

        this.state.error = ["", "", "", "", "", "", ""]

        if(this.state.last_name === ""){
            this.state.error[0] = "Ce champ est vide."
        }
        if(this.state.first_name === ""){
            this.state.error[1] = "Ce champ est vide."
        }
        if(this.state.email === ""){
            this.state.error[2] = "Ce champ est vide."
        }
        else if(!(this.state.email.includes("@gmail.com") || this.state.email.includes("@hotmail.fr") || this.state.email.includes("@sfr.fr"))){
            this.state.error[2] = "Cette addresse e-mail n'est pas supporté"
        }
        if(this.state.ufr === ""){
            this.state.error[3] = "Ce champ est vide."
        }
        if(this.state.year === ""){
            this.state.error[4] = "Ce champ est vide."
        }
        else if(!(!isNaN(this.state.year) && this.state.year.length === 4)){
            this.state.error[4] = "L'année n'est pas bien défini. Example: 2020"
        }
        if(this.state.cm === ""){
            this.state.error[5] = "Ce champ est vide."
        }
        if(this.state.password === ""){
            this.state.error[6] = "Ce champ est vide."
        }

        this.forceUpdate()

        if(this.state.error === ["", "", "", "", "", "", ""]){
            const response = await axios.post(
                '/api/createUser',
                this.state,
                { headers: { 'Content-Type': 'application/json' } }
            )
            console.log(response.data)
        }else{
            console.log("Unable to sign up. Data is not correctly formatted.")
        }

    }

    printFormSignUp = () => {
        if (this.props.printFormSignUp === true)
        {
            return(
            <div>
                <div style={styles.formulaire}>
                    <button onClick={this.props.toggleSignUp} style={styles.cross}>X</button>
                    <label style={styles.legend}><span style={styles.number}>1</span> Identité</label>
                    <br/>
                    <br/>
                    <input type="text" placeholder="Nom" style={styles.textArea} value={this.state.last_name} onChange = {(event) => {this.setState({last_name: event.target.value})}}/>
                    {this.state.error[0] !== "" ?  (<a style={{color: 'red'}}>{this.state.error[0]}<br /></a>) : (<br />)}
                    <br/>
                    <input type="text" placeholder="Prénom" style={styles.textArea} value={this.state.first_name} onChange = {(event) => {this.setState({first_name: event.target.value})}}/>
                    {this.state.error[1] !== "" ?  (<a style={{color: 'red'}}>{this.state.error[1]}<br /></a>) : (<br />)}
                    <br/>
                    <input type="text" placeholder="Email" style={styles.textArea} value={this.state.email} onChange = {(event) => {this.setState({email: event.target.value})}}/>
                    {this.state.error[2] !== "" ?  (<a style={{color: 'red'}}>{this.state.error[2]}<br /></a>) : (<br />)}
                    <br/>
                    <label style={styles.legend}><span style={styles.number}>2</span> Informations Etudiantes</label>
                    <br/>
                    <br/>
                    <input type="text" placeholder="UFR" style={styles.textArea} value={this.state.ufr} onChange = {(event) => {this.setState({ufr: event.target.value})}}/>
                    {this.state.error[3] !== "" ?  (<a style={{color: 'red'}}>{this.state.error[3]}<br /></a>) : (<br />)}
                    <br/>
                    <input type="text" placeholder="Année" style={styles.textArea} value={this.state.year} onChange = {(event) => {this.setState({year: event.target.value})}}/>
                    {this.state.error[4] !== "" ?  (<a style={{color: 'red'}}>{this.state.error[4]}<br /></a>) : (<br />)}
                    <br/>
                    <input type="text" placeholder="CM" style={styles.textArea} value={this.state.cm} onChange = {(event) => {this.setState({cm: event.target.value})}}/>
                    {this.state.error[5] !== "" ?  (<a style={{color: 'red'}}>{this.state.error[5]}<br /></a>) : (<br />)}
                    <br/>
                    <br/>
                    <label style={styles.legend}><span style={styles.number}>3</span> Mot de passe</label>
                    <br/>
                    <br/>
                    <input type="password" placeholder="Mot de passe" style={styles.textArea} value={this.state.password} onChange = {(event) => {this.setState({password: event.target.value})}}/>
                    {this.state.error[6] !== "" ?  (<a style={{color: 'red'}}>{this.state.error[6]}<br /></a>) : (<br />)}
                    <br/>< br/>
                    <button onClick={this.createUser} style={styles.submitButton}>Envoyer</button>
                </div>
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
        width: 400,
        left: '50%',
        top: '54%',
        position: 'absolute',
        zIndex: 2,
    	padding: 20,
    	backgroundColor: '#f4f7f8',
    	margin: 10,
    	borderRadius: 8,
    	fontFamily: "Georgia",
        transform: "translate(-50%, -50%)"
    },

    number:{
        background: '#1abc9c',
    	color: '#FFF',
    	height: 30,
    	width: 30,
    	display: 'inline-block',
    	fontSize: 18,
    	lineHeight: 1.2,
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
    	fontSize: 12,
    	margin: 0,
    	outline: 0,
    	padding: 10,
    	width: '100%',
    	boxSizing: 'border-box',
    	WebkitBoxSizing: 'border-box',
    	MozBoxSizing: 'border-box',
    	backgroundColor: '#e8eeef',
    	color: '#8a97a0',
    	WebkitBoxShadow: "rgba(0,0,0,0.03)",
        boxShadow: "rgba(0,0,0,0.03)",
        marginBottom: 5
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
