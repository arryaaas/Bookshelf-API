const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    // Enable CORS on all routes on the server.
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  // When using the AirBnB code style,
  // Using the console will be considered a warning.
  // Add "no-console": "off" to the rules in .eslintrc.json
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
