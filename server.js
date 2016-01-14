var bodyParser = require( 'body-parser' );
var express    = require( 'express' );
var server     = express();

server.use( express.static( 'public' ));
server.use(bodyParser.urlencoded({ extended: true}));

var words = [];
var points = 0;

server.get('/', function (req, res) {
  res.send( 'herro' );
});

server.get('/buzzwords', function (req, res) {
  res.send({ buzzwords: words });
});

server.route('/buzzword')
  .post( function (req, res) {
    words.push({
      buzzWord : req.body.buzzWord,
      points : req.body.points,
      heard : false
    });
    res.send({'success' : true });
  })

  .put( function (req, res) {
    res.send({
      'success' : true,
      'newScore' : 2000
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