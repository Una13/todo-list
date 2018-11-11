/**
 * App config file
 * */

module.exports = {
  //Default environment
  def:{
    app: {
      host: "localhost",
      port: 3000
    },
    mongodb: {
      host: "mongodb://localhost:27017/",
      db: "todo_list"
    },
    email: {
      transporter: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: '',
          pass: ''
        }
      },
      options: {
        from: '',
        subject: 'TODO list',
        text: 'Dear user,\n\n' +
        'Congratulations! You resolved all of your tasks from TODO list.\n\n' +
        'Best regards, \n' +
        'Your TODO list'
      }
    }
  },

  //Test environment
  test: {
    app: {
      host: "localhost",
      port: 5000
    },
    mongodb: {
      host: "mongodb://localhost:27017/",
      db: "todo_list_test"
    },
    email: {
      transporter: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: '',
          pass: ''
        }
      },
      options: {
        from: '',
        subject: 'TODO list',
        text: 'Dear user,\n\n' +
        'Congratulations! You resolved all of your tasks from TODO list.\n\n' +
        'Best regards, \n' +
        'Your TODO list'
      }
    }
  }
};
