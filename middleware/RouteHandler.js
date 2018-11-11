let httpCodes = require('../config/httpCodes.js');

/**
 * Class for handling invocation and error handling or endpoint routes.
 * This way application routing is 'clean' of middleware declarations,
 * response type handlers and error handlers.
 * All endpoint handlers only returns value(resolve) or reject/throw with error.
 * @param route
 * @constructor
 */
let RouteHandler = function(route) {
  this.route = route;
};

/**
 * Middleware which parses the response, calls route handler and handles error.
 * @param req
 * @param res
 */
RouteHandler.prototype.middleware = function(req, res) {
  let thisObject = this;

  req.getValidationResult()
    .then(function(result){

      //Request is valid
      if (result.isEmpty()) {
        thisObject.route(req)
          .then(function(returnValue){
            logger.debug("[RouteHandler] Success - response: " + JSON.stringify(returnValue));
            res.json(returnValue);
          })
          .catch(function(error){
            if(error instanceof Error) {
              let errorMsg = httpCodes.INTERNAL_ERROR;
              errorMsg.more_info = error;

              logger.error("[RouteHandler] Error - response: " + JSON.stringify(errorMsg));
              res.json(errorMsg);
            }else {
              logger.error("[RouteHandler] Error - response: " + JSON.stringify(error));
              res.status(error.status);
              res.json(error);
            }
          });

      //Invalid request
      }else {
        let errorMsg = httpCodes.BAD_REQUEST;
        errorMsg.more_info = result.array().find(e => !!e).msg;

        logger.error("[RouteHandler] Error - " + JSON.stringify(errorMsg));
        res.status(errorMsg.status);
        res.json(errorMsg);
      }
    })
};

module.exports = {
/**
 * Universal method for registering method on RouteHandler
 * When registered, invoking and handling method's eventual exception is handled inside RouteHandler.
 * @param route
 * @returns {function(this:RouteHandler)}
 */

  register: function (route) {
    let handler = new RouteHandler(route);
    return handler.middleware.bind(handler);
  }
};