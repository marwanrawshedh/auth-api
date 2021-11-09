'use strict';

const express = require('express');
const app = express();
// 3rd Party Resources

const cors = require('cors');
const morgan = require('morgan');

const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const authRoutes = require('./auth/routes.js');
const logger = require('./middleware/logger.js');
const v1Routes = require('./routes/v1.js');
// App Level MW
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));



app.use(express.json());

app.use(logger);

app.use('/api/v1', v1Routes);
app.use('/api/v2',authRoutes);

// Routes
app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
