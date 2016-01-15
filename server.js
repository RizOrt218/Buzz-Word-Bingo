var express    = require( 'express' );
var bodyParser = require( 'body-parser' );
var server     = express();
// var route      = express.Router();

server.use( express.static( 'public' ));
server.use(bodyParser.json({ type: 'application/json' }));

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
    // if there's something in the array
    //check for duplicate before pushing b word to array
      for( var i = 0; i < buzzArrObj.length; i++ ) {
        if( buzzArrObj[i].buzzWord === req.body.buzzWord ) {
          //will send out a message if it already exist
          var message = {
           'success' : false,
           'message' : 'Please, choose a different buzzword'
         };
         res.send( message );
        }
      }
      //proceed with method if it's a new b word
      buzzArrObj.push({
        'buzzWord' : req.body.buzzWord,
        'points' : req.body.points,
        'heard' : false
      });
    res.send({ 'success' : true });
  })
  .put( function (req, res) {
    console.log('PUT REQUEST!!!');
    var head = {
      'success' : true,
      'newScore' : score
    };
    //check to see if the b word exist, true => take that object
    //and update points into newScore
    for(var i = 0; i < buzzArrObj.length; i++ ) {
      if( buzzArrObj[i].buzzWord !== req.body.buzzWord ) {
        var msg = {
          'success' : false,
          'message' : 'Not the right method dude'
        };
        return rec.send( msg );
      }
      if( score === 0 ) {
        //adds points to global var
        score += buzzArrObj[i].points;

        var firstMsg = {
          'success' : true,
          'newScore' : buzzArrObj[i].points
        };
        return res.send( firstMsg );
      }
      if( score !== 0 ) {
        score += buzzArrObj[i].points ;

        return res.send( head );
      }
    } //end of for loop
    score -= buzzArrObj[i].points;
    return res.send( head );
  })

  .delete( function (req, res) {
    console.log( 'detected Delete' );
    var deleteReq = req.body.buzzWord;

    if( buzzArrObj.length > 0 ) {



          buzzArrObj.filter( function ( e ) {
            console.log( e.buzzWord );
            console.log( deleteReq );
            return e.buzzWord !== deleteReq;
          });
        console.log(buzzArrObj);
    }
    res.send({
      'success' : true
    });
  });

server.post('/reset', function( req, res ) {
  if( req.body.reset === 'true' ) {
    buzzArrObj.splice( 0, buzzArrObj.length );

    var msg = res.send({
      'success' : true
    });
    return res.send( msg );
  }
});


var server = server.listen( 8080, function ( ) {
  var host = 'localhost';
  var port = 8080;

  console.log( 'Example server listening at http://%s:%s', host, port );
});