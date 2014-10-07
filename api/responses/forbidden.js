/**
 * 403 (Forbidden) Handler
 *
 * Usage:
 * return res.forbidden();
 * return res.forbidden(err);
 * return res.forbidden(err, 'some/specific/forbidden/view');
 *
 * e.g.:
 * ```
 * return res.forbidden('Access denied.');
 * ```
 */

module.exports = function forbidden (data, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  var viewFilePath = '403';
  var statusCode = 403;

  var result = {
      metadata: {
          status: statusCode,
          msg: 'Forbidden'
      }
  };

  // Set status code
  res.status(statusCode);

  // Optional message
  if (message) {
      result.message = message;
  }

  // If the user-agent wants a JSON response, send json
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
      // If the view doesn't exist, or an error occured, send json
      if (err) {
          return res.json(result, result.metadata.status);
      }

      // Otherwise, serve the `views/403.*` page
      res.render(viewFilePath);
  });

};

