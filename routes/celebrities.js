const { response } = require('express');
const express = require('express');
const celebritiesRouter = express.Router();
const Celebrity = require('./../models/celebrity');

celebritiesRouter.get('/celebrities', (req, res, next) => {
  Celebrity.find({})
    .then((celebrities) => {
      console.log(celebrities);
      res.render('celebrities/index', { celebrities });
    })
    .catch((error) => {
      next(error);
    });
});

celebritiesRouter.get('/celebrities/create', (req, res) => {
  res.render('celebrities/create');
});

// Handle GET for /celebrities/:id
celebritiesRouter.get('/celebrities/:id', (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  Celebrity.findById(id)
    .then((celebrities) => {
      res.render('celebrities/show', { celebrities });
    })
    .catch((error) => {
      next(error);
    });
});

//create new celebrity

celebritiesRouter.post('/celebrities', (req, res, next) => {
  const name = req.body.name;
  const occupation = req.body.occupation;
  const catchPhrase = req.body.catchPhrase;

  Celebrity.create({
    name,
    occupation,
    catchPhrase
  })
    .then((celebrity) => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      res.render('/celebrities/create');
    });
});

module.exports = celebritiesRouter;
