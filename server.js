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

    // if there's something in the array
    if( buzzArrObj.length > 0 ) {

    //check for duplicate before pushing b word to array
      for( var i = 0; i < buzzArrObj.length; i++ ) {
        if( buzzArrObj[i].buzzWord === req.body.buzzWord ) {

          //will send out a message if it already exist
          var message = res.send({
           'success' : false,
           'message' : 'Please, choose a different buzzword'
         });
          return res.send( message );
        }
      }
    } else {
      //proceed with method if it's a new b word
      buzzArrObj.push( req.body );
      res.send({ 'success' : true });
    }
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
                var firstMsg = res.send({
                  'success' : true,
                  'newScore' : buzzArrObj[i].points
                });
                //adds points to global var
                score += parseInt( buzzArrObj[i].points );
                return res.send( firstMsg );
              }
            } //end of if( buzzArrOb...
          if( req.body.heard === 'true' ) {
            if( score > 0 ) {
              score += parseInt( buzzArrObj[i].points );

              var secMsg = res.send({
                'success' : true,
                'newScore' : score
              });
            }
          } else {
            score -= parseInt( buzzArrObj[i].points );

            var elseMsg = res.send({
              'success' : true,
              'newScore' : score
            });
          }
        }
      }
    }
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
var server = server.listen( 8080, function ( ) {
  var host = 'localhost';
  var port = 8080;

  console.log( 'Example server listening at http://%s:%s', host, port );
});