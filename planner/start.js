const express = require('express');
const path = require('path');
const swaggerDoc = require('./app/swagger.json');
const swaggerTools = require('swagger-tools');

require('dotenv').config({ path: 'variables.env' }); // import environmental variables from variables.env file

const app = express();

swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
  app.use(middleware.swaggerMetadata());
  app.use(middleware.swaggerValidator({
    validateResponse: false,
  }));
  app.use(middleware.swaggerRouter({
    controllers: path.join(__dirname, 'routes/'),
  }));
  app.use(middleware.swaggerUi());
    app.use((err, req, res, next) => {
        res.status(500).json({ message: err });
        next();
    });

  const server = app.listen(process.env.PORT, () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });

});

