const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://s2-et--25lup:qKFmGFpVObnlJhlp@coderinventa.yh4fg.mongodb.net/coderinventa', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => {
    console.log(`Connection Successful`);
}).catch(() => {
    console.error(`No connection`);
});