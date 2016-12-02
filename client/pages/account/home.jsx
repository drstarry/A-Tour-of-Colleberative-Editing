'use strict';
import React from 'react';

import Editor from './editor';
import Delete from '../../../CRDT/Delete';
import Insert from '../../../CRDT/Insert';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.props = new Array();
  }

  render() {
    return (
      <section className="section-home container">
        <Editor me={0} peer={1}/>
        <Editor me={1} peer={0}/>
      </section>
    );
  }
}

module.exports = HomePage;
