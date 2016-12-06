/* global window */
'use strict';

import  Form from './form.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

class Page {
  static blastoff() {

    this.mainElement = ReactDOM.render(
      <Home />,
      window.document.getElementById('app-mount')
    );
  }
}

module.exports = Page;

/* $lab:coverage:off$ */
if (!module.parent) {
  window.page = Page;
  Page.blastoff();
}
/* $lab:coverage:on$ */
