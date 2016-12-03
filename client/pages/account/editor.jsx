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
    this.state = {value: '',
                  len: 0,
                  logs: new Array(0),
                  idx: 0,
                  content: new Content(this.props.me),
                  logItems: new Array(0),
                };
    this.getCursor = this.getCursor.bind(this);
    this.onChange = this.onChange.bind(this);
    this.sync = this.sync.bind(this);
    this.commit = this.commit.bind(this);
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
      this.state.logItems.push(<InsertItem loc={loc} chr={ch} />);
    } else {
      // delete operation
      loc = this.getCursor();
      type = 'del';
      this.state.logItems.push(<DeleteItem loc={loc} />);
    }

    this.setState({len: text.value.length});
    this.state.logs.push(this.state.content.apply(loc, type, ch));
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
    console.log(this.props.ops[this.props.peer]);
    let len = this.props.ops[this.props.peer].length;
    let idx = this.state.idx;
    while (idx < len) {
      let op = this.props.ops[this.props.peer][idx];
      if (op instanceof Delete) {
        this.state.content.applyDelete(op);
      }

      if (op instanceof Insert) {
        this.state.content.applyInsert(op);
      }

      idx++;
    }

    this.setState({idx: idx, value: this.state.content.toString()});
    this.setState({len: this.state.content.len()});
  }

  // push operations to peer
  commit() {
    for (let x in this.state.logs) {
      this.props.ops[this.props.me].push(this.state.logs[x]);
    }

    while (this.state.logs.length) {
      this.state.logs.pop();
    }

    this.setState({logItems: new Array(0)});
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
                onClick={this.sync}
                >
                Sync
              </button>
            </div>
            <div style={{marginTop: 10}}>
              <SaveImg />
              <button
                style={{marginLeft: 10}}
                className='btn btn-success'
                onClick={this.commit}
                >
                Commit
              </button>
            </div>
          </div>
          <div className="col-lg-3">
            <h3> Uncommited operations: </h3>
            <div style={{overflow: 'scroll', height: 150}}>
              {this.state.logItems}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

module.exports = Editor;
