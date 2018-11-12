let express               = require("express"),
    RouteHandler          = require("../../middleware/RouteHandler.js"),
    RouteValidator        = require("../../middleware/RouteValidator.js"),
    profileController     = require("./controller.js");

let router  = express.Router();

/**
 * @api {post} profile/create Create user profile
 * @apiVersion 1.0.0
 * @apiName CreateProfile
 * @apiGroup Profile
 * @apiDescription Endpoint for create new user profile.
 * @apiSampleRequest http://localhost:3000/profile/create
 *
 * @apiParam (body) {String} emailAddress User email address.
 * @apiParam (body) {Boolean} [sendNotification] Send notification when task is completed.
 *
 * @apiParamExample {json} Request-Example:
 *      {
 *          "emailAddress": "john.johnson@gmail.com",
 *          "sendNotification": true
 *      }
 *
 * @apiSuccess {Boolean} sendNotification Send notification when all tasks are resolved.
 * @apiSuccess {String} _id               Profile id.
 * @apiSuccess {String} emailAddress      User email address.
 * @apiSuccess {String} __v               Database version key.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "sendNotification": true,
 *          "_id": "5be7736bb2a4552fd991eb56",
 *          "emailAddress": "john.johnson@gmail.com",
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
router.post("/profile/create", RouteValidator.profile.create(), RouteHandler.register(profileController.create));

/**
 * @api {get} profile/get Get user profile
 * @apiVersion 1.0.0
 * @apiName GetProfile
 * @apiGroup Profile
 * @apiDescription Endpoint for get user profile.
 * @apiSampleRequest http://localhost:3000/profile/get
 *
 * @apiSuccess {Boolean} sendNotification Send notification when all tasks are resolved.
 * @apiSuccess {String} _id               Profile id.
 * @apiSuccess {String} emailAddress      User email address.
 * @apiSuccess {String} __v               Database version key.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "sendNotification": false,
 *          "_id": "5be7736bb2a4552fd991eb56",
 *          "emailAddress": "john.johnson@gmail.com",
 *          "__v": 0
 *      }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500
 *     {
 *          "status": "500",
 *          "errorCode": "00010",
 *          "message": "Internal Server Error",
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
 */
router.get("/profile/get", RouteHandler.register(profileController.get));

/**
 * @api {delete} profile/remove Remove user profile
 * @apiVersion 1.0.0
 * @apiName RemoveProfile
 * @apiGroup Profile
 * @apiDescription Endpoint for remove user profile.
 * @apiSampleRequest http://localhost:3000/profile/remove
 *
 * @apiSuccess {Integer} httpCode  Http code 200.
 * @apiSuccess {String}  message   Response message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "httpCode": 200,
 *          "message": "Profile successfully removed"
 *      }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500
 *     {
 *          "status": "500",
 *          "errorCode": "00010",
 *          "message": "Internal Server Error",
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
 */
router.delete("/profile/remove", RouteHandler.register(profileController.remove));

/**
 * @api {put} profile/edit Edit user profile
 * @apiVersion 1.0.0
 * @apiName EditProfile
 * @apiGroup Profile
 * @apiDescription Endpoint for edit user profile.
 * @apiSampleRequest http://localhost:3000/profile/edit
 *
 * @apiParam (body) {String} [emailAddress] User email address.
 * @apiParam (body) {Boolean} [sendNotification] Send notification when task is completed.
 *
 * @apiParamExample {json} Request-Example:
 *      {
 *          "emailAddress": "john.johnson@gmail.com",
 *          "sendNotification": true
 *      }
 *
 * @apiSuccess {Integer} httpCode  Http code 200.
 * @apiSuccess {String}  message   Response message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "httpCode": 200,
 *          "message": "Profile successfully updated"
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
router.put("/profile/edit", RouteValidator.profile.edit(), RouteHandler.register(profileController.edit));

module.exports = router;