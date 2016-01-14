var express    = require( 'express' );
var bodyParser = require( 'body-parser' );
var server     = express();
// var route      = express.Router();

server.use( express.static( 'public' ));
server.use(bodyParser.urlencoded({ extended: true}));

var buzzArrObj = [];
var score = 0;

server.get('/', function (req, res) {
  res.render( './index.html' );
});

server.get('/buzzwords', function (req, res) {
  res.send({ buzzwords: buzzArrObj });
});

server.route('/buzzword')
  .post( function (req, res) {

    //check for duplicate before pushing b word to array
    if( buzzArrObj.length > 0 ) {
      for( var i = 0; i < buzzArrObj.length; i++ ) {
        if( buzzArrObj[i].buzzWord === req.body ) {
          var message = res.send({
           'success' : false,
           'message' : 'Please, choose a different buzzword'
         });
          return res.send( message );
        }
      }
    }
    buzzArrObj.push( req.body );
    res.send({ 'success' : true });
  })

  .put( function (req, res) {

    //check to see if the b word exist, true => take that object
    //and update points into newScore
    if( buzzArrObj.length > 0 ) {
      for(var i = 0; i < buzzArrObj.length; i++ ) {
        if( buzzArrObj[i].buzzWord === req.body.buzzWord ) {
          var message = res.send({
            'success' : true,
            'newScore' : points
          });
          return res.send( message );
        }
      }
    }
    // var reqBody = req.body;

    // score += parseInt(req.body.points);

    // res.send({
    //   'success' : true,
    //   'newScore' : score
    // });
  })

  .delete( function (req, res) {
    res.send({
      'success' : true
    });
  });
var server = server.listen( 8080, function ( ) {
  var host = 'localhost';
  var port = 8080;

  console.log( 'Example server listening at http://%s:%s', host, port );
});