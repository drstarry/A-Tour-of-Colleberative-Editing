/* global window */
'use strict';

import HomePage from './home';
import React from 'react';
import ReactDOM from 'react-dom';

class Page {
  static blastoff() {

    this.mainElement = ReactDOM.render(
      <HomePage />,
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
