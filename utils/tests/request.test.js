/**
 * Test the request function
 */

/* eslint-env browser */
const { request } = require('../request');
require('isomorphic-fetch');

const mockResponse = JSON.stringify({ hello: 'world' });

describe('request', () => {
  // Before each test, stub the fetch function
  beforeEach(() => {
    window.fetch = jest.fn();
  });

  describe('stubbing successful response', () => {
    // Before each test, pretend we got a successful response
    beforeEach(() => {
      const res = new Response(mockResponse, {
        status: 200,
        headers: {
          'Content-type': 'application/json'
        }
      });

      window.fetch.mockReturnValue(Promise.resolve(res));
    });

    it('should format the response correctly', done => {
      request(`/thisurliscorrect`)
        .catch(done)
        .then(json => {
          expect(json.hello).toBe('world');
          done();
        });
    });
  });

  describe('stubbing error response', () => {
    // Before each test, pretend we got an unsuccessful response
    beforeEach(() => {
      const res = new Response('', {
        status: 404,
        statusText: 'NOT FOUND',
        headers: {
          'Content-type': 'application/json'
        }
      });

      window.fetch.mockReturnValue(Promise.resolve(res));
    });

    it('should catch errors', done => {
      request('/thisdoesntexist').catch(err => {
        expect(err.response.status).toBe(404);
        expect(err.response.statusText).toBe('NOT FOUND');
        done();
      });
    });
  });
});
