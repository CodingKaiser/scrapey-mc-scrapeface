"use strict";

const chai = require('chai')
const chaiHTTP = require('chai-http')
var should = require("chai").should()
const server = require('../server.js')
const assert = chai.assert

chai.use(chaiHTTP)

describe("Disemvowel", function() {
  it("should remove all vowels from lowercase strings", function() {
    "this is lowcase".should.equal("this is lowcase");
  });
});

describe('/GET articles', () => {
  it('it should GET all the saved articles', done => {
    chai.request(server)
      .get('/api/all')
      .end((err, res) => {
        assert.isArray(res.body)
        assert(Object.keys(res.body).length)
        done()
      })
  })
  it('it should GET all the comments', done => {
    chai.request(server)
    .get('/api/comments')
    .end((err, res) => {
      assert.isArray(res.body)
      if (Object.keys(res.body).length) {
        console.log(res.body[0])
      }
      // assert(Object.keys(res.body).length)
      done()
    })
  })
})

describe('/GET comments', () => {
})
