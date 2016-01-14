var express    = require( 'express' );
var bodyParser = require( 'body-parser' );
var server     = express();

server.use( express.static( 'public' ));
server.use(bodyParser.urlencoded({ extended: true}));

var buzzObjectArr = [];
var score = 0;

server.get('/', function (req, res) {
  res.render( './index.html' );
});

server.get('/buzzwords', function (req, res) {
  res.send({ buzzwords: buzzObjectArr });
});

server.route('/buzzword')
  .post( function (req, res) {

    var reqBody = req.body.buzzWord;
    //check for duplicate before pushing b word to array
    for( var i = 0; i < buzzObjectArr.length; i++ ){
      if( buzzObjectArr[i].buzzWord !== reqBody ) {
        buzzObjectArr.push( req.body );
        console.log( 'ARE YOU WORKING!' );

        //creating body?
        var body = {
          'buzzWord' : reqBody,
          'points' : req.body.points,
          'heard' : true
        };

        res.send({ 'success' : true });
      }
    }
  })

  .put( function (req, res) {

    var reqBody = req.body;

    score += parseInt(req.body.points);

    res.send({
      'success' : true,
      'newScore' : score
    });
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