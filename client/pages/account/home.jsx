'use strict';
import Moment from 'moment';
import React from 'react';
import {styles} from './styles';

import Content from '../../../CRDT/Content';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: '', len: 0, user: 'daidai'};
    this.content = Content(this.state.user);
    this.getCursor = this.getCursor.bind(this);
    this.onChange = this.onChange.bind(this);
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

  render() {
    return (
      <section className="section-home container">
        <div className="row">
          <div className="col-sm-8">
            <textarea
              ref='text'
              id='text'
              style={styles}
              value={this.state.value}
              onChange={this.onChange}
            />
          </div>
          <div className="col-sm-4">

          </div>
        </div>
      </section>
    );
  }
}

module.exports = HomePage;
