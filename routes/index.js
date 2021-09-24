var express = require("express")
var router = express.Router()
var multer = require("multer")
var multerS3 = require("multer-s3")
var aws = require("aws-sdk")

//save file image to disk
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "client/public/images")
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   },
// })

// var upload = multer({ storage: storage })

var s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "eu-north-1",
})

var bucket = process.env.S3_BUCKET_NAME
// save files to S3
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucket,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      cb(null, file.originalname)
    },
  }),
})

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
router.get("/api/recipes/last", db.getLastRecipes)
router.get("/api/recipes/:id", db.getSingleRecipe)

router.post("/api/recipes", upload.single("new_image"), db.createRecipe)

router.put("/api/recipes/:id", upload.single("new_image"), db.updateRecipe)
router.delete("/api/recipes/:id", db.removeRecipe)

router.get("/api/all_categories", db.getMainAndSubCategories)

router.get("/api/categories", db.getAllCategories)
router.get("/api/categories/:id/recipe", db.getAllRecipesByCategory)

router.get("/api/subcategories", db.getAllSubCategories)
router.get("/api/sub_categories/:id/recipe", db.getAllRecipesBySubCategory)

module.exports = router
