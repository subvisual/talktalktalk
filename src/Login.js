import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      person: 'Tânia',
    };
  }

  handleChange = (event) => {
    this.setState({
      person: event.target.value,
    });
  };
  onLogin(){
    this.props.onLogin(this.state.person);
  }
  render() {
    return (
      <div>
        <TextField
          id='text-field-controlled'
          value={this.state.person}
          onChange={this.handleChange}
        />
      <RaisedButton onClick={this.onLogin.bind(this)} label="LOGIN" />
      </div>
    );
  }
}
