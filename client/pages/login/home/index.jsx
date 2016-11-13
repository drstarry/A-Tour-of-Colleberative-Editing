'use strict';
import Actions from '../actions';
import Button from '../../../components/form/button.jsx';
import ControlGroup from '../../../components/form/control-group.jsx';
import React from 'react';
import Link from 'react-router';
import Spinner from '../../../components/form/spinner.jsx';
import Store from './store';
import TextControl from '../../../components/form/text-control.jsx';
import Markdown from 'react-remarkable';

class HomePage extends React.Component {
  constructor(props) {

    super(props);

    this.input = {};
    this.state = Store.getState();
  }

  componentDidMount() {

    this.unsubscribeStore = Store.subscribe(this.onStoreChange.bind(this));

    if (this.input.username) {
      this.input.username.focus();
    }
  }

  componentWillUnmount() {

    this.unsubscribeStore();
  }

  onStoreChange() {

    this.setState(Store.getState());
  }

  handleSubmit(event) {

    event.preventDefault();
    event.stopPropagation();

    Actions.login({
      username: this.input.username.value(),
      password: this.input.password.value(),
    });
  }

  render() {

    const alerts = [];

    if (this.state.success) {
      alerts.push(<div key="success" className="alert alert-success">
        Success. Redirecting...
      </div>);
    }

    if (this.state.error) {
      alerts.push(<div key="danger" className="alert alert-danger">
        {this.state.error}
      </div>);
    }

    let formElements;

    if (!this.state.success) {
      formElements = <fieldset>
        <TextControl
          ref={(c) => (this.input.username = c)}
          name="username"
          label="Username/Email"
          hasError={this.state.hasError.username}
          help={this.state.help.username}
          disabled={this.state.loading}
        />
        <TextControl
          ref={(c) => (this.input.password = c)}
          name="password"
          label="Password"
          type="password"
          hasError={this.state.hasError.password}
          help={this.state.help.password}
          disabled={this.state.loading}
        />
        <ControlGroup hideLabel={true} hideHelp={true}>
          <Button
            type="submit"
            inputClasses={{ 'btn-primary': true }}
            disabled={this.state.loading}>
            Login
            <Spinner space="left" show={this.state.loading} />
          </Button>
          <br/>
          <br/>
          <a
            className='btn btn-success'
            href="/signup"
            >
            Signup
          </a>
          &nbsp;
          <a
            className='btn btn-warning'
            href="/login/forgot"
            >
            Reset your password
          </a>
        </ControlGroup>
      </fieldset>;
    }
    const input = '# This is a header\n\nAnd this is a paragraph';
    return (
      <div>
      <section>
        <h1 className="page-header">
          <img
            className="navbar-logo"
            src="/public/media/login.png"
            />
          Sign in
        </h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          {alerts}
          {formElements}
        </form>
      </section>

      </div>
    );
  }
}

module.exports = HomePage;
