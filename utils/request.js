require('isomorphic-fetch');

/* eslint-env browser */
module.exports = {
  // Parses the JSON returned by a network request
  parseJSON: response => response.json(),

  // Checks if a network request came back fine, and throws an error if not
  checkStatus: response => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  },

  // Requests a URL, returning a promise
  request: (url, options) =>
    fetch(url, options)
      .then(module.exports.checkStatus)
      .then(module.exports.parseJSON)
};
