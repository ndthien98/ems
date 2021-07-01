require('dotenv').config();

const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');

const { errorHandler } = require('./middlewares/catchError');
const pagination = require('./middlewares/pagination')
const logger = require('./utils/logUtil');

const app = express();

// Cross Origin Sharing Resource
const corsOptions = {
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
};

app.use(cors(corsOptions));

// Enable Log
app.use(helmet());
app.use(
  morgan('combined', {
    stream: {
      write: message => {
        logger.info(message);
      },
    },
  }),
);

// Pagination
app.use(pagination)

// Body Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));

// Routes definition
const routes = require('./routers')
routes.map(e => app.use(`${e.path}`, e.route))
app.get('/', (req, res) => res.send(`API is running at ${PORT}`))
// End of routes definition

// Error handler 
app.use(errorHandler);
app.use('*', (req, res) => {
  res.status(400).send({
    status: false,
    message: 'API not found: ' + req.originalUrl
  })
})

const PORT = process.env.PORT;

// Start server 
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

