// const { pool } = require("../utils/pgconnect");
const mongoose = require("mongoose");
const { BadRequest, NotFound } = require("../utils/errors");
const User = mongoose.model("User");

const getUsers = async (req, res, next) => {
	User.find({}, (error, data) => {
		if (error) {
			next(new BadRequest(error.message));
		}
		res.status(200).json({
			users: data,
		});
	});
};

const createUser = (req, res, next) => {
	const { uid, name } = req.body.user;
	const user = new User();

	user.uid = uid;
	user.name = name;

	user.save().then(function () {
		return res.json({ user: user.toJSON() });
	});
};

// const getUserById = (req, res, next) => {
// 	const id = parseInt(req.params.id);
// 	pool.query("SELECT * FROM users where id = $1", [id], (error, results) => {
// 		if (!results) {
// 			next(new NotFound("user not found"));
// 		} else {
// 			res.status(200).json(results.rows[0]);
// 		}
// 	});
// };

const updateUser = async (req, res, next) => {
	console.log(req.body);
	const { name } = req.body.user;
	const id = req.params.id;
	User.findOneAndUpdate(
		{ uid: id },
		{ $set: { name } },
		{ new: true },
		(error, user) => {
			if (error) {
				next(new BadRequest(error.message));
			}
			res.status(200).json({
				user,
			});
		}
	);
};

const deleteUser = (req, res, next) => {
	const id = req.params.id;
	User.findOneAndDelete({ uid: id }, (error, user) => {
		if (error) {
			next(new BadRequest(error.message));
		}
		res.status(200).json({
			user,
		});
	});
};

module.exports = {
	getUsers,
	// getUserById,
	createUser,
	updateUser,
	deleteUser,
};
