const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const {storage} = require("../cloudinary");
const multer = require("multer");

const upload = multer({storage});

const {isLoggedIn, isAuthor, validateCampground} = require("../middleware");
const campgrounds = require("../controllers/campgrounds");

router.get("/new", isLoggedIn, campgrounds.renderNewForm);
router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

router.route("/")
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array("image"), validateCampground, catchAsync(campgrounds.createCampground));

router.get("/:id", catchAsync(campgrounds.showCampground));
router.put("/:id", isLoggedIn, upload.array("image"), isAuthor, validateCampground, catchAsync(campgrounds.updateCampground));
router.delete("/:id", isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

module.exports = router;