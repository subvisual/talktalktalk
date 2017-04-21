import React, { Component } from "react";
import { initAudio, audioRecorder, gotBuffers } from "./main";

class RecordSession extends Component {
  constructor(props) {
    super(props);

    if (window.SpeechRecognition !== null) {
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
    initAudio();
  }

  handleRecordClick = () => {
    // Set if we need interim results
    this.recognizer.interimResults = false;

    try {
      this.recognizer.start();
      this.setState({ log: ["Recognition started", ...this.state.log] });

      audioRecorder.clear();
      audioRecorder.record();
    } catch(ex) {
      this.setState({ log: [`Recognition error: ${ex.message}`, ...this.state.log] });
    }
  }

  handleStopClick = () => {
    this.recognizer.stop();
    this.setState({ log: ["Recognition stopped", ...this.state.log] });
    audioRecorder.stop();
    audioRecorder.getBuffers( gotBuffers );
  }

  render() {
    return (
      <div>
        <textarea id="transcription" readOnly="readonly" value={this.state.transcriptionText}></textarea>
        <span>Results:</span>

        <h3>Log</h3>
        <div id="log">{ this.state.log.join("\n") }</div>

        <div className="buttons-wrapper">
          <button id="button-play-ws" className="button-demo" onClick={ this.handleRecordClick }>Play demo</button>
          <button id="button-stop-ws" className="button-demo" onClick={ this.handleStopClick }>Stop demo</button>
          <a id="save" href="#">Save</a>
        </div>
      </div>
    );
  }
}

export default RecordSession;
