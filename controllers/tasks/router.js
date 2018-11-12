let express               = require("express"),
    RouteHandler          = require("../../middleware/RouteHandler.js"),
    RouteValidator        = require("../../middleware/RouteValidator.js"),
    taskController        = require("./controller.js");

let router  = express.Router();

/**
 * @api {post} task/create Create task
 * @apiVersion 1.0.0
 * @apiName CreateTask
 * @apiGroup Task
 * @apiDescription Create new todo task message.
 * @apiSampleRequest http://localhost:3000/task/create
 *
 * @apiParam (body) {String} message Text message of new task.
 * @apiParam (body) {Boolean} [resolved] Task status.
 *
 * @apiParamExample {json} Request-Example:
 *      {
 *          "message": "Learn something new",
 *          "resolved": false
 *      }
 *
 * @apiSuccess {Boolean} resolved Resolved status.
 * @apiSuccess {String} _id       Task id.
 * @apiSuccess {String} message   Task message.
 * @apiSuccess {String} created   Timestamp when task is created.
 * @apiSuccess {String} __v       Database version key.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "resolved": false,
 *          "_id": "5be7736bb2a4552fd991eb56",
 *          "message": "Buy something",
 *          "created": "2018-11-11T00:10:19.981Z",
 *          "__v": 0
 *      }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400
 *     {
 *          "status": "400",
 *          "errorCode": "00003",
 *          "message": "Task with this message already exists",
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400
 *     {
 *          "status": "400",
 *          "errorCode": "00002",
 *          "message": "Profile doesn't exists",
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400
 *     {
 *          "status": "400",
 *          "errorCode": "00001",
 *          "message": "Bad request",
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500
 *     {
 *          "status": "500",
 *          "errorCode": "00010",
 *          "message": "Internal Server Error",
 *     }
 *
 */
router.post("/task/create",  RouteValidator.task.create(), RouteHandler.register(taskController.create));

/**
 * @api {put} task/update Update task
 * @apiVersion 1.0.0
 * @apiName UpdateTask
 * @apiGroup Task
 * @apiDescription Update existing todo task.
 * @apiSampleRequest http://localhost:3000/task/update
 *
 * @apiParam (body) {String} _id Task id.
 * @apiParam (body) {String} [message] Text message of task.
 * @apiParam (body) {Boolean} [resolved] Task status.
 *
 * @apiParamExample {json} Request-Example:
 *      {
 *          "_id": "5be7736bb2a4552fd991eb56",
 *          "message": "Take a rest",
 *          "resolved": true
 *      }
 *
 * @apiSuccess {Boolean} resolved Resolved status.
 * @apiSuccess {String} _id       Task id.
 * @apiSuccess {String} message   Task message.
 * @apiSuccess {String} created   Timestamp when task is created.
 * @apiSuccess {String} __v       Database version key.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "resolved": false,
 *          "_id": "5be7736bb2a4552fd991eb56",
 *          "message": "Do something",
 *          "created": "2018-11-11T00:10:19.981Z",
 *          "__v": 0
 *      }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400
 *     {
 *          "status": "400",
 *          "errorCode": "00002",
 *          "message": "Profile doesn't exists",
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400
 *     {
 *          "status": "400",
 *          "errorCode": "00001",
 *          "message": "Bad request",
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500
 *     {
 *          "status": "500",
 *          "errorCode": "00010",
 *          "message": "Internal Server Error",
 *     }
 *
 */
router.put("/task/update", RouteValidator.task.update(), RouteHandler.register(taskController.update));

/**
 * @api {delete} /task/remove Remove tasks
 * @apiVersion 1.0.0
 * @apiName RemoveTasks
 * @apiGroup Task
 * @apiDescription Remove existing todo tasks based on id or resolved parameters.
 * @apiSampleRequest http://localhost:3000/task/remove
 *
 * @apiParam (body) {String} [_id] Task ObjectId from db.
 * @apiParam (body) {Boolean} [resolved] Task status.
 *
 * @apiParamExample {json} Request-Example:
 *      {
 *          "_id": "5be76417266d09174e645bd8",
 *          "resolved": false
 *      }
 *
 * @apiSuccess {Integer} httpCode  Http code 200.
 * @apiSuccess {String}  message   Response message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "httpCode": 200,
 *          "message": "Task successfully removed"
 *      }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400
 *     {
 *          "status": "400",
 *          "errorCode": "00002",
 *          "message": "Profile doesn't exists",
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400
 *     {
 *          "status": "400",
 *          "errorCode": "00001",
 *          "message": "Bad request",
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500
 *     {
 *          "status": "500",
 *          "errorCode": "00010",
 *          "message": "Internal Server Error",
 *     }
 *
 */
router.delete("/task/remove", RouteValidator.task.remove(), RouteHandler.register(taskController.remove));

/**
 * @api {get} task/get Get tasks.
 * @apiVersion 1.0.0
 * @apiName GetTask
 * @apiGroup Task
 * @apiDescription Get single task or list of tasks.
 * @apiSampleRequest http://localhost:3000/task/get
 *
 * @apiParam (query) {String} [_id] Task ObjectId from db.
 * @apiParam (query) {Boolean} [resolved] Task status.
 *
 * @apiParamExample {json} Request-Example:
 *      {
 *          "_id": "5be76417266d09174e645bd8",
 *          "resolved": false
 *      }
 *
 * @apiSuccess {Boolean} resolved Resolved status.
 * @apiSuccess {String} _id       Task id.
 * @apiSuccess {String} message   Task message.
 * @apiSuccess {String} created   Timestamp when task is created.
 * @apiSuccess {String} __v       Database version key.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "resolved": false,
 *          "_id": "5be7736bb2a4552fd991eb56",
 *          "message": "Do something",
 *          "created": "2018-11-11T00:10:19.981Z",
 *          "__v": 0
 *      }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400
 *     {
 *          "status": "400",
 *          "errorCode": "00002",
 *          "message": "Profile doesn't exists",
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400
 *     {
 *          "status": "400",
 *          "errorCode": "00001",
 *          "message": "Bad request",
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500
 *     {
 *          "status": "500",
 *          "errorCode": "00010",
 *          "message": "Internal Server Error",
 *     }
 *
 */
router.get("/task/get", RouteValidator.task.get(), RouteHandler.register(taskController.get));

module.exports = router;