import React, { Component } from 'react';
import { getUser, uploadProfilePic , downloadProfilePic, toggleAllowEmail, getAllowEmail, addIcal} from '../Middleware/firebase'
import addUser from '../Images/user_add.png'

// Components for showing / editing the users informations
export default class MyAccount extends Component {

    constructor(props){
        super(props)

        this.state = {
            user: {},
            allowEmail: false,
            ical: ""
        }

        this.init()
    }

    init = async () => {
        this.setState({user: await getUser(), url: await downloadProfilePic(), allowEmail: await getAllowEmail()})
    }

    render()
    {
        return(
            <div style={styles.window}>
                <div style={styles.myAccountTitle}>Mon compte</div>
                <div style={{display: "flex", position: "absolute", width: "100%", height: "100%"}}>
                    <div style={styles.photo}>
                            <label for="file-input">
                                <img src={this.state.url || addUser} style={{width: "100%", height: "100%"}}/>
                            </label>
                            <input id="file-input" type="file" accept="image/png, image/jpeg" onChange={async (e) => {if(await uploadProfilePic(e.target.files)){ this.setState({url: await downloadProfilePic()})}}} style={{display: "none"}}/>
                    </div>
                    <div style={styles.nom}>
                        <h3>{this.state.user.firstName + " " + this.state.user.name}</h3>
                        <div>E-mail : {this.state.user.email}</div>
                        <div>Promotion : {this.state.user.year}</div>
                        <div>Lien du calendrier : <input type="text" name="ical" value={this.state.user.ical || this.state.ical} onChange={(event) => this.setState({ical : event.target.value})}/> <button onClick={() => {addIcal(this.state.ical);}}>Utiliser</button></div>
                        <br />
                        <div>Autoriser l'envoi d'e-mail : <input type="checkbox" checked={this.state.allowEmail} onChange={async () => { await toggleAllowEmail(); this.setState({allowEmail: await getAllowEmail()})}}/></div>
                    </div>
                </div>
            </div>
        )
    }
}


const styles = {
    myAccountTitle: {
        color: "#515459",
        font: 'bold 18px Arial',
        paddingBottom: 3,
        borderBottom: '1px solid black',
        marginTop: 15,
        marginRight: 15,
        marginLeft: 15
    },
    window: {
        position: 'absolute',
        backgroundColor: 'white',
        top: 70,
        width: "30%",   
        height: "30%",
        left: '35%',
        right: '35%',
        textAlign: 'center',
        border: "1px solid #CCCCCC"
    },
    photo: {
        margin: "3%",
        border: "1px solid #CCCCCC",
        height: "64%",
        aspectRatio: 1
    },
    nom: {
        textAlign: "left"
    }
}