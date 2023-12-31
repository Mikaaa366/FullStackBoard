const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');

exports.register = async (req, res) => {
    try {
        const { login, password, phone_number } = req.body;
        const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

        if(login && typeof login === 'string' &&
            password && typeof password === 'string' &&
            req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType) &&
            phone_number && typeof phone_number === 'string'
        ) {
            const userWithLogin = await User.findOne({ login });
            if(userWithLogin) {
               return res.status(409).send({ message: 'User with this login already exists' });
            }
            const user = await User.create({ login, password: await bcrypt.hash(password, 10), avatar: req.file.filename, phone_number });
            res.status(201).send({ message: 'User created ' + user.login });
        } else {
            
                fs.unlinkSync(__dirname + `/../public/uploads/${req.file.filename}`);
            
            res.status(400).send({ message: 'Bad request' });
           
        }
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { login, password } = req.body;

        if(login && typeof login === 'string' && password && typeof password === 'string') {
            const user = await User.findOne({ login });
            if(!user) {
                res.status(400).send({ message: 'Login or password are incorrect'});
            }
            else {
                if(bcrypt.compareSync(password, user.password)) {
                    req.session.login = user.login;
                    res.status(200).send({ message: 'Login successful' });
                }
                else {
                    res.status(400).send({ message: 'Login or password are incorrect'});
                }
            }
        } else {
            res.status(400).send({ message: 'Bad request' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getUser = async (req, res) => {
    try {
        const { login } = req.body;
        const user = await User.findOne({ login });
        if(!user) {
            res.status(400).send({ message: 'Login not found'});
        } else {
            return user;
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.logout = async (req, res) => {
    req.session.destroy();
    res.status(200).send({ message: 'Logout'});
}