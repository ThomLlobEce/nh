import React, { Component } from 'react';
import NavBar from './NavBar'
import HomeInformationItem from './HomeInformationItem'
import Rima from '../Images/Rima.png'
import SignUp from './SignUp'
import FormSignIn from './FormSignIn';
import { SocialIcon } from 'react-social-icons';

/** Main component for route / */
export default class App extends Component {

    constructor(props){
        super(props)

        this.state = {
            sign: false // false = show screen to sign up, true = show screen to sign in
        }

        this.whoAreWe = React.createRef()
        this.howDoesItWork = React.createRef()
    }

    /** Automatically move the screen to a sub content */
    moveTo = (i) => {
        switch(i){
            case 0:
                window.scrollTo(0, this.whoAreWe.current.offsetTop);
                break;
            case 1:
                window.scrollTo(0, this.howDoesItWork.current.offsetTop);
                break;
            default:
                break;
        }

    }

    render()
    {
        return(
            <div>
                <NavBar logged={false} moveTo = {(index) => {this.moveTo(index)}} connexion = {() => this.setState({sign: true})}/>
                <div style={styles.forms} >
                    {
                        this.state.sign ?
                            <FormSignIn 
                                style={{zIndex: 2}} 
                                addUser={this.props.addUser}
                                inscription={() => this.setState({sign: false})}
                            />
                            :
                            <SignUp connexion = {() => this.setState({sign: true})} />
                    }
                </div>
                <div style={styles.prefooter}>
                    <div ref = {this.whoAreWe}>
                        <HomeInformationItem
                            title = {"Qui sommes-nous ?"}
                            subtitle = {"Nanterre hangagée ! Une association de l'université de Nanterre ayant pour but de sensibiliser la communauté universitaire à la question du handicap."}
                            p = {"Nanterre Hangagée est un programme qui vise à rapprocher un preneur de notes et un élève en situation de handicap. Pour les preneurs de notes, vos efforts ont vocation à être rémunérés. Si vous souhaitez participer à ce programme, ne vous inquiétez pas, la relation preneur de notes étudiants n'est pas automatique. Ainsi, dans cette optique vous ne serez pas engagés dès le premier cours.\nVoici quelques visages de l'association :  "}
                            srcImage = {Rima}
                            name = {"Rima Chihi"}
                            status = {"Présidente"}
                        />
                    </div>
                    <div ref = {this.howDoesItWork}>
                        <HomeInformationItem
                            title = {"Comment ça marche ?"}
                            subtitle = {"En 3 étapes ! Inscription, Synchronisation et Match !"}
                        />
                    </div>
                </div>
                
                <div style={styles.footer}>
                    <h2>Copyright © 2020 All Rights Reserved by Ekko {'&'} Nanterre Hangagée.</h2>
                    <div style={{display: 'flex', paddingLeft: '40%', paddingRight: '40%', width: '20%'}}>    
                        <SocialIcon network="twitter" />
                           
                        <SocialIcon network="facebook"/>
                           
                        <SocialIcon network="youtube" />                     
                     </div>

               </div>


            </div>
        );
    }
}

const styles = {
    forms: {
        width: '100%',
        height: '85vh',
        display: 'flex',
        backgroundImage: "url(https://www.bloghoptoys.fr/wp-content/uploads/2018/07/handicap-etudiant-mesures.jpg)",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        zIndex: 1
    },
    prefooter: {
        width: '100%',
        height: '100vh',
        
    },
    footer: {
        width: '50%',
        margin: 'auto',
        textAlign: 'center'
    }


}
