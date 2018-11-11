let mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

let ProfileSchema = new Schema({
  /**
   * Send notification
   */
  sendNotification: {
    type: Boolean,
    default: false
  },

  /**
   * Email address where notification will be sent
   */
  emailAddress: {
    type: String,
    required: true
  }
});

module.exports = ProfileSchema;