// This code is a simplified version of the code on
// https://simonplend.com/how-to-create-an-error-handler-for-your-express-api/

/**
 * Generic Express error handler middleware.
 *
 * @param {Error} error - An Error object.
 * @param {Object} request - Express request object
 * @param {Object} response - Express response object
 * @param {Function} next - Express `next()` function
 */
 module.exports.errorHandlerMiddleware = (error, request, response, next)=>{


	console.log(error);

	/**
	 * If response headers have already been sent,
	 * delegate to the default Express error handler.
	 */
	if (response.headersSent) {
		return next(error);
	}

	const errorResponse = {
		sucess: false,
		message: getErrorMessage(error)
	};

	/**
	 * Set the response status code.
	 */
	response.status(getHttpStatusCode({ error, response }));

	/**
	 * Send an appropriately formatted response.
	 *
	 * The Express `res.format()` method automatically
	 * sets `Content-Type` and `Vary: Accept` response headers.
	 *
	 * @see https://expressjs.com/en/api.html#res.format
	 *
	 * This method performs content negotation.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation
	 */
	response.format({
		//
		// Callback to run when `Accept` header contains either
		// `application/json` or `*/*`, or if it isn't set at all.
		//
		"application/json": () => {
			/**
			 * Set a JSON formatted response body.
			 * Response header: `Content-Type: `application/json`
			 */
			response.json(errorResponse);
		},
		/**
		 * Callback to run when none of the others are matched.
		 */
		default: () => {
			/**
			 * Set a plain text response body.
			 * Response header: `Content-Type: text/plain`
			 */
			response.type("text/plain").send(errorResponse.message);
		},
	});

	/**
	 * Ensure any remaining middleware are run.
	 */
	next();
}

/**
 * Extract an error stack or error message from an Error object.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
 *
 * @param {Error} error
 * @return {string} - String representation of the error object.
 */
 function getErrorMessage(error) {
	/**
	 * If it exists, prefer the error stack as it usually
	 * contains the most detail about an error:
	 * an error message and a function call stack.
	 */
	let errorMessage = "";

	if (error.stack) {
		console.log('Stack: ' + error.stack);
		errorMessage = error.stack;
	}

	if (typeof error.toString === "function") {
		console.log('Function: '+ error.toString());
		errorMessage = error.toString();
	}

	return errorMessage.split('\n').at(0);
}


/**
 * Look for an error HTTP status code (in order of preference):
 *
 * - Error object (`status` or `statusCode`)
 * - Express response object (`statusCode`)
 *
 * Falls back to a 500 (Internal Server Error) HTTP status code.
 *
 * @param {Object} options
 * @param {Error} options.error
 * @param {Object} options.response - Express response object
 * @return {number} - HTTP status code
 */
function getHttpStatusCode({ error, response }) {
	/**
	 * Check if the error object specifies an HTTP
	 * status code which we can use.
	 */
	const statusCodeFromError = error.status || error.statusCode;
	if (statusCodeFromError >= 400 && statusCodeFromError < 600) {
		return statusCodeFromError;
	}

	/**
	 * The existing response `statusCode`. This is 200 (OK)
	 * by default in Express, but a route handler or
	 * middleware might already have set an error HTTP
	 * status code (4xx or 5xx).
	 */
	const statusCodeFromResponse = response.statusCode;
	if (isErrorStatusCode(statusCodeFromResponse)) {
		return statusCodeFromResponse;
	}

	/**
	 * Fall back to a generic error HTTP status code.
	 * 500 (Internal Server Error).
	 *
	 * @see https://httpstatuses.com/500
	 */
	return 500;
}

/**
 * Determines if an HTTP status code falls in the 4xx or 5xx error ranges.
 *
 * @param {number} statusCode - HTTP status code
 * @return {boolean}
 */
 function isErrorStatusCode(statusCode) {
	return statusCode >= 400 && statusCode < 600;
}