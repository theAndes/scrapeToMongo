let db = require("../models");

module.exports = function(app, axios, cheerio) {
  axios
    .get(
      "https://communityimpact.com/news/austin/round-rock-pflugerville-hutto/"
    )
    .then(function(response) {
      // Load the Response into cheerio and save it to a variable
      // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
      let $ = cheerio.load(response.data);

      // An empty array to save the data that we'll scrape
      let results = [];

      // With cheerio, find each p-tag with the "title" class
      // (i: iterator. element: the current element)
      $("article").each(function(i, element) {
        
        //Used for artciel and link
        let common = $(element).find("h1");
        
        //Find the dat posted
        let time = $(element)
          .find(".posted-on")
          .text();

        // Save the text of the element in a "title" variable
        let title = common.text().replace(/\s\s+/g, "");

        // In the currently selected element, look at its child elements (i.e., its a-tags),
        // then save the values for any "href" attributes that the child elements may have
        let link = common.children().attr("href");

        // Save these results in an object that we'll push into the results array we defined earlier
        results.push({
          time,
          title,
          link
        });
      });

      // Log the results once you've looped through each of the elements found with cheerio
      console.log(results);
    });
};
