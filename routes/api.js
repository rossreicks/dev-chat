var Message = require('../models/models').Message;
var Thread = require('../models/models').Thread;
var User = require('../models/models').User;
var Team = require('../models/models').Team;
const express = require('express');

var router = express.Router();

// server routes ===========================================================

router.get('/messages', function(req, res) {
    Message.find(function(err, message) {
        if (err)
            res.send(err);
        
        res.json(message); 
    });
});

router.get('/messages/:threadName', function(req, res) {
    var threadName = req.params['threadName'];
    if (threadName === undefined ) {
      threadName = 'general';
    }
    Thread.find({name: threadName})
    .populate(['messages', 'users'])
    .exec(function(err, thread) {
      if (err)
        res.json(err)
      
      res.json(thread);
    })
});

router.post('/messages', function(req, res) {
  if(req.body) {
    Message.create(req.body, function(err, mes) {
      if (err) 
        res.json(err);

      res.json(mes);
    });
  } else {
    res.send("An eror occured");
  }
});

router.post('/teams', function(req, res) {
  if(req.body) {
    User.create(req.body.owner, function(err, user) {
      if (err) 
        res.json(err);

      var thread = new Thread({
        name: 'general',
        description: '',
        users: [user._id],
        messages: []
      })

      thread.save(function(err, thread) {
        if (err) 
          res.json(err);

        var team = new Team({
          name: req.body.name,
          description: req.body.description,
          owner: user._id,
          users: [user._id],
          threads: [thread._id]
        })

        team.save(function(err, team) {
          if (err) 
            res.json(err);

          res.json(team);
        })
      })
    })
  } else {
    res.send("An eror occured");
  }
})

router.get('/teams/:name', function(req, res) {
  Team.findOne({name: req.params['name']})
  .populate(['owner', 'threads', 'users'])
  .exec(function (err, team) {
    if (err)
      res.json(err);

    Thread.findOne({name: team.threads[0].name})
    .populate('messages')
    .exec(function (err, thread) {
      if (err)
        res.json(err)
      
      team.threads[0] = thread;
    })
    res.json(team); 
  })
})

router.delete('/messages', function(req, res) {
  res.send("DELETE called on message api endpoint")
})

module.exports = router