import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import RecordSession from './RecordSession';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from './Login.js';
import Home from './Home.js';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      sessions: []
    };
  }

  onLogin (person){
    console.log('login ', person, this.state);
    this.setState({persons: [person]});
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          {
            (this.state.persons.length > 0) ? (<Home></Home>) : (<Login onLogin={this.onLogin.bind(this)}></Login>)
          }
          <RecordSession></RecordSession>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
