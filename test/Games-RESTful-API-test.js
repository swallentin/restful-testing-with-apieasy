var APIeasy = require('api-easy')
  , assert = require('assert')
  , mongoose = require('mongoose')
  , app = require('../app');

var suite = APIeasy.describe('Testing the /games RESTful API.');

var game = {
  _id: new mongoose.Types.ObjectId,
  name: 'new-game'
};

suite.use('local.dev', 3000)

  .discuss('When creating a document via ')
    // this header is important, without it express will not trigger the POST action
    .setHeader('Content-Type', 'application/json')
    .post('/games', game)
      .expect(201)
      .expect('should contain location header with an url to the new document', function(err, res, body) {
        assert.include(res.headers, "location");
      })
  .undiscuss()

  .discuss('When fetching an existing document via')
    .next()
    .get('/games/'+game._id)
      .expect(200)
  .undiscuss()

  .discuss('When updating an existing created document via')
    .next()
    .put('/games/'+game._id, { name: 'new-game-name'} )
      .expect(200)
      .expect('should contain the update', function(err, res, body) {
        var result = JSON.parse(body);
        assert.equal(result.name, 'new-game-name');
      })
  .undiscuss()

  .discuss('When fetching a games collection')
    .next()
    .get('/games')
      .expect(200)
      .expect('should contain a previously created document', function(err, res, body) {
        var result = JSON.parse(body);
        var containsDocument = false;

        result.forEach(function(doc) {
          if(doc._id == game._id) {
            containsDocument=true;
            return;
          }
        });
        assert.isTrue(containsDocument);
      })
  .undiscuss()

  .discuss('When deleting an existing via')
    .next()
    .del('/games/'+game._id)
      .expect(200)
  .undiscuss()


  .discuss('When fetching a non-existing document via')
    .next()
    .get('/games/'+game._id)
      .expect(404)
  .undiscuss()

  .export(module);