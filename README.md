# Defensio -- full featured node.js wrapper for Defensio SPAM filtering service V 2.0

## Usage

<pre>
  var defensio = require('defensio');
  var d = defensio.defensio('api_key_here') // Get an API key at http://defensio.com
  document = {content: 'Lorem ipsum', type: 'comment'}
  
  defensio.postDocument(document, function(HTTPstatus, response_body){
      
      if( response_body['defensio-result'] && response_body['defensio-result']['status'] == 'success'){
        // if spam .. flag
        // else .. nothin?
      }else{
        // handle error
      }
    })
</pre>

## REST API documents

Each REST resouce has an equivalent function see docs/examples.js and
http://defensio.com/api for reference.
