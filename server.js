var express    = require( 'express' );
var server     = express();
var bodyParser = require( 'body-parser' );

server.use( express.static( 'public' ));
server.use(bodyParser.urlencoded({ extended: true}));

var words = [];
var score = 0;

server.get('/', function (req, res) {
  res.send( 'herro' );
});


server.get('/buzzwords', function (req, res) {
  res.send({ buzzwords: words });
});

server.route('/buzzword')
  .post( function (req, res) {
    //if buzzword already exist, don't
    //add it and message to use put.
    words.push( req.body );
    score += parseInt(req.body.points);
    console.log(req.body.points);
    console.log( 'score',score );
    res.send({'success' : true });
  })

  .put( function (req, res) {
    //if bw is same update points
    res.send({
      'success' : true,
      'newScore' : points
    });
  })

  .delete( function (req, res) {
    res.send({
      'success' : true
    });
  });
var server = server.listen( 8080, function ( ) {
  var host = 'localhost';
  var port = server.address().port;

  console.log( 'Example server listening at http://%s:%s', host, port );
});