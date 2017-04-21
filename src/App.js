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

    if (window.SpeechRecognition === null) {
      document.getElementById('ws-unsupported').classList.remove('hidden');
      document.getElementById('button-play-ws').setAttribute('disabled', 'disabled');
      document.getElementById('button-stop-ws').setAttribute('disabled', 'disabled');
    } else {
      this.recognizer = new window.SpeechRecognition();
      this.state = {
        transcriptionText: "",
        log: [],
        persons: [],
        sessions: []
      };

      // Recogniser doesn't stop listening even if the user pauses
      this.recognizer.continuous = true;
      this.recognizer.lang = "pt-PT";

      // Start recognising
      this.recognizer.onresult = (event) => {
        this.setState({ transcriptionText: "" });

        for (var i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            this.setState({
              transcriptionText: `${event.results[i][0].transcript} (Confidence: ${event.results[i][0].confidence})`,
            });
          } else {
            this.setState({
              transcriptionText: `${this.state.transcriptionText}${event.results[i][0].transcript}`,
            });
          }
        }
      };

      // Listen for errors
      this.recognizer.onerror = (event) => {
        this.setState({
          log: [`Recognition error: ${event.message}`, ...this.state.log],
        });
      };
    }
  }

  componentDidMount() {
    console.log(this.state);
  }

  handlePlayClick = () => {
    // Set if we need interim results
    this.recognizer.interimResults = false;

    try {
      this.recognizer.start();
      this.setState({ log: ["Recognition started", ...this.state.log] });
    } catch(ex) {
      this.setState({ log: [`Recognition error: ${ex.message}`, ...this.state.log] });
    }
  }

  handleStopClick = () => {
    this.recognizer.stop();
    this.setState({ log: ["Recognition stopped", ...this.state.log] });
  }

  onLogin (person){
    console.log('login ', person, this.state);
    this.setState({persons: person});
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        {
          (this.state.persons.length > 0) ? (<Home></Home>) : (<Login onLogin={this.onLogin.bind(this)}></Login>)
        }
        <RecordSession />
      </MuiThemeProvider>
    );
  }
}

export default App;
