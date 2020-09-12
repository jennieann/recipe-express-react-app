var express = require("express")
var router = express.Router()

var passport = require("passport")

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Recept API", user: req.user })
})

// login endpoints

router.get("/login", function (req, res) {
  res.render("login")
})

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/")
  }
)

router.get("/logout", function (req, res) {
  req.logout()
  res.redirect("/")
})

// user endpoint
router.get("/api/user", function (req, res) {
  const user = req.user ? req.user : null

  if (user) {
    res.status(200).json({
      status: "success",
      user: user,
      code: 200,
      message: "Get user",
    })
  } else {
    res.status(401).json({
      status: "unauthorized",
      user: user,
      code: 401,
      message: "Login Required",
    })
  }
})

// recipe endpoints that fetches from db

var db = require("../queries")

router.get("/api/recipes", db.getAllRecipes)
router.get("/api/recipes/:id", db.getSingleRecipe)

router.post("/api/recipes", db.createRecipe)

router.put("/api/recipes/:id", db.updateRecipe)
router.delete("/api/recipes/:id", db.removeRecipe)

router.get("/api/all_categories", db.getMainAndSubCategories)

router.get("/api/categories", db.getAllCategories)
router.get("/api/categories/:id/recipe", db.getAllRecipesByCategory)

router.get("/api/subcategories", db.getAllSubCategories)
router.get("/api/sub_categories/:id/recipe", db.getAllRecipesBySubCategory)

module.exports = router
