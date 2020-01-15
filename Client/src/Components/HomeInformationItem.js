import React, { Component } from 'react';

class HomeInformationItem extends Component {

    render()
    {
        return(
            <div>
                <h1 style={styles.infos_title}>{this.props.title}</h1>
                <h2 style={styles.infos_subtitle}>{this.props.subtitle}</h2>
                <p style={styles.infos_p}>{this.props.p}</p>
                <div style={styles.infos_portraits}>
                    <img style={styles.portraits} src={this.props.srcImage} alt={this.props.name}/>
                    {
                        this.props.srcImage ? 
                            <div style={{display: " inline"}}>
                                <h1 style={{marginBottom: 0, color: "#36cf5a"}}>{this.props.name}</h1>
                                <h4 style={{marginTop: 0 }}>{this.props.status}</h4>
                            </div>
                            :
                            null
                    }
                </div>
            </div>
        );
    }
}

export default HomeInformationItem;

const styles = {
    infos_title: {
        font: 'bold 48px Arial',
        color: "#EC670A",
        position: 'relative',
        marginLeft: "20%",
        marginTop: "15vh",
    },
    infos_subtitle: {
        font: 'bold 18px Arial',
        color: "black",
        position: 'relative',
        marginLeft: "20%",
        marginRight: "20%"
    },
    infos_p: {
        font: 'Arial',
        position: 'relative',
        marginLeft: "20%",
        marginRight: "20%",
        marginBottom: 0
    },
    infos_portraits: {
        position: 'relative',
        marginLeft: "20%",
        marginRight: "20%",
        display: "flex"
    },
    portraits: {
        marginTop: 15,
        width: "200px",
        marginRight: 20
    }
}
