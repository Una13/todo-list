let request  = require('supertest'),
    expect   = require('chai').expect,
    app      = require('../server.js'),
    mongoose = require('mongoose');

before(function (done) {
  //Before running tests, drop database (determined by NODE_ENV).
  mongoose.connection.dropDatabase(function(error) {
    if (error) {
      console.log('Error', error);
      process.exit(0);
    }
    done();
  });
});

describe("Try to get user profile", function() {
  it("Should fail because profile doesn't exist", function(done) {
    request(app).get("/profile/get")
      .expect({
        status: 400,
        errorCode: "00002",
        message: "Profile doesn't exists",
      }, done)

  })
});

describe("Try to remove user profile", function() {
  it("Should fail because profile doesn't exist", function(done) {
    request(app).delete("/profile/remove")
      .expect({
        status: 400,
        errorCode: "00002",
        message: "Profile doesn't exists",
      }, done)

  })
});

describe("Try to edit user profile", function() {
  it("Should fail because profile doesn't exist", function(done) {
    request(app).put("/profile/edit")
      .send({
        "emailAddress": "john.johnson@gmail.com",
        "sendNotification": true
      })
      .expect({
        status: 400,
        errorCode: "00002",
        message: "Profile doesn't exists",
      }, done)

  })
});

describe("Try to create user profile", function() {
  it("Should fail because email is not valid", function(done) {
    request(app).post("/profile/create")
      .send({
        "emailAddress": "john.johnsongmail.com",
        "sendNotification": true
      })
      .expect({
        status: 400,
        errorCode: '00001',
        more_info: "Email address is not valid",
        message: 'Bad request'
      }, done)
  });

  it("Should fail because no param emailAddress", function(done) {
    request(app).post("/profile/create")
      .send({})
      .expect({
        status: 400,
        errorCode: '00001',
        more_info: "Parameter 'emailAddress' is required",
        message: 'Bad request'
      }, done)
  });

  it("Should fail because sendNotification is not boolean", function(done) {
    request(app).post("/profile/create")
      .send({
        "emailAddress": "john.johnson@gmail.com",
        "sendNotification": 123
      })
      .expect({
        status: 400,
        errorCode: '00001',
        more_info: "Parameter 'sendNotification' must be boolean",
        message: 'Bad request'
      }, done)
  });

  it("Should create user profile", function(done) {
    request(app).post("/profile/create")
      .send({
        "emailAddress": "john.johnson@gmail.com",
        "sendNotification": true
      })
      .expect(200, done)
  });

  it("Should fail because profile already exists", function(done) {
    request(app).post("/profile/create")
      .send({
        "emailAddress": "john.johnson@gmail.com",
        "sendNotification": true
      })
      .expect({
        status: 400,
        errorCode: "00003",
        message: "Profile already exists",
      }, done)
  })
});

describe("Try to edit user profile", function() {
  it("Should fail because parameter doesn't exist", function(done) {
    request(app).put("/profile/edit")
      .send({
        "email": "john.johnson@gmail.com",
      })
      .expect({
        status: 400,
        errorCode: "00001",
        message: "Bad request",
        more_info: "One of optional parameters must be set",
      }, done)
  });

  it("Should pass because parameter is valid", function(done) {
    request(app).put("/profile/edit")
      .send({
        "emailAddress": "john.johnson@gmail.com",
      })
      .expect(200, done)
  })
});

describe("Try to get user profile", function() {
  it("Should pass because profile exist", function(done) {
    request(app).get("/profile/get")
      .expect(200, done)
  })
});

describe("Try to remove user profile", function() {
  it("Should pass because profile exist", function(done) {
    request(app).delete("/profile/remove")
      .expect(200, done)
  })
});