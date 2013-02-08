var Game = require('../models/Game').Model;

exports.map = function(app, path) {

  // Fetches all current games from mongo
  app.get('/games', get_games);
  // Fetches a game on it's ObjectId
  app.get('/games/:id', get_game);

  // Creates a new games and return the URL to the new document
  app.post('/games', post_game);
  // Creates a document if it doesn't exist, update document if it already exists
  app.put('/games/:id', put_game);
  // Deletes a document
  app.del('/games/:id', del_game );
  
}

// GET /games
var get_games = exports.get_games = function(req, res) {

  Game.find().exec(function(err, docs) {
    if( err ) {
      res.status(500).send(err.toString());
      return;
    }
    res.send(docs);
  })

}

 // GET /game
var get_game = exports.get_game = function(req, res) {

  Game.findById( req.params.id )
      .exec(function(err, doc) {

        if( err ) {
          res.status(500).send(err.toString());
          return;
        }
        
        if( !doc ) {
          res.send(404)
          return;
        }

        res.send(doc);

     });
}

// PUT /games/{id}
var put_game = exports.put_game = function(req, res) {

  Game.findByIdAndUpdate(req.params.id, req.body).exec(function(err, doc) {

    if( err ) {
      res.status(201).send(err.toString());
      return;
    }

    res.send(doc);

  });

}

// DELETE /games/{id}
var del_game = exports.del_game = function(req, res) {

  Game.findByIdAndRemove( req.params.id )
      .exec(function(err, doc) {

        if( err ) {
          res.status(500).send(err.toString());
          return;
        }

        if( doc == 'undefined') {
          res.send(404)
          return
        }

        res.send(200);
      });
}

// POST /games
var post_game = exports.post_game = function(req, res) {
  var game = new Game(req.body);
  game.save(function(err, doc) {
    setDocumentLoacationHeader(res, doc);
    res.status(201).json(doc);
  });

}

function setDocumentLoacationHeader(res, doc) {
  res.setHeader("Location", doc._id );
}
