/**
 * List of error codes
 */

module.exports = {
  'BAD_REQUEST': {
    status: 400,
    errorCode: '00001',
    message: 'Bad request'
  },

  'NO_PROFILE': {
    status: 400,
    errorCode: "00002",
    message: "Profile doesn't exists",
  },

  'PROFILE_EXISTS': {
    status: 400,
    errorCode: "00003",
    message: "Profile already exists",
  },

  'DUPLICATED_MSG': {
    status: 400,
    errorCode: "00003",
    message: "Task with this message already exists",
  },

  'NO_TASKS': {
    status: 400,
    errorCode: "00004",
    message: "No existing tasks",
  },

  'INTERNAL_ERROR': {
    httpCode: 500,
    errorCode: "00010",
    message: "Internal Server Error",
  },

  'PROFILE_REMOVED': {
    httpCode: 200,
    message: "Profile successfully removed"
  },

  'PROFILE_UPDATED': {
    httpCode: 200,
    message: "Profile successfully updated"
  },

  'TASK_CREATED': {
    httpCode: 200,
    message: "Task successfully removed"
  }
};