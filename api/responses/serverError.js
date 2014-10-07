/**
 * 500 (Server Error) Response
 *
 * Usage:
 * return res.serverError();
 * return res.serverError(err);
 * return res.serverError(err, 'some/specific/error/view');
 *
 * NOTE:
 * If something throws in a policy or controller, or an internal
 * error is encountered, Sails will call `res.serverError()`
 * automatically.
 */

module.exports = function serverError (errors, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  var viewFilePath = '500',
      statusCode = 500,
      i, errorToLog, errorToJSON;

  var result = {
    metadata: {
      status: statusCode,
      msg: 'Internal Server Error'
    }
  };

  // Set status code
  res.status(statusCode);

  // Normalize a {String|Object|Error} or array of {String|Object|Error}
  // into an array of proper, readable {Error}
  var errorsToDisplay = sails.util.normalizeErrors(errors);
  for (i in errorsToDisplay) {

      // Log error(s) as clean `stack`
      // (avoids ending up with \n, etc.)
      if (errorsToDisplay[i].original) {
          errorToLog = sails.util.inspect(errorsToDisplay[i].original);
      } else {
          errorToLog = errorsToDisplay[i].stack;
      }
      sails.log.error('Server Error (500)');
      sails.log.error(errorToLog);

      // Use original error if it exists
      errorToJSON = errorsToDisplay[i].original || errorsToDisplay[i].message;
      errorsToDisplay[i] = errorToJSON;
  }

  // Only include errors if application environment is set to 'development'
  // In production, don't display any identifying information about the error(s)
  if (sails.config.environment === 'development') {
      result.errors = errorsToDisplay;
  }

  // If the user-agent wants JSON, respond with JSON
  if (req.wantsJSON) {
      return res.json(result, result.metadata.status);
  }

  // Set status code and view locals
  res.status(result.metadata.status);
  for (var key in result) {
      res.locals[key] = result[key];
  }
  // And render view
  res.render(viewFilePath, result, function(err) {
      // If the view doesn't exist, or an error occured, just send JSON
      if (err) {
          return res.json(result, result.metadata.status);
      }

      // Otherwise, if it can be rendered, the `views/500.*` page is rendered
      res.render(viewFilePath, result);
  });

};

