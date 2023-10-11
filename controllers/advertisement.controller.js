const Advertisement = require('../models/advertisement.model');

const escapeHtml = (unsafe) => {
    return unsafe.replace(/[&<"']/g, (match) => {
      switch (match) {
        case '&':
          return '&amp;';
        case '<':
          return '&lt;';
        case '"':
          return '&quot;';
        case "'":
          return '&#039;';
        default:
          return match;
      }
    });
  };

exports.getAllAds = async (req, res) => {
    try {
        const advert = await Advertisement.find().populate('seller');
        res.json(advert);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
        const advert = await Advertisement.findById(req.params.id).populate('seller');
        if(!advert) res.status(404).json({ message: 'Not found...' });
        else res.json(advert);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.postAdd = async (req, res) => {
    try {
        const { title, content, publish_date, price, location } = req.body;
        const fileType = req.file ? await getImageFileType(req.file) : 'unknown'

        if(title && content && publish_date && price && location && req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
            const escapedTitle = escapeHtml(title);
            const escapedContent = escapeHtml(content);
            const escapedDate = escapeHtml(publish_date);
            const escapedPrice = escapeHtml(price);
            const escapedLocation = escapeHtml(location);
            if(
                (escapedTitle.length >= 10 && escapedTitle.length <= 50) &&
                (escapedContent.length >= 20 && escapedContent.length <= 1000)
            ) {
                const newAdd = new Advertisement({ title: escapedTitle, content: escapedContent, publish_date: escapedDate, photo: req.file.filename, price: escapedPrice, location: escapedLocation, seller: req.session.login });
                await newAdd.save();
                res.json({ message: 'OK' });
            } else {
                if (req.file) {
                    fs.unlinkSync(__dirname + `/../public/uploads/${req.file.filename}`);
                }
                throw new Error('Wrong input!');
            }
        } else {
            if (req.file) {
                fs.unlinkSync(__dirname + `/../public/uploads/${req.file.filename}`);
            }
            throw new Error('Wrong input!');
        }
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.deleteAdd = async (req, res) => {
    try {
        const advert = await Advertisement.findById(req.params.id);
        if(advert && (req.session.login === advert.seller)) {
            await Advertisement.deleteOne({ _id: req.params.id });
            res.json({ deletedAdd: advert });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.putById = async (req, res) => {
    const { title, content, publish_date, price, location } = req.body;
    try {
        const advert = await Advertisement.findById(req.params.id);
        const fileType = req.file ? await getImageFileType(req.file) : 'unknown'
        if (title && content && publish_date && price && location) {
            
            if (advert && req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
                const escapedTitle = escapeHtml(title);
                const escapedContent = escapeHtml(content);
                const escapedDate = escapeHtml(publish_date);
                const escapedPrice = escapeHtml(price);
                const escapedLocation = escapeHtml(location);
                
                if (
                    (escapedTitle.length >= 10 && escapedTitle.length <= 50) &&
                    (escapedContent.length >= 20 && escapedContent.length <= 1000)
                ) {
                    if(req.file.name){
                        await Advertisement.updateOne({ _id: req.params.id }, { $set: { title: escapedTitle, content: escapedContent, publish_date: escapedDate, photo: req.file.filename, price: escapedPrice, location: escapedLocation, seller: req.session.login }});
                        const updatedAdd = await Advertisement.findById(req.params.id);
                        res.json({ UpdatedAdd: updatedAdd });
                    }
                    else {
                        await Advertisement.updateOne({ _id: req.params.id }, { $set: { title: escapedTitle, content: escapedContent, publish_date: escapedDate, photo: advert.photo, price: escapedPrice, location: escapedLocation, seller: req.session.login }});
                        const updatedAdd = await Advertisement.findById(req.params.id);
                        res.json({ UpdatedAdd: updatedAdd });
                    }
                } else {
                    if (req.file) {
                        fs.unlinkSync(__dirname + `/../public/uploads/${req.file.filename}`);
                    }
                    throw new Error('Wrong input!');
                }
            } else {
                if (req.file) {
                    fs.unlinkSync(__dirname + `/../public/uploads/${req.file.filename}`);
                }
                res.status(404).json({ message: 'Not found...' });
            }
        } else {
            if (req.file) {
                fs.unlinkSync(__dirname + `/../public/uploads/${req.file.filename}`);
            }
            throw new Error('Wrong input!');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.FindByPhrase = async (req, res) => {
    const searchPhrase = req.params.searchPhrase;
    try {
        const results = await Advertisement.find({
            $or: [
                { title: { $regex: searchPhrase, $options: 'i' } },
                { content: { $regex: searchPhrase, $options: 'i' } },
                { location: { $regex: searchPhrase, $options: 'i' } },
                { seller: { $regex: searchPhrase, $options: 'i' } },
            ],
        }).populate('seller');
        res.json({ results: results });
    } 
    catch(err) {
        res.status(500).json({ message: err });
    }
};