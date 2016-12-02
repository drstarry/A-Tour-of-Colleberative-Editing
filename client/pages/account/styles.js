'use strict';
import React from 'react';

export const styles = {
  fontFamily: '\'Indie Flower\', cursive',
  padding: 20,
  width: 'inherit',
  fontSize: 'large',
  cursor: 'text',
  minHeight: 250,
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
