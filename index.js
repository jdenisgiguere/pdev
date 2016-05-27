/**
 * Created by jdgiguere on 16-05-27.
 */

var port = process.env['PORT'] || 8080;

var express = require('express');

var main = express();

main.get('/', function(req, res) {
    res.send('Hello world!')
});

main.use(express.static('static'));

main.listen(port, function() {
    console.log('We are running on port ' + port);
});