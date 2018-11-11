let taskModel             = require('../../models/tasks/model.js'),
    httpCodes             = require('../../config/httpCodes.js'),
    profileController     = require('../profile/controller.js'),
    nodemailer            = require('nodemailer');

let transporter = nodemailer.createTransport(global.config.email.transporter);

module.exports = {
  /**
   * If profile exists create new task
   * @param req
   * @returns {Promise<any>}
   */
  create: function (req) {
    logger.debug("[TaskController][create]");

    let profile;
    let body = req.body;

    return new Promise(function(resolve, reject){
      profileController.get()
        .then(function(data){
          profile = data;
          return taskModel.createTask(body);
        })
        .then(function(data){
          if(profile.sendNotification){
            sendEmail(profile.emailAddress)
              .catch(function(err){
                logger.error("[TaskController][create] sendEmail - " + JSON.stringify(err));
            });
          }else
            logger.error("[TaskController][create] Notifications are disabled");
          return resolve(data);
        })
        .catch(function(err){
          logger.error("[TaskController][create] " + JSON.stringify(err));
          return reject(err);
        })
    })
  },

  /**
   * Update task message or status
   * @param req
   * @returns {*}
   */
  update: function (req) {
    logger.debug("[TaskController][update]");

    let body = req.body;

    //Check if either one of parameters is set
    if(body.resolved !== undefined || body.message)
      return new Promise(function(resolve, reject){
        let profile;

        profileController.get()
          .then(function(data){
            profile = data;
            return taskModel.updateTask(body);
          })
          .then(function(data){
            if(profile.sendNotification){
              sendEmail(profile.emailAddress)
                .catch(function(err){
                  logger.error("[TaskController][create] sendEmail - " + JSON.stringify(err));
                });
            }else
              logger.error("[TaskController][create] Notifications are disabled");
            return resolve(data);
          })
          .catch(function(err){
            logger.error("[TaskController][update] " + JSON.stringify(err));
            return reject(err);
          })
      });
    else{
      let msg = httpCodes.BAD_REQUEST;
      msg.more_info = "Set one of parameters";
      return Promise.reject(msg);
    }
  },

  /**
   * Remove tasks based on id or resolve status
   * @param req
   * @returns {*}
   */
  remove: function (req) {
    logger.debug("[TaskController][remove]");
    let body = req.body;

    //Check if either one of parameters is set
    if(body.resolved !== undefined || body._id)
      return new Promise(function(resolve, reject){
        profileController.get()
          .then(function(){
            return taskModel.removeTasks(body);
          })
          .then(function(data){
            return resolve(data);
          })
          .catch(function(err){
            logger.error("[TaskController][remove] " + JSON.stringify(err));
            return reject(err);
          })
      });
    else{
      let msg = httpCodes.BAD_REQUEST;
      msg.more_info = "One of optional parameters must be set";

      logger.error("[TaskController][remove] Error - " + msg.more_info);
      return Promise.reject(msg);
    }
  },

  get: function (req) {
    logger.debug("[TaskController][get]");
    let query = req.query;

    //Check if either one of parameters is set
    if(query.resolved !== undefined || query._id)
      return new Promise(function(resolve, reject){
        profileController.get()
          .then(function(){
            return taskModel.getTasks(query);
          })
          .then(function(data){
            return resolve(data);
          })
          .catch(function(err){
            logger.error("[TaskController][get] " + JSON.stringify(err));
            return reject(err);
          })
      });
    else{
      let msg = httpCodes.BAD_REQUEST;
      msg.more_info = "One of optional parameters must be set";

      logger.error("[TaskController][get] " + msg.more_info);
      return Promise.reject(msg);
    }
  }
};

function sendEmail(userAddress){
  logger.info("[TaskController][sendEmail] Profile address " + userAddress);

  //When all tasks are resolved send email
  return taskModel.getTasks({resolved:false})
    .then(function(){
      logger.info("[TaskController][sendEmail] Resolved tasks exist, don't send email");
    })
    .catch(function(err){
      if(err.errorCode === "00004") {
        logger.info("[TaskController][sendEmail] All tasks are resolved. Send email");
        let mailOptions = global.config.email.options;
        mailOptions.to = userAddress;

        logger.info("[TaskController][sendEmail] " + JSON.stringify(mailOptions));
        //Try to send email
        (function sendMsg(){
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              logger.error("[TaskController][sendEmail] " + JSON.stringify(error));
              if(err.code === "ECONNECTION"){
                console.log("[TaskController][sendEmail] Connection lost, send message again ");
                setTimeout(sendMsg, 10000);
              }
            } else {
              if(info)
                logger.info('[TaskController][sendEmail] Email sent: ' + info.response);
            }
          });
        })();
      } else
        logger.error("[TaskController][sendEmail] " + JSON.stringify(err));
  })
}