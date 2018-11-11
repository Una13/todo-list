let mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

let TaskSchema = new Schema({
  /**
   * Task message
   */
  message: {
    type: String,
    required: true,
    unique: true
  },

  /**
   * Task status
   */
  resolved: {
    type: Boolean,
    default: false
  },

  /**
   * Date when task is created
   */
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = TaskSchema;