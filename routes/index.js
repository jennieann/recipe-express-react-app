var express = require('express');
var router = express.Router();

var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Recept API', user: req.user });
});

var db = require('../queries');

let user = '';

// recipe endpoints

router.get('/api/recipes', db.getAllRecipes);
router.get('/api/recipes/:id', db.getSingleRecipe);

router.post('/api/recipes', db.createRecipe);

router.put('/api/recipes/:id', db.updateRecipe);
router.delete('/api/recipes/:id', db.removeRecipe);

router.get('/api/categories', db.getAllCategories);
router.get('/api/categories/:id/recipe', db.getAllRecipesByCategory);

// user endpoint
router.get('/api/user', function(req, res) {
  const user = req.user ? req.user : null;

  if (user) {
    res.status(200).json({
      status: 'success',
      user: user,
      code: 200,
      message: 'Get user'
    });
  } else {
    res.status(401).json({
      status: 'unauthorized',
      user: user,
      code: 401,
      message: 'Login Required'
    });
  }
});

module.exports = router;
