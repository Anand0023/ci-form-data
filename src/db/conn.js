const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ciContactData', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => {
    console.log(`Connection Successful`);
}).catch(() => {
    console.error(`No connection`);
});