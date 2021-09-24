const express = require("express");
const router = express.Router();
const userRatings = require("../controllers/userRatingsController");
const { asyncHandler } = require("../helper/asyncHandler");

router.put(
	"/:id",
	asyncHandler((req, res, next) =>
		userRatings.createUserRating(req, res, next)
	)
);
router.get(
	"/:id",
	asyncHandler((req, res, next) =>
		userRatings.getAlbumUserRatingsById(req, res, next)
	)
);

module.exports = router;
