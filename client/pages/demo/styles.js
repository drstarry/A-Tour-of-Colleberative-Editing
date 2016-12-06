'use strict';
import React from 'react';

export const styles = {
  fontFamily: '\'Indie Flower\', cursive',
  padding: 20,
  width: 600,
  fontSize: 30,
  cursor: 'text',
  minHeight: 200,
  marginTop: 10,
  boxShadow: 'none',
};

export class SyncImg extends React.Component {
  render() {
    return (<img
      style={{width: 50, height: 50}}
      src="/public/media/update.png"
    />);
  }
}

export class SaveImg extends React.Component {
  render() {
    return <img
      style={{width: 50, height: 50}}
      src="/public/media/save.png"
    />;
  }
}

export class EditorTitle extends React.Component {
  render() {
    return <h2 className="page-header">
      <img
        className="navbar-logo"
        src="/public/media/logo.png"
        />
        Node {this.props.node}
    </h2>;
  }
}

export class InsertItem extends React.Component {
  render() {
    return <h3>
      <span className="glyphicon glyphicon-plus"></span> {this.props.chr} at location {this.props.loc}
      </h3>;
  }
}

export class DeleteItem extends React.Component {
  render() {
    return <h3>
      <span className="glyphicon glyphicon-minus"></span> at location {this.props.loc}
      </h3>;
  }
}
