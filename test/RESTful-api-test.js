var APIeasy = require('api-easy')
  , assert = require('assert');

var suite = APIeasy.describe('When working with a simple RESTful API');

var workingItemId;

suite.use('local.dev', 3000)

  // .discuss('When performing REST operations on an existing resource')
  //   .get('/games/existing')
  //     .expect(200, { name: "existing"} )
  //   .put('/games/existing')
  //     .expect(204)
  //   .del('/games/existing')
  //     .expect(204)
  //   .get('/games')
  //     .expect(200, [{name: "existing"}])
  // .undiscuss()

  .discuss('When creating, get, update and delete via the RESTful API')  
     .setHeader('Content-Type', 'application/json')

    .post('/games', { name: "notexisting" })
      .expect(201)
      .expect('Location header to contain an URI to the created resource', function(err, res, body) {
        assert.include(res.headers, "location");
      })
      .expect('Output to be JSON.', function(err, res, body){
        var result = JSON.parse(body);
        assert.isNotNull(result);
        assert.isNotNull(result._id);
      })
      .expect('_id has a value (mongo returns a new object with an id)', function(err, res, body) { 
        var result = JSON.parse(body);
        assert.isNotNull(result._id);
        workingItemId = result._id;
      })
    .get('/games/notexisting')
      .expect(404)
    .del('/games/notexisting')
      .expect(404)
    .del('/game/existing')
    .put('/games/' + workingItemId, { name: 'testing'})
      .expect(200, {name:"notexisting"})
  .undiscuss()

  .export(module);