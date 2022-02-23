const path = require('path');
const express = require('express');
const routes = require('./controllers');
// import sequelize connection
const sequelize = require('./config/connection');

// Setup Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => 
      console.log(`App listening on port ${PORT}!`));
    });