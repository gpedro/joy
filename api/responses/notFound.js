/**
 * 404 (Not Found) Handler
 *
 * Usage:
 * return res.notFound();
 * return res.notFound(err);
 * return res.notFound(err, 'some/specific/notfound/view');
 *
 * e.g.:
 * ```
 * return res.notFound();
 * ```
 *
 * NOTE:
 * If a request doesn't match any explicit routes (i.e. `config/routes.js`)
 * or route blueprints (i.e. "shadow routes", Sails will call `res.notFound()`
 * automatically.
 */

module.exports = function notFound (data, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  var viewFilePath = '404';
  var statusCode = 404;
  var result = {
      metadata: {
          status: statusCode,
          msg: 'Not Found'
      }
  };

  // Set status code
  res.status(statusCode);

  // If the user-agent wants a JSON response, send json
  if (req.wantsJSON) {
      return res.json(result, result.metadata.status);
  }

  res.status(result.metadata.status);
  res.render(viewFilePath, function(err) {
      // If the view doesn't exist, or an error occured, send json
      if (err) {
          return res.json(result, result.metadata.status);
      }

      // Otherwise, serve the `views/404.*` page
      res.render(viewFilePath);
  });

};
