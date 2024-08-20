const express = require("express");
const config = require('./config/config.json');
const router = require("./router");
const Sequelize = require("sequelize");
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerOptions');

const { preloadImages } = require('./imageHelper.js');

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
		return res.status(200).json({});
	}
	next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mounting routers

app.use("/api", router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Get the environment from the NODE_ENV environment variable, defaulting to 'development'
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Create Sequelize instance
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
	host: dbConfig.host,
	dialect: dbConfig.dialect,
	define: {
		timestamps: true,  // Incluir timestamps por defecto
	}
});

// Test database connection
sequelize
	.authenticate()
	.then(() => {
		console.log('Connected to the database successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});
	
// Preload images at application startup
preloadImages();

module.exports = app;