const express = require("express");
const router = express.Router();
let albums = require("../controllers/albumsController");
const { asyncHandler } = require("../helper/asyncHandler");

router.get(
	"/",
	asyncHandler((req, res, next) => albums.getalbums(req, res, next))
);
router.get(
	"/:id",
	asyncHandler((req, res, next) => albums.getalbumById(req, res, next))
);
router.post(
	"/",
	asyncHandler((req, res, next) => albums.createalbum(req, res, next))
);
router.patch(
	"/:id",
	asyncHandler((req, res, next) => albums.updatealbumname(req, res, next))
);
router.delete(
	"/:id",
	asyncHandler((req, res, next) => albums.deletealbum(req, res, next))
);

module.exports = router;
