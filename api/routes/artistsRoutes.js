const express = require("express");
const router = express.Router();
let artists = require("../controllers/artistsController");
const { asyncHandler } = require("../helper/asyncHandler");

//used
router.get(
	"/",
	asyncHandler((req, res, next) => artists.getartists(req, res, next))
);
router.get(
	"/:id",
	asyncHandler((req, res, next) => artists.getartistById(req, res, next))
);
router.put(
	"/:id",
	asyncHandler((req, res, next) => artists.updateartistname(req, res, next))
);
router.post(
	"/",
	asyncHandler((req, res, next) => artists.createartist(req, res, next))
);
router.patch(
	"/:id",
	asyncHandler((req, res, next) => artists.updateartistname(req, res, next))
);
router.delete(
	"/:id",
	asyncHandler((req, res, next) => artists.deleteartist(req, res, next))
);

module.exports = router;
