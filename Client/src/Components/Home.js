import React, { Component } from 'react';
import NavBar from './NavBar'
import HomeInformationItem from './HomeInformationItem'
import Rima from '../Images/Rima.png'
import SignUp from './SignUp'
import FormSignIn from './FormSignIn';

import { SocialIcon } from 'react-social-icons';


class App extends Component {

    constructor(props){
        super(props)

        this.state = {
            printNeed: false,
            printBecome: false,
            overNeed: false,
            overBecome: false,
            sign: false // false = forms for sign up, true = form for sign in
        }

        this.whoAreWe = React.createRef()
        this.howDoesItWork = React.createRef()
        this.Copyright= React.createRef()
    }

    toggleNeed = () => {
        this.setState({printNeed: !this.state.printNeed})
    }

    toggleBecome = () => {
        this.setState({printBecome: !this.state.printBecome})
    }

    moveTo = (i) => {
        switch(i){
            case 0:
                window.scrollTo(0, this.whoAreWe.current.offsetTop);
                break;
            case 1:
                window.scrollTo(0, this.howDoesItWork.current.offsetTop);
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
                        <SignUp
                            mouseOutNeed={() => this.setState({overNeed: false})}
                            mouseOverNeed={() => this.setState({overNeed: true})}
                            overNeed = {this.state.overNeed}
                            toggleNeed = {this.toggleNeed}
                            printNeed = {this.state.printNeed}
                            mouseOutBecome={() => this.setState({overBecome: false})}
                            mouseOverBecome={() => this.setState({overBecome: true})}
                            overBecome = {this.state.overBecome}
                            toggleBecome = {this.toggleBecome}
                            printBecome = {this.state.printBecome}
                            connexion = {() => this.setState({sign: true, printBecome: false, printNeed: false})}
                        />
                    }
                </div>
                <div style={styles.footer}>
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
                
                <div style={styles.footbis}>
                    <div ref = {this.Copyright}>
                        <HomeInformationItem subtitle={"Copyright © 2020 All Rights Reserved by Ekko & Nanterre Hangagée."}/>
                        <SocialIcon url="http://twitter.com" />
                        <SocialIcon url="http://facebook.com/pg/NanterreHangagee/about/?ref=page_internal"/>
                        <SocialIcon url="http://instagram.com" />
                        <SocialIcon url="http://youtube.com" />
                        <SocialIcon url="https://www.linkedin.com/company/nanterre-hangag%C3%A9e/?trk=public_profile_volunteering_position_result-card_full-click&originalSubdomain=fr"/>
                     
                     </div>

               </div>


            </div>
        );
    }
}

export default App;

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
    footer: {
        width: '100%',
        height: '100vh',
        
    },
    footbis: {
        width: '100%',
        display:'flex',
        justifyContent:'center', 
        alignItems:'center'
    }


}
