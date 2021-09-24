const express = require("express");
const router = express.Router();
let users = require("../controllers/usersController");
const { asyncHandler } = require("../helper/asyncHandler");

router.get(
	"/",
	asyncHandler((req, res, next) => users.getUsers(req, res, next))
);
router.get(
	"/:id",
	asyncHandler((req, res, next) => users.getUserById(req, res, next))
);
router.put(
	"/:id",
	asyncHandler((req, res, next) => users.updateUser(req, res, next))
);
router.post(
	"/",
	asyncHandler((req, res, next) => users.createUser(req, res, next))
);
router.patch(
	"/:id",
	asyncHandler((req, res, next) => users.updateUsername(req, res, next))
);
router.delete(
	"/:id",
	asyncHandler((req, res, next) => users.deleteUser(req, res, next))
);

module.exports = router;
