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

describe("Try to create new task", function() {
  it("Should fail because profile doesn't exist", function(done) {
    request(app).post("/task/create")
      .send({
        "message": "124564",
        "resolved": true
      })
      .expect({
        status: 400,
        errorCode: "00002",
        message: "Profile doesn't exists",
      }, done)

  })
});

describe("Try to update task", function() {
  it("Should fail because profile doesn't exist", function(done) {
    request(app).put("/task/update")
      .send({
        "_id": "5be7736bb2a4552fd991eb56",
        "resolved": true
      })
      .expect({
        status: 400,
        errorCode: "00002",
        message: "Profile doesn't exists",
      }, done)

  })
});

describe("Try to remove task", function() {
  it("Should fail because profile doesn't exist", function(done) {
    request(app).delete("/task/remove")
      .send({
        "_id": "5be7736bb2a4552fd991eb56"
      })
      .expect({
        status: 400,
        errorCode: "00002",
        message: "Profile doesn't exists",
      }, done)

  })
});

describe("Try to get task", function() {
  it("Should fail because profile doesn't exist", function(done) {
    request(app).get("/task/get?_id=5be7736bb2a4552fd991eb56")
      .expect({
        status: 400,
        errorCode: "00002",
        message: "Profile doesn't exists",
      }, done)

  })
});

describe("Try to create new task", function() {
  it("Should fail because no message param", function(done) {
    request(app).post("/task/create")
      .send({
        "resolved": true
      })
      .expect({
        status: 400,
        errorCode: "00001",
        message: "Bad request",
        more_info: "Parameter 'message' is required",
      }, done)

  });

  it("Should create user profile", function(done) {
    request(app).post("/profile/create")
      .send({
        "emailAddress": "test123@test.com",
        "sendNotification": true
      })
      .expect(200, done)
  });

  it("Should create new task and try to send email", function(done) {
    request(app).post("/task/create")
      .send({
        "message": "124564",
        "resolved": true
      })
      .expect(200, done)
  });

  it("Should fail because task is duplicate", function(done) {
    request(app).post("/task/create")
      .send({
        "message": "124564",
        "resolved": false
      })
      .expect({
        status: 400,
        errorCode: "00003",
        message: "Task with this message already exists",
      }, done)
  });
});

describe("Try to update task", function() {
  it("Should fail because profile with that id doesn't exist ", function(done) {
    request(app).put("/task/update")
      .send({
        "_id": "5be7736bb2a4552fd991eb56",
        "resolved": true
      })
      .expect({
        status: 400,
        errorCode: "00004",
        message: "No existing tasks",
      }, done)

  })
});

describe("Try to get task", function() {
  it("Should fail because task with certain id doesn't exist", function(done) {
    request(app).get("/task/get?_id=5be7736bb2a4552fd991eb56")
      .expect({
        status: 400,
        errorCode: "00004",
        message: "No existing tasks",
      }, done)

  });

  it("Should get task(s)", function(done) {
    request(app).get("/task/get?resolved=true")
      .expect(200, done)
  })
});

describe("Try to remove task", function() {
  it("Should fail because task with certain id doesn't exist", function(done) {
    request(app).delete("/task/remove")
      .send({
        "_id": "5be7736bb2a4552fd991eb56",
        "resolved": true
      })
      .expect({
        status: 400,
        errorCode: "00004",
        message: "No existing tasks",
      }, done)

  });

  it("Should remove task(s)", function(done) {
    request(app).delete("/task/remove")
      .send({
        "resolved": true
      })
      .expect(200, done)
  })
});