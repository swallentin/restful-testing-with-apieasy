var APIeasy = require('api-easy')
  , assert = require('assert');

var suite = APIeasy.describe('When working with a simple RESTful API');

suite.use('local.dev', 3000)

  .discuss('When performing REST operations on an existing resource')
    .get('/games/existing')
      .expect(200, { name: "existing"} )
    .put('/games/existing')
      .expect(204)
    .del('/games/existing')
      .expect(204)
    .get('/games')
      .expect(200, [{name: "existing"}])
  .undiscuss()

  .discuss('When performing REST on a non existing resource')  
     .setHeader('Content-Type', 'application/json')
    .get('/games/notexisting')
      .expect(404)
    .put('/games/notexisting')
      .expect(200, {name:"notexisting"})
    .del('/games/notexisting')
      .expect(404)
    .post('/games', { name: "notexisting" })
      .expect(201, { name: "notexisting" })
      .expect('Location header to contain URI to the created resource', function(err, res, body) {
        assert.include(res.headers, "location");
        assert.equal(res.headers["location"], "/games/notexisting");
      })
  .undiscuss()

  .export(module);