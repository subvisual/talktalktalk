import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
console.log(this);
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

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          <textarea id="transcription" readOnly="readonly" value={this.state.transcriptionText}></textarea>

          <span>Results:</span>

          <h3>Log</h3>
          <div id="log">{ this.state.log.join("\n") }</div>

          <div className="buttons-wrapper">
            <button id="button-play-ws" className="button-demo" onClick={ this.handlePlayClick }>Play demo</button>
            <button id="button-stop-ws" className="button-demo" onClick={ this.handleStopClick }>Stop demo</button>
          </div>
          <span id="ws-unsupported" className="hidden">API not supported</span>
        </div>
      </div>
    );
  }
}

export default App;
