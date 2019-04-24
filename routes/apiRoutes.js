let db = require('../models');

module.exports = function(app, axios, cheerio) {
  app.get('/scrape', function(req, res) {
    axios
      .get(
        'https://communityimpact.com/news/austin/round-rock-pflugerville-hutto/'
      )
      .then(function(response) {
        // Load the Response into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        let $ = cheerio.load(response.data);

        // An empty array to save the data that we'll scrape
        let results = {};

        // With cheerio, find each p-tag with the "title" class
        // (i: iterator. element: the current element)
        $('article').each(function(i, element) {
          //Used for article and link
          let common = $(element).find('h1');

          //Find the dat posted
          results.time = $(element)
            .find('.posted-on')
            .text();

          // Save the text of the element in a "title" variable
          results.title = common.text().replace(/\s\s+/g, '');

          // In the currently selected element, look at its child elements (i.e., its a-tags),
          // then save the values for any "href" attributes that the child elements may have
          results.link = common.children().attr('href');

          // Create a new Article using the `result` object built from scraping
          db.Article.create(results)
            .then(function(dbArticle) {
              // View the added result in the console
              console.log(dbArticle);
            })
            .catch(function(err) {
              // If an error occurred, log it
              console.log(err);
            });
        });
      });

    // Send a message to the client
    res.send("You've been scrapped");
  });

  // Route for getting all Articles from the db
  app.get('/articles', function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .sort('_id')
      .then(function(dbArticle) {
        //
        // If we were able to successfully find Articles, send them back to the client
        res.render('index', { article: dbArticle });
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
};
