const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');


const app = express();

const allowedOrigins = ['http://localhost:3000', 'http://localhost:8000'];

if(process.env.NODE_ENV !== 'production') {
  app.use(cors({
    origin: function(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow external access...';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true  
  }));
}

const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if(NODE_ENV === 'production') dbUri = 'url to remote db';
else if(NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/advertDBtest';
else dbUri = 'mongodb://localhost:27017/advertDB';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running...');
});



db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ', + err));

//routes
const advertisementRoutes = require('./routes/advertisement.routes');
const authRoutes = require('./routes/auth.routes');
//const userRoutes = require('./routes/user.routes');

app.use(session({ 
  secret: process.env.secret,
  store: MongoStore.create({
    mongoUrl: dbUri,
    ttl: 3600,
    autoRemove: 'native',
    }), 
    resave: false, 
    saveUninitialized: false, 
    cookie: {
      secure: process.env.NODE_ENV == 'production',
      maxAge: 3600000,
  },
}));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));
//app.use.routes
app.use('/api', advertisementRoutes);
app.use('/auth', authRoutes);
//app.use('/api', userRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
})

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});



module.exports = server;