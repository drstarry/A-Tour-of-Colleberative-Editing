'use strict';
import Moment from 'moment';
import React from 'react';
import {Editor, EditorState} from 'draft-js';

const styles = {
  root: {
    fontFamily: '\'Helvetica\', sans-serif',
    padding: 20,
    width: 600,
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 600,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
};

class HomePage extends React.Component {

  constructor(props) {

    super(props);

    this.state = {editorState: EditorState.createEmpty()};

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});
    this.logState = () => console.log(this.state.editorState.toJS());
  }

  componentDidMount() {

    // this.interval = setInterval(this.refreshTime.bind(this), 1000);
  }

  componentWillUnmount() {

    // clearInterval(this.interval);
  }

  render() {
    console.log("asd");
    return (
      <section height="100%" className="section-home container">
        <div className="row">
          <div className="col-sm-8">
            <div style={styles.root}>
              <div style={styles.editor} onClick={this.focus}>
                <Editor
                  editorState={this.state.editorState}
                  onChange={this.onChange}
                  placeholder="Enter your text :)"
                  ref="editor"
                />
              </div>
            </div>
          </div>
          <div className="col-sm-4">

          </div>
        </div>
      </section>
    );
  }
}

module.exports = HomePage;
