const { setTheUsername } = require('whatwg-url');
const db = require('../config/mongoose');
const Dashboard = require('../models/dashboard');
const User = require('../models/register');
const { name } = require('ejs');
module.exports.alltask = function(req, res){
  const data = Dashboard.find({})
  .then(function(data){
      User.findOne({email : "mayankgupta.edu@gmail.com"})
      .then(function(user){
          console.log(`**********user`, 'user.name');
      return res.render('alltask', {
          title: "Dashboard",
          name: 'user.name',
          dashboard: data
      });
  })
  })
  .catch(function(err){
      console.log('Error', err);
      return;
  });
}