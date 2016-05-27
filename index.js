/**
 * Created by jdgiguere on 16-05-27.
 */

var port = process.env['PORT'] || 8080;

var express = require('express');

var maki = require('maki');

var main = express();

//Static files
main.use(express.static('static'));
main.use('/maki', express.static('node_modules/maki'));

main.get('/', function(req, res) {
    res.send('Hello world!')
});


main.get('/bandes-riveraines/apprendre-plus', function(req, res) {
    bookIcon = '/maki/icons/' + 'library' + '-15.svg';
    res.send('<html><head><link rel="stylesheet" type="text/css" href="/css/bouton.css"></head><body><a href="http://banderiveraine.org/" target="_blank" class="lien_bouton"><div class="action_bouton"><div><img src="' +
        bookIcon +
        '" width="80px" height="80px"/> <p>En apprendre davantage sur les bandes riveraines</p></div></div></a></body></html>')
});

main.get('/bandes-riveraines/choisir-vegetaux', function(req, res) {
    gardenIcon = '/maki/icons/' + 'graden' + '-15.svg';
    res.send('<html><head><link rel="stylesheet" type="text/css" href="/css/bouton.css"></head><body><a href="http://banderiveraine.org/choisir-les-vegetaux/" target="_blank" class="lien_bouton"><div class="action_bouton"><div><img src="' +
        gardenIcon + '" width="80px" height="80px"/> <p>Choisir les végétaux</p></div></div></a></body></html>')
});


main.listen(port, function() {
    console.log('We are running on port ' + port);
});