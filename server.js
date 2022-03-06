const path = require('path');
const express = require('express');
const session = require('express-session')
// import sequelize connection
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Setup Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Setup Sessions
const sess = {
  secret: 'super secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => 
      console.log(`App listening on port ${PORT}!`));
    });