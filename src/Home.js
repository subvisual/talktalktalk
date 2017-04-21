import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <RaisedButton label="Add Persons" />
        <RaisedButton label="Start Session" />
      </div>
    );
  }
}
