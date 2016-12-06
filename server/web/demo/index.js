'use strict';

exports.register = function(server, options, next) {

  server.route({
    method: 'GET',
    path: '/demo',
    handler: function(request, reply) {
      reply.view('demo/index');
    },
  });

  next();
};

exports.register.attributes = {
  name: 'web/demo',
};
