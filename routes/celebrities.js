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

celebritiesRouter.post('/celebrities/:id/delete', (request, response, next) => {
  const id = request.params.id;
  Celebrity.findByIdAndRemove(id)
    .then(() => {
      response.redirect('/celebrities');
    })
    .catch((error) => {
      next(error);
    });
});

celebritiesRouter.get('/celebrities/:id/edit', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findById(id)
    .then((celebrity) => {
      res.render('celebrities/edit', { celebrity });
    })
    .catch((error) => {
      next(error);
    });
});

celebritiesRouter.post('/celebrities/:id/edit', (req, res, next) => {
  const id = req.params.id;
  const name = req.params.name;
  const occupation = req.params.occupation;
  const catchPhrase = req.params.catchPhrase;

  Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase })
    .then(() => {
      res.redirect(`/celebrities/${id}`);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = celebritiesRouter;
