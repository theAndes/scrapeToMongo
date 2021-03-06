var db = require('../models');

module.exports = function(app) {
  // Load index page
  app.get('/', function(req, res) {
    res.render('index', {
      msg: 'Welcome! This is the Cheerio MongoDB Demo'
    });
  });
  // app.get('/scrape', function(req, res) {
  //   res.render('scrape');
  // });

  // Render 404 page for any unmatched routes
  app.get('*', function(req, res) {
    res.render('404', {
      tittle: 'The 404 Page'
    });
  });
};
