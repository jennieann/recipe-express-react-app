var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Recept API' });
});

var db = require('../queries');
router.get('/api/recipes', db.getAllRecipes);
router.get('/api/recipes/:id', db.getSingleRecipe);
router.post('/api/recipes', db.createRecipe);
router.put('/api/recipes/:id', db.updateRecipe);
router.delete('/api/recipes/:id', db.removeRecipe);

router.get('/api/categories', db.getAllCategories);
router.get('/api/categories/:id/recipe', db.getAllRecipesByCategory);

module.exports = router;
