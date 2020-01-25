import React, { Component } from 'react';
import { getUser, uploadProfilePic , downloadProfilePic} from '../Middleware/firebase'
import addUser from '../Images/user_add.png'

// Components for showing / editing the users informations
export default class MyAccount extends Component {

    constructor(props){
        super(props)

        this.state = {
            user: {},
            image: null
        }

        this.init()
    }

    init = async () => {
        this.setState({user: await getUser()})
    }

    handleChange = e => {
        if (e.target.files[0]) {
          this.setState({image: e.target.files[0]});
        }
    }

    handleUpload = () => {
        uploadProfilePic(this.state.image)
        //this.setState({url: await downloadProfilePic(this.state.image.name)})
    }

    render()
    {
        return(
            <div style={styles.window}>
                <div style={styles.myAccountTitle}>Mon compte</div>
                <div style={{display: "flex", position: "absolute", width: "100%", height: "100%"}}>
                    <div style={styles.photo}>
                        <img src={this.state.url || addUser} alt="Image de profil"/>
                        {
                            this.state.url ? null : (<div><input type="file" accept="image/png, image/jpeg" onChange={this.handleChange}></input><button onClick={this.handleUpload}>Upload</button></div>)
                        }
                    </div>
                    <div style={styles.nom}>
                        <h3>{this.state.user.firstName + " " + this.state.user.name}</h3>
                        <div>E-mail : {this.state.user.email}</div>
                        <div>Promotion : {this.state.user.year}</div>
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
        width: "30%",
        height: "30%",
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
        height: "64%"
    },
    nom: {
        textAlign: "left"
    }
}