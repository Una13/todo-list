let profileModel          = require('../../models/profile/model.js'),
    taskModel             = require('../../models/tasks/model.js'),
    httpCodes             = require('../../config/httpCodes.js');

module.exports = {

  /**
   * Create new user profile
   * @returns {Promise<any>}
   */
  create: function(req){
    logger.debug("[ProfileController][create]");
    let body = req.body;

    return new Promise(function(resolve, reject){
      //Check if profile exists, only one profile can be created

      module.exports.get()
        .then(function(){
          logger.info("[ProfileController][create] Profile already exists");
          return reject(httpCodes.PROFILE_EXISTS);
        })
        .catch(function(err){
          logger.debug("[ProfileController][create] " + JSON.stringify(err));

          if(err === httpCodes.NO_PROFILE){
            //No profile found, create new one
            logger.info("[ProfileController][create] Create new profile");
            profileModel.createProfile(body).then(function(data){
              return resolve(data);
            }).catch(function(err){
              logger.error("[ProfileController][create] " + JSON.stringify(err));
              return reject(err);
            })
          } else{
            logger.error("[ProfileController][create] " + JSON.stringify(err));
            return reject(err);
          }
        })
    });
  },

  /**
   * Check if profile exists
   * @returns {*|Promise}
   */
  get: function(){
    logger.debug("[ProfileController][get]");
    return profileModel.getProfile();
  },

  /**
   * Remove profile and all tasks
   * @returns {*|Promise}
   */
  remove: function(){
    logger.debug("[ProfileController][remove]");
    let responseMsg;

    return new Promise(function(resolve, reject){
      profileModel.removeProfile()
        .then(function(rsp){
          responseMsg = rsp;
          logger.info("[ProfileController][remove] Remove task");
          return taskModel.removeTasks({});
        })
        .then(function(){
          return resolve(httpCodes.PROFILE_REMOVED);
        })
        .catch(function(err){
          if(err === httpCodes.NO_TASKS) {
            logger.info("[ProfileController][remove] No tasks removed");
            return resolve(responseMsg);
          }
          else {
            logger.error("[ProfileController][remove] " + JSON.stringify(err));
            return reject(err);
          }
        })

    })
  },

  /**
   * Edit profile data
   * @param req
   * @returns {Promise}
   */
  edit: function(req){
    logger.debug("[ProfileController][edit]");
    let body = req.body;

    if(body.emailAddress || body.sendNotification !== undefined) {
      logger.info("[ProfileController][edit] Valid parameters");
      return profileModel.updateProfile(body);
    }else {
      logger.info("[ProfileController][edit] Invalid parameters");
      let rsp = httpCodes.BAD_REQUEST;
      rsp.more_info = "One of optional parameters must be set";
      return Promise.reject(httpCodes.BAD_REQUEST);
    }
  }
};