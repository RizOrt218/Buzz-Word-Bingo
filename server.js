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
  return res.send({ buzzwords: buzzArrObj });
});

server.route('/buzzword')
  .post( function (req, res) {
console.log( 'BEFORE POST TESSST');
    // if there's something in the array
console.log( 'POST TESSST');
    //check for duplicate before pushing b word to array
      for( var i = 0; i < buzzArrObj.length; i++ ) {
        if( buzzArrObj[i].buzzWord === req.body.buzzWord ) {
          console.log( 'MY REQ BOOODYYYY',req.body );
          //will send out a message if it already exist
          var message = {
           'success' : false,
           'message' : 'Please, choose a different buzzword'
         };
          return res.send( message );
        }
      }
      //proceed with method if it's a new b word
      buzzArrObj.push({
        'buzzWord' : req.body.buzzWord,
        'points' : req.body.points,
        'heard' : false
      });
     return res.send({ 'success' : true });
  })

  .put( function (req, res) {
    console.log('PUT REQUEST!!!');
    //check to see if the b word exist, true => take that object
    //and update points into newScore
    if( buzzArrObj.length > 0 ) {
      for(var i = 0; i < buzzArrObj.length; i++ ) {
        if( buzzArrObj[i].buzzWord === req.body.buzzWord ) {
          if( req.body.heard === 'true' ) {
            if( score === 0 ) {
              console.log( 'this be score', score );
            //take that b word original points and adds more points when heard is true
                var firstMsg = {
                  'success' : true,
                  'newScore' : buzzArrObj[i].points
                };
                //adds points to global var
                score += parseInt( buzzArrObj[i].points );
                return res.send( firstMsg );
              }
            } //end of if( buzzArrOb...
          if( req.body.heard === 'true' ) {
            if( score > 0 || score < 0 ) {
              score += parseInt( buzzArrObj[i].points );

              var secMsg = {
                'success' : true,
                'newScore' : score
              };
              return res.send( secMsg );
            }
          }
          else {
            score -= parseInt( buzzArrObj[i].points );

            var elseMsg = {
              'success' : true,
              'newScore' : score
            };
            return res.send( elseMsg );
          }
        } //end of if( buzzArrObj[i]
      } //end of for loop
    } //end of if( buzzArrObj.length > 0 )
    var endMsg = res.send({
      'success' : false,
      'message' : 'There\'s nothing in the array yet silly! Use a different method'
    });
    return res.send( endMsg );
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