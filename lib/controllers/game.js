exports.map = function(app, path) {

  app.get('/games', get_games);
  app.post('/games', post_game);

  app.get('/games/:id', get_game);
  app.put('/games/:id', put_game);
  app.del('/games/:id', del_game );
  
}

 // GET /games
var get_game = exports.get_game = function(req, res) {
  if(req.params.id == "existing") {
    res.status(200).send( {name: "existing"} );
  } else {
    res.send(404);
  }
}

// PUT /games/{id}
var put_game = exports.put_game = function(req, res) {
  if(req.params.id == "existing") {
    res.send(204);
  } else {
    res.status(200).send({ name: "notexisting" });
  }
}

// DELETE /games/{id}
var del_game = exports.del_game = function(req, res) {
  if(req.params.id == "existing") {
    res.send(204);
  } else {
    res.send(404);  
  }
}

// POST /games
var post_game = exports.post_game = function(req, res) {
  res.setHeader("Location", "/games/notexisting" );
  res.status(201).json(req.body);
}


// GET /games
var get_games = exports.get_games = function(req, res) {
  res.status(200).json([{name: "existing"}]);
}



