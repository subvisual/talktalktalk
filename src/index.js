import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

window.SpeechRecognition = window.SpeechRecognition ||
                           window.webkitSpeechRecognition ||
                           null;

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
