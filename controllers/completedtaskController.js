const db = require('../config/mongoose');
const Dashboard = require('../models/dashboard');
const User = require('../models/register');

module.exports.completedtask = function(req, res){
  Dashboard.find({})
    .then(function(data){
      User.findOne({email : "mayankgupta.edu@gmail.com"})
        .then(function(user){
        //   console.log(`User**********`, name);
          return res.render('completedtask', {
            title: "Dashboard",
            name: "user.name",
            dashboard: "data"
          });
        })
        .catch(function(err){
          console.log('Error', err);
          return;
        });
    })
    .catch(function(err){
      console.log('Error', err);
      return;
    });
};
