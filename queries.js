var promise = require("bluebird")

var options = {
  // Initialization Options
  promiseLib: promise,
}

var pgp = require("pg-promise")(options)

//get postgres DB
// connectionString is for Heroku database setup
// rest is for running on localhost
var db = pgp({
  connectionString: process.env.DATABASE_URL,
  host: "localhost",
  port: 5432,
  database: "recipes",
  user: "postgres",
  password: "7433",
})

function getAllCategories(req, res, next) {
  db.any("select * from categories WHERE parent_id IS NULL")
    .then(function (data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ALL categories",
      })
    })
    .catch(function (err) {
      return next(err)
    })
}

function getMainAndSubCategories(req, res, next) {
  db.any("select * from categories")
    .then(function (data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ALL both main and sub categories",
      })
    })
    .catch(function (err) {
      return next(err)
    })
}

function getAllSubCategories(req, res, next) {
  db.any(
    "select * from categories WHERE parent_id IS NOT NULL ORDER BY parent_id, name"
  )
    .then(function (data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ALL sub categories",
      })
    })
    .catch(function (err) {
      return next(err)
    })
}

function getAllRecipesByCategory(req, res, next) {
  var categoryID = parseInt(req.params.id)

  db.any(
    "select recipes.name, recipes.id, recipes.ingredients, recipes.description, recipes.difficulty, recipes.time_cooking, recipes.categories_id, recipes.sub_category_id from recipes left join categories on categories.id=recipes.categories_id where categories.id=$1",
    categoryID
  )
    .then(function (data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ALL recipes from certain category",
      })
    })
    .catch(function (err) {
      return next(err)
    })
}

function getAllRecipesBySubCategory(req, res, next) {
  var categoryID = parseInt(req.params.id)

  db.any(
    "select recipes.name, recipes.id, recipes.ingredients, recipes.description, recipes.difficulty, recipes.time_cooking, recipes.categories_id, recipes.sub_category_id from recipes left join categories on categories.id=recipes.sub_category_id where categories.id=$1",
    categoryID
  )
    .then(function (data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ALL recipes from certain sub category",
      })
    })
    .catch(function (err) {
      return next(err)
    })
}

//GET all
function getAllRecipes(req, res, next) {
  db.any("select * from recipes")
    .then(function (data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ALL recipes",
      })
    })
    .catch(function (err) {
      return next(err)
    })
}

//GET
function getSingleRecipe(req, res, next) {
  var RecipeID = parseInt(req.params.id)
  console.log("Hallå", RecipeID)
  db.one("select * from recipes where id = $1", RecipeID)
    .then(function (data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ONE Recipe",
      })
    })
    .catch(function (err) {
      return next(err)
    })
}

//POST
function createRecipe(req, res, next) {
  // console.log("FIle", req.file)
  // console.log("Body", req.body)
  req.body["image"] =
    req.file !== undefined ? req.file.originalname : "placeholder-food.png"

  db.one(
    "insert into recipes(name, ingredients, description, difficulty, time_cooking ,categories_id, sub_category_id, image)" +
      "values(${name}, ${ingredients}, ${description}, ${difficulty}, ${time_cooking}, ${categories_id}, ${sub_category_id}, ${image}) RETURNING id",
    req.body
  )
    .then(function (data) {
      res.status(200).json({
        id: data.id,
        status: "success",
        message: "Inserted ONE recipe",
      })
    })
    .catch(function (err) {
      console.log("Hallon", req.body)
      console.log(err)
      return next(err)
    })
}

//PUT
function updateRecipe(req, res, next) {
  //console.log("BODY", req.body)
  console.log("FILE", req.file)
  console.log(req.body)
  req.body["image"] =
    req.file !== undefined ? req.file.originalname : req.body.image_name

  db.none(
    "update recipes set name=$1, ingredients=$2, description=$3, difficulty=$4, time_cooking=$5 , categories_id=$6, sub_category_id=$7, image=$8 where id=$9",
    [
      req.body.name,
      req.body.ingredients,
      req.body.description,
      req.body.difficulty,
      req.body.time_cooking,
      req.body.categories_id,
      req.body.sub_category_id,
      req.body.image,
      parseInt(req.params.id),
    ]
  )
    .then(function () {
      res.status(200).json({
        status: "success",
        message: "Updated Recipe",
      })
    })
    .catch(function (err) {
      return next(err)
    })
}

//DELTE
function removeRecipe(req, res, next) {
  var RecipeID = parseInt(req.params.id)
  db.result("delete from recipes where id = $1", RecipeID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200).json({
        status: "success",
        message: `Removed ${result.rowCount} Recipe`,
      })
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err)
    })
}

module.exports = {
  getAllRecipes: getAllRecipes,
  getSingleRecipe: getSingleRecipe,
  createRecipe: createRecipe,
  updateRecipe: updateRecipe,
  removeRecipe: removeRecipe,
  getMainAndSubCategories: getMainAndSubCategories,
  getAllCategories: getAllCategories,
  getAllRecipesByCategory: getAllRecipesByCategory,
  getAllSubCategories: getAllSubCategories,
  getAllRecipesBySubCategory: getAllRecipesBySubCategory,
}
