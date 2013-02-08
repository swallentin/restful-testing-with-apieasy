var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , GameSchema = new Schema({
    'name': { type: String }
  });

exports.Schema = GameSchema;
exports.Model = mongoose.model('Game', GameSchema);