const express = require("express");
const router = express.Router();
const albumsRatings = require("../controllers/albumsRatingsController");
const { asyncHandler } = require("../helper/asyncHandler");

router.get(
	"/:id",
	asyncHandler((req, res, next) =>
		albumsRatings.getAlbumRatingsById(req, res, next)
	)
);

module.exports = router;
