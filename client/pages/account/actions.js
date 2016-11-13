/* global window */
'use strict';
import ApiActions from '../../actions/api';
const Constants = require('../login/constants');
const ReturnUrlActions = require('../../actions/return-url');
const LoginStore = require('../home/store');

class Actions {

  static login(data) {

    ApiActions.get(
      '/api/accounts/all',
      undefined,
      LoginStore,
      Constants.LOGIN,
      Constants.LOGIN_RESPONSE,
      (err, response) => {

        if (!err) {
          const returnUrl = window.localStorage.getItem('returnUrl');

          if (returnUrl) {
            ReturnUrlActions.clearReturnUrl();
            window.location.href = returnUrl;
          }
          else if (response.user.roles.admin) {
            window.location.href = '/admin';
          }
          else {
            window.location.href = '/account';
          }
        }
      }
    );
  }

}

module.exports = Actions;
