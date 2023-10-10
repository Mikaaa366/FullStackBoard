const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running...');
});

const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if(NODE_ENV === 'production') dbUri = 'url to remote db';
else if(NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/advertDBtest';
else dbUri = 'mongodb://localhost:27017/advertDB';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ', + err));

//routes
const advertisementRoutes = require('./routes/advertisement.routes');
const authRoutes = require('./routes/auth.routes');

if(process.env.NODE_ENV !== 'production') {
    app.use(
      cors({
        origin: ['http://localhost:3000'],
        credentials: true,
      })
    );
  }
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'zaq12wsx', store: MongoStore.create(mongoose.connection), resave: false, saveUninitialized: false, cookie: {
    secure: process.env.NODE_ENV == 'production',
  }, }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));
//app.use.routes
app.use('/api', advertisementRoutes);
app.use('/auth', authRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
})





module.exports = server;