const { check } = require('express-validator/check');

/**
 * List of parameters to validate message request
 */
module.exports = {

  task:{
    create: function(){
      return [
        check('message', 'Parameter \'message\' is required')
          .exists()
          .isLength({min: 1, max: 256})
          .isString()
          .withMessage('Parameter \'message\' is required. Max number of characters is 256'),
        check('resolved', 'Parameter \'resolved\' must be boolean')
          .optional()
          .isBoolean()
      ]
    },
    update: function(){
      return [
        check('_id', 'Parameter \'_id\' is required')
          .exists()
          .isString()
          .isLength({min:24, max:24})
          .withMessage('Parameter \'_id\' is not valid'),
        check('message', 'Max number of characters is 256')
          .optional()
          .isLength({min: 1, max: 256}),
        check('resolved', 'Parameter \'resolved\' must be boolean')
          .optional()
          .isBoolean()
      ]
    },
    remove: function(){
      return [
        check('_id')
          .optional()
          .isString()
          .isLength({min:24, max:24})
          .withMessage('Parameter \'_id\' is not valid'),
        check('resolved', 'Parameter \'resolved\' must be boolean')
          .optional()
          .isBoolean()
      ]
    },
    get: function(){
      return [
        check('_id')
          .optional()
          .isString()
          .isLength({min:24, max:24})
          .withMessage('Parameter \'_id\' is not valid'),
        check('resolved', 'Parameter \'resolved\' must be boolean')
          .optional()
          .isBoolean()
      ]
    }
  },

  profile:
    {
      create: function(){
        return [
          check('emailAddress', 'Parameter \'emailAddress\' is required')
            .exists()
            .isEmail()
            .withMessage('Email address is not valid'),
          check('sendNotification', 'Parameter \'sendNotification\' must be boolean')
            .optional()
            .isBoolean()
        ]
      },
      edit: function(){
        return [
          check('emailAddress')
            .optional()
            .isEmail()
            .withMessage('Email address in not valid'),
          check('sendNotification', 'Parameter \'sendNotification\' must be boolean')
            .optional()
            .isBoolean()
        ]
      }
    }
};