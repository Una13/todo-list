let TaskSchema = require('./schema.js'),
    httpCodes = require('../../config/httpCodes.js'),
    mongoose   = require('mongoose');

/**
 * Create new task
 * @param data
 * @returns {Promise}
 */
TaskSchema.statics.createTask = function (data) {
  logger.debug("[TaskModel][createTask] Data - " + JSON.stringify(data));

  return new Promise(function (resolve, reject) {
     model.create(data, function (err, task) {

       if(err){
         logger.error("[TaskModel][createTask] Error - " + JSON.stringify(err));
         if(err.code === 11000){
           return reject(httpCodes.DUPLICATED_MSG);
          }else {
            let errorMsg = httpCodes.INTERNAL_ERROR;
            errorMsg.more_info = err.errors;
            return reject(errorMsg);
          }
        }else{
         logger.info("[TaskModel][createTask] Task created");
         return resolve(task.toObject());
        }
      });
  });
};

/**
 * Remove tasks based on id or resolved parameter
 * @param data
 * @returns {Promise}
 */
TaskSchema.statics.removeTasks = function (data) {
  logger.debug("[TaskModel][removeTasks] Data - " + JSON.stringify(data));
  let filterData = {};
  if(data._id)
    filterData._id = data._id;
  if(data.resolved !== undefined)
    filterData.resolved = data.resolved;

  return new Promise(function (resolve, reject) {
    model.deleteMany(filterData, function (err, removed) {

      logger.debug(JSON.stringify(removed));
      if(err){
        logger.error("[TaskModel][removeTasks] Error - " + JSON.stringify(err));

        let errorMsg = httpCodes.INTERNAL_ERROR;
        errorMsg.more_info = err.errors;
        return reject(errorMsg);
      }else if(removed.n === 0){
        logger.info("[TaskModel][removeTasks] No existing task(s)");
        return reject(httpCodes.NO_TASKS);
      } else {
        logger.info("[ProfileModel][removeProfile] Tasks successfully removed");
        return resolve(httpCodes.TASK_CREATED);
      }
    });
  });
};

/**
 * Update existing task
 * @param data
 * @returns {Promise}
 */
TaskSchema.statics.updateTask = function (data) {
  logger.debug("[TaskModel][updateTask] Data - " + JSON.stringify(data));

  return new Promise(function (resolve, reject) {
    let newParam = {};
    if(data.resolved !== undefined)
      newParam.resolved = data.resolved;
    if(data.message)
      newParam.message = data.message;

    model.findOneAndUpdate({
      _id: data._id
    }, {
      $set : newParam
    }, {new: true},function (err, updated) {
      if(err){
        logger.error("[TaskModel][updateTask] Error - " + JSON.stringify(err));
        return reject(err);
      }else if(!updated){
        logger.info("[TaskModel][updateTask] Task with this id doesn't exist");
        return reject(httpCodes.NO_TASKS);
      } else {
        logger.info("[TaskModel][updateTask] Task successfully updated");
        return resolve(updated.toObject());
      }
    });
  });
};

/**
 * Get single task based on _id or list of tasks based on resolved status
 * @param data
 * @returns {Promise}
 */
TaskSchema.statics.getTasks = function (data) {
  logger.debug("[TaskModel][getTasks] Data - " + JSON.stringify(data));
  let filterData = {};
  if(data._id)
    filterData._id = data._id;
  if(data.resolved !== undefined)
    filterData.resolved = data.resolved;

  return new Promise(function (resolve, reject) {
    model.find(filterData, function (err, tasks) {

      if(err){
        logger.error("[TaskModel][getTasks] Error - " + JSON.stringify(err));
        let errorMsg = httpCodes.INTERNAL_ERROR;
        errorMsg.more_info = err.errors;
        return reject(errorMsg);
      }else if(Object.keys(tasks).length === 0){
        logger.info("[TaskModel][getTasks] No existing task(s)");
        return reject(httpCodes.NO_TASKS);
      } else {
        logger.info("[ProfileModel][getTasks] Task - " + JSON.stringify(tasks));
        return resolve(tasks);
      }
    });
  });
};

/**
 * Check if collection is empty
 * @returns {Promise}
 */
TaskSchema.statics.getCollectionCount = function () {
  logger.debug("[TaskModel][getCollectionCount]");

  return new Promise(function (resolve, reject) {
    model.count(function (err, count) {

      if(err){
        logger.error("[TaskModel][getTasks] Error - " + JSON.stringify(err));
        return reject(err);
      }else if(count === 0){
        logger.info("[TaskModel][getTasks] No existing task(s) inside db");
        return resolve(false);
      } else {
        logger.info("[ProfileModel][getTasks] Number of existing tasks is " + count);
        return resolve(true);
      }
    });
  });
};

let model = mongoose.model("task", TaskSchema);
module.exports = model;