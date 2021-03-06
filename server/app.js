const express = require('./express');

module.exports.start = function() {
    const app = express.init();
    const port = process.env.PORT || 8080;
    app.listen(port, () =>
        console.log(`Server now running on port `, port)
    );
};