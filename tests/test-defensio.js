var defensio = require('../defensio')

var apiKey   = 'API_KEY_HERE'

exports['testGetUserWhenUnexsitent'] = function(test){
  d = defensio.defensio('xxx');
  d.getUser(function(HTTPStatus, obj){  
    test.equal(404, HTTPStatus);
    test.done();
  })
};

exports['testGetUserWhenExsitent'] = function(test){
  d = defensio.defensio(apiKey);
  d.getUser(function(HTTPStatus, obj){  
    test.equal(200, HTTPStatus);
    test.done();
  })
};

exports['testPostDocWhenSpam'] = function(test){
  doc = {type : 'test', content: "[spam,0.99]"}
  d = defensio.defensio(apiKey);
  d.postDocument(doc, function(HTTPStatus, obj){
    test.equal(200, HTTPStatus);
    response = obj['defensio-result'];
    test.equal('spam', response.classification);
    test.equal(0.99, response.spaminess);
    test.done();
  });
}

exports['testPostDocWhenLegit'] = function(test){
  doc = {type : 'test', content: "[legitimate,0.1]"}
  d = defensio.defensio(apiKey);
  d.postDocument(doc, function(HTTPStatus, obj){
    test.equal(200, HTTPStatus);
    response = obj['defensio-result'];
    test.equal('legitimate', response.classification);
    test.equal(0.1, response.spaminess);
    test.done();
  });
}

exports['testGetBasicStats'] = function(test){
  d = defensio.defensio(apiKey);
  d.getBasicStats( function(HTTPStatus, obj){
    test.equal(200, HTTPStatus);
    response = obj['defensio-result'];
    test.equal('success',  response['status']);
    test.ok('accuracy' in response);
    test.ok('legitimate' in response);
    test.ok('unwanted' in response);
    test.ok('learning' in response);
    test.ok('learning-status' in response);
    test.ok('false-positives' in response);
    test.ok('false-negatives' in response);
    test.done();
  });
}

exports['testGetExtendedStats'] = function(test){
  d = defensio.defensio(apiKey);
  d.getExtendedStats( {from: '2011-05-14', to: '2011-05-15' }, function(HTTPStatus, obj){
    test.equal(200, HTTPStatus);
    response = obj['defensio-result'];
    test.equal('success',  response['status']);
    test.done();
  });
}

exports['testProfanityFilter'] = function(test){
  d = defensio.defensio(apiKey);
  d.postProfanityFilter( {xxx: "fuck you" }, function(HTTPStatus, obj){
    test.equal(200, HTTPStatus);
    response = obj['defensio-result'];
    test.equal('success',  response['status']);
    test.deepEqual({xxx: "**** you"}, response.filtered);
    test.done();
  });
}

/* This tests will mess up your defensio account stats run only if debuggig the library
 
exports['testPostDocThenGet'] = function(test){
  doc = {type : 'comment', content: "OH HAI"}
  d = defensio.defensio(apiKey);

  d.postDocument(doc, function(HTTPStatus, obj){
    test.equal(200, HTTPStatus);
    response = obj['defensio-result'];

    test.ok('classification' in response);
    test.ok('spaminess' in  response);
    test.ok('signature' in  response);

    d.getDocument(response.signature, function(HTTPStatus, obj){
      test.equal(200, HTTPStatus);
      response = obj['defensio-result'];

      test.ok('classification' in response);
      test.ok('spaminess' in  response);
      test.equal(signature,  response.signature);
      test.done();
    })
  });
}


exports['testPostDocThenPut'] = function(test){
  doc = {type : 'comment', content: "OH HAI"}
  d = defensio.defensio(apiKey);

  d.postDocument(doc, function(HTTPStatus, obj){
    test.equal(200, HTTPStatus);
    response = obj['defensio-result'];

    test.ok('classification' in response);
    test.ok('spaminess' in  response);
    test.ok('signature' in  response);
    signature = response.signature;
    
      d.putDocument({signature: signature, allow: false}, function(HTTPStatus, obj){
      test.equal(200, HTTPStatus);
      response = obj['defensio-result'];

      test.ok('classification' in response);
      test.ok('spaminess' in  response);
      test.equal(signature,  response.signature);
      test.done();
      })
  });
}

*/
