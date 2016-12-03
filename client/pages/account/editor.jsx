'use strict';
import React from 'react';
import {styles, SyncImg, SaveImg, EditorTitle, InsertItem, DeleteItem}
from './styles';

import Content from '../../../CRDT/Content';
import Delete from '../../../CRDT/Delete';
import Insert from '../../../CRDT/Insert';

class Editor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: '', len: 0, logs: []};
    this.content = new Content(this.props.me);
    this.getCursor = this.getCursor.bind(this);
    this.onChange = this.onChange.bind(this);
    this.sync = this.sync.bind(this);
    this.commit = this.commit.bind(this);
  }

  componentDidUpdate() {
  }

  onChange(evt) {
    const text = this.refs.text;
    this.setState({value: evt.target.value});
    let loc;
    let ch = null;
    let type;
    if (text.value.length > this.state.len) {
      // insert operation
      loc = this.getCursor() - 1;
      ch = evt.target.value[loc];
      type = 'ins';
    } else {
      // delete operation
      loc = this.getCursor();
      type = 'del';
    }
    console.log(`${loc}, ${type}, ${ch}`);
    this.setState({len: text.value.length});
    // op = this.content.apply(loc, type, ch);
  }

  getCursor() {
    const text = this.refs.text;
    let CaretPos = 0;

    // IE Support
    if (document.selection) {
      text.focus();
      let Sel = document.selection.createRange();
      Sel.moveStart('character', -text.value.length);
      CaretPos = Sel.text.length;
    } else if (text.selectionStart || text.selectionStart == '0')
      CaretPos = text.selectionStart;
    return CaretPos;
  }

  // pull operations from peer
  sync() {

  }

  // push operations to peer
  commit() {

  }

  render() {
    return (
      <section className="section-home container">
        <EditorTitle node={this.props.me} />
        <div className="row">
          <div className="col-lg-7">
            <textarea
              ref='text'
              id='text'
              style={styles}
              value={this.state.value}
              onChange={this.onChange}
            />
          </div>
          <div className="col-lg-2">
            <div style={{marginTop: 10}}>
              <SyncImg />
              <button
                style={{marginLeft: 10}}
                className='btn btn-warning'
                >
                Sync
              </button>
            </div>
            <div style={{marginTop: 10}}>
              <SaveImg />
              <button
                style={{marginLeft: 10}}
                className='btn btn-success'
                // onclick =
                >
                Commit
              </button>
            </div>
          </div>
          <div className="col-lg-3">
            <InsertItem chr='a' loc={0}/>
            <DeleteItem loc={5} />
          </div>
        </div>
      </section>
    );
  }
}

module.exports = Editor;
