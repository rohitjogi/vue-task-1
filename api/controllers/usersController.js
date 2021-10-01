// const { pool } = require("../utils/pgconnect");
const mongoose = require("mongoose");
const { BadRequest, NotFound } = require("../utils/errors");
const User = mongoose.model("User");

const getUsers = async (req, res, next) => {
	const query = req.query.q;
	if (query === "getAlbums") {
		User.find({})
			.populate({
				path: "ratings.album",
			})
			.exec()
			.then(function (data) {
				res.json({
					users: data,
				});
			});
	} else {
		User.find({}, (error, data) => {
			if (error) {
				next(new BadRequest(error.message));
			}
			res.status(200).json({
				users: data,
			});
		});
	}
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

const updateUserAlbumRating = async (req, res, next) => {
	const { alid, id } = req.params;
	const { rating } = req.body;
	User.findOneAndUpdate(
		{ _id: id, "ratings.album": alid },
		{ $set: { "ratings.$.rating": rating } },
		{ new: true },
		(error, user) => {
			if (error) {
				next(new BadRequest(error.message));
			}
			console.log(user);
			res.status(200).json({
				user,
			});
		}
	);
};
const updateUserAlbums = async (req, res, next) => {
	const { albumId: album } = req.body;
	const id = req.params.id;
	User.findOneAndUpdate(
		{ _id: id },
		{ $push: { ratings: { album: album } } },
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

const updateUser = async (req, res, next) => {
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
	updateUserAlbums,
	updateUserAlbumRating,
};
