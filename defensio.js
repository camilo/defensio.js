var net         = require("net");
var request     = require("request");
var querystring = require("querystring");

var defensio = function(apiKey, callbackURL, options){
  this.apiKey = apiKey;
  this.callbackURL = callbackURL;
  this.host = 'api.defensio.com';
  this.version = '2.0';
  this.resources_and_methods = {
                     'documents'        : ['GET', 'POST', 'PUT'],
                     'users'            : ['GET'],
                     'extended-stats'   : ['GET'],
                     'basic-stats'      : ['GET'],
                     'profanity-filter' : ['POST']
                     }

  /* Signature might be null */
  this.buildPath = function(resource, method, signature){
    
    if( this.resources_and_methods[resource] == null || this.resources_and_methods[resource].indexOf(method) < 0)
      throw("Do not know how to create and URL for resource " + resource + " and method " + method);

    resource_path = null;
    switch(resource)
                  {
                    case 'users':
                      resource_path = "/users/" + this.apiKey
                      break;
                    case 'documents':
                      if(method == 'PUT' || method == 'GET'){
                        if(!signature)
                          throw("method " + method + " requires a signature for resource documents ");

                        resource_path = "/users/" + this.apiKey + '/documents/' + signature;
                      } else {
                        resource_path = "/users/" + this.apiKey + '/documents'
                      }
                      break;
                    case 'extended-stats':
                      resource_path = "/users/" + this.apiKey + '/extended-stats';
                      break;
                    case 'basic-stats':
                      resource_path = "/users/" + this.apiKey + '/basic-stats' ;
                      break;
                    case 'profanity-filter':
                      resource_path = "/users/" + this.apiKey + '/basic-stats' ;
                      break;
                    default:
                      throw('This should not happen');
                  }

    return "/" + this.version + resource_path + ".json";
  }

  this.doRequest = function(resource, method, defensio_arguments, callback){
    signature = null;

    if(defensio_arguments && defensio_arguments.signature){
      signature = defensio_arguments.signature;
      delete(defensio_arguments.signature);
    }

    path = this.buildPath(resource, method, signature);
    
    uri  = "http://" + this.host + path;

    req_opts = {uri : uri, method: method }

    if(method == 'POST' || method == 'PUT'){
    //  req_opts.method = 'POST';
    //  if(method == 'PUT')
    //    req_opts['_method'] = 'PUT';
      req_opts['body'] = querystring.stringify(defensio_arguments);
    }
    
    if(method == 'PUT') 
      console.log(req_opts.body);

    request(req_opts, function(error, response, body){
      if(!error && callback){
        callback(response.statusCode, JSON.parse(body));
      } else if(error) {
        throw(error);
      } else {
        console.log(body);
      }
    })
  }

  this.getUser = function(callback){
    this.doRequest('users', 'GET', {}, callback); 
  }

  this.postDocument = function(doc, callback){
    this.doRequest('documents', 'POST', doc, callback); 
  }

  this.getDocument = function (signature, callback){
    this.doRequest('documents', 'GET', {'signature' : signature}, callback); 
  }

  this.putDocument = function(args, callback){
    this.doRequest('documents', 'PUT', args, callback); 
  }

  this.getBasicStats = function(args, callback){
    this.doRequest('basic-stats', 'GET', args, callback); 
  }
  return this;
}

exports.defensio = defensio;



