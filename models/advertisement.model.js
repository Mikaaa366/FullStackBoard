const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    publish_date: { type: String, required: true },
    photo: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true},
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
});

module.exports = mongoose.model('Advertisement', advertisementSchema);