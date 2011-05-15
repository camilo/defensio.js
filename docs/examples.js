var d = require('../defensio');

// Generic callback, just print the results
var f  = function(HTTPstatus, response){console.log([HTTPstatus, response])}

// Set an invalid key
var df = d.defensio('omg');
df.getUser(f);

var df = d.defensio('79f5b2a63dcf');

df.getUser(f);
df.postDocument({content: 'omg', type: 'comment'}, function(code, response){
  console.log(response);
  signature = response['defensio-result'].signature
  df.getDocument(signature, f)
  df.putDocument({'allow' : false, 'signature': signature}, f)
})

df.getBasicStats(f);
df.postProfanityFilter({aaa: "fuck you"});
df.getExtendedStats({from: '2011-05-14', to: '2011-05-15'});
