const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) { console.log('Succesfully connected to database.'); }
    else { console.log('Could not connect to database: ' + JSON.stringify(err, undefined, 2)); }
});

require('./user.model');