/**
 * 400 (Bad Request) Handler
 *
 * Usage:
 * return res.badRequest();
 * return res.badRequest(data);
 * return res.badRequest(data, 'some/specific/badRequest/view');
 *
 * e.g.:
 * ```
 * return res.badRequest(
 *   'Please choose a valid `password` (6-12 characters)',
 *   'trial/signup'
 * );
 * ```
 */

module.exports = function badRequest(validationErrors, redirectTo) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  var statusCode = 400;

  var result = {
      metadata: {
          status: statusCode,
          msg: 'Bad Request'
      }
  };

  // Set status code
  res.status(statusCode);

  // Optional validationErrors object
  if (validationErrors) {
      result.validationErrors = validationErrors;
  }

  // For requesters expecting JSON, everything works like you would expect-- a simple JSON response
  // indicating the 400: Bad Request status with relevant information will be returned.
  if (req.wantsJSON) {
      return res.json(result, result.metadata.status);
  }

  // For traditional (not-AJAX) web forms, this middleware follows best-practices
  // for when a user submits invalid form data:
  // i.   First, a one-time-use flash variable is populated, probably a string message or an array
  //      of semantic validation error objects.
  // ii.  Then the  user is redirected back to `redirectTo`, i.e. the URL where the bad request originated.
  // iii. There, the controller and/or view might use the flash `errors` to either display a message or highlight
  //      the invalid HTML form fields.
  if (redirectTo) {

      // Set flash message called `errors` (one-time-use in session)
      req.flash('errors', validationErrors);

      // then redirect back to the `redirectTo` URL
      return res.redirect(redirectTo);
  }


  // Depending on your app's needs, you may choose to look at the Referer header here
  // and redirect back. Please do so at your own risk!
  // For security reasons, Sails does not provide this affordance by default.
  // It's safest to provide a 'redirectTo' URL and redirect there directly.

  // If `redirectTo` was not specified, just respond w/ JSON
  return res.json(result, result.metadata.status);

};

