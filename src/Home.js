import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  onAddPersons() {

  }

  onStartSession() {

  }

  render() {
    return (
      <div>
        <RaisedButton onClick={this.onAddPersons} label="Add Persons" />
        <RaisedButton onClick={this.onStartSession} label="Start Session" />
      </div>
    );
  }
}
