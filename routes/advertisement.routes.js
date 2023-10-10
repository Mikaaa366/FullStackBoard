const express = require('express');
const router = express.Router();
const AdvertisementController = require('../controllers/advertisement.controller');
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUpload');

router.get('/ads', AdvertisementController.getAllAds);

router.get('/ads/:id', AdvertisementController.getById);

router.post('/ads', authMiddleware, imageUpload.single('photo'), AdvertisementController.postAdd);

router.delete('/ads/:id', authMiddleware, AdvertisementController.deleteAdd);

router.put('/ads/:id', authMiddleware, imageUpload.single('photo'), AdvertisementController.putById);

router.get('/ads/search/:searchPhrase', AdvertisementController.FindByPhrase);

module.exports = router;