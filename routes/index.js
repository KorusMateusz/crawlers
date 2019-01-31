var express = require('express');
var router = express.Router();
const gw2tpPriceCrawler =  require("../crawlers/gw2tpPriceCrawler");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/gw2tp', function(req, res, next) {
  gw2tpPriceCrawler();
  res.send('crawler activated');
});

module.exports = router;
