import React, { Component } from 'react';
import axios from 'axios'

class Home extends Component {

    createUser = async () => {
        let data = {name: "Jean", password: "azertyuiop"}

        const response = await axios.post(
            '/api/createUser',
            data,
            { headers: { 'Content-Type': 'application/json' } }
          )
          console.log(response.data)

    }

    render() {
        return (
            <div className="App">
                <h1>Project Home</h1>
                <button variant="raised" onClick={this.createUser}>
                    Create new user
                </button>
            </div>
        );
  }
}
export default Home;