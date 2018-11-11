let ProfileSchema = require('./schema.js'),
    httpCodes = require('../../config/httpCodes.js'),
    mongoose   = require('mongoose');

/**
 * Create new profile
 * @param data
 * @returns {Promise}
 */
ProfileSchema.statics.createProfile = function (data) {
  logger.debug("[ProfileModel][createProfile] " + JSON.stringify(data));

  return new Promise(function (resolve, reject) {
      model.create(data, function (err, profile) {

        if(err){
          logger.error("[ProfileModel][createProfile] " + JSON.stringify(err));
          let errorMsg = httpCodes.INTERNAL_ERROR;
          errorMsg.more_info = err.errors;
          return reject(errorMsg);
        }else{
          logger.info("[ProfileModel][createProfile] Profile created");
          return resolve(profile.toObject());
        }
      });
  });
};

/**
 * Get profile if exits
 * @returns {Promise}
 */
ProfileSchema.statics.getProfile = function () {
  logger.debug("[ProfileModel][getProfile]");

  return new Promise(function (resolve, reject) {
    model.find({}, function (err, data) {

      if(err) {
        logger.error("[ProfileModel][getProfile] " + JSON.stringify(err));
        return reject(err);
      }else if(Object.keys(data).length === 0){
        logger.info("[ProfileModel][getProfile] Profile doesn't exist ");
        return reject(httpCodes.NO_PROFILE);
      }else{
        logger.info("[ProfileModel][getProfile] Profile: " + JSON.stringify(data));
        return resolve(data[0]);
      }
    });
  });
};

/**
 * Remove profile
 * @returns {Promise}
 */
ProfileSchema.statics.removeProfile = function () {
  logger.debug("[ProfileModel][removeProfile]");

  return new Promise(function (resolve, reject) {
    model.deleteOne({}, function (err, removed) {

      if(err){
        logger.error("[ProfileModel][removeProfile] " + JSON.stringify(err));
        return reject(err);
      }else if(removed.n === 0){
        logger.info("[ProfileModel][removeProfile] Profile doesn't exists");
        return reject(httpCodes.NO_PROFILE);
      } else {
        logger.info("[ProfileModel][removeProfile] Profile removed ");
        return resolve(httpCodes.PROFILE_REMOVED);
      }
    });
  });
};

/**
 * Update existing profile
 * @param data
 * @returns {Promise}
 */
ProfileSchema.statics.updateProfile= function (data) {
  logger.debug("[ProfileModel][updateProfile]");

  return new Promise(function (resolve, reject) {
      let newParam = {};
      if(data.sendNotification !== undefined)
        newParam.sendNotification = data.sendNotification;
      if(data.emailAddress)
        newParam.emailAddress = data.emailAddress;

      model.findOneAndUpdate({},{
        $set : newParam
      }, {new: true},function (err, updated) {

        if(err){
          logger.error("[ProfileModel][updateProfile] " + JSON.stringify(err));
          return reject(err);
        }else if(updated){
          logger.info("[ProfileModel][updateProfile] Profile updated ");
          return resolve(httpCodes.PROFILE_UPDATED);
        }else{
          logger.info("[ProfileModel][updateProfile] Profile doesn't exists");
          return reject(httpCodes.NO_PROFILE);
        }
      });
  });
};

let model = mongoose.model("profile", ProfileSchema);
module.exports = model;