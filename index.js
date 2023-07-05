const express = require('express');
const port = 4000;
const path = require('path');

const db = require('./config/mongoose');
const User = require('./models/register');
const Login = require('./models/login');
const Dashboard = require('./models/dashboard');

const app = express();

app.get('/', require('./routes'));
app.get('/dashboard', require('./routes'));
app.get('/register', require('./routes'));
app.get('/alltask', require('./routes'));
app.get('/completedtask', require('./routes'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use express.urlencoded middleware with extended set to true
app.use(express.urlencoded({ extended: true }));

app.use(express.static('assets'));

app.post('/register', (req, res) => {
  User.create({
    name: req.body.name,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password
  })
    .then(user => {
      console.log("Successfully Created user!", user);
      res.redirect('/dashboard');
    })
    .catch(err => {
      console.log("Error Creating user!!", err);
      res.status(500).send("Error Creating user!!");
    });
});

app.post('/addtask', function(req, res) {
  Dashboard.create({
    task: req.body.task,
    date: req.body.date,
    description: req.body.description,
    time: req.body.time,
    categoryChoosed: req.body.categoryChoosed
  })
    .then(newTask => {
      console.log("Successfully Created Task!", newTask);
      res.redirect('back');
    })
    .catch(err => {
      console.log("Error Creating Task!!", err);
      res.redirect('back');
    });
});

app.get('/complete-task', function(req, res) {
  let id = req.query.id;
  Dashboard.findByIdAndUpdate(id, { completed: true })
    .then(newTask => {
      console.log("Successfully Completed Task!", newTask);
      res.redirect('back');
    })
    .catch(err => {
      console.log("Error Completing Task!!", err);
      res.redirect('back');
    });
});

app.get('/delete-task', function(req, res) {
  let id = req.query.id;
  Dashboard.findByIdAndDelete(id)
    .then(newTask => {
      console.log("Successfully Deleted Task!", newTask);
      res.redirect('back');
    })
    .catch(err => {
      console.log("Error Deleting Task!!", err);
      res.redirect('back');
    });
});

app.listen(port, (err) => {
  if (err) {
    console.log(`Error: ${err}`);
  }
  console.log(`Yupp! Server is running on port ${port}`);
});
