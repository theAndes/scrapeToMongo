var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({
  //scrape date
  date: {
    type: Date,
    default: Date.now
  },
  //Article posted
  time: {
    type: String
  },
  // `title` is required and of type String
  title: {
    type: String
  },
  // `link` is required and of type String
  link: {
    type: String
  }
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model('Article', ArticleSchema);

// Export the Article model
module.exports = Article;
