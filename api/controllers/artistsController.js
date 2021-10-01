// const { pool } = require("../utils/pgconnect");
const mongoose = require("mongoose");
const { BadRequest, NotFound } = require("../utils/errors");
const Artist = mongoose.model("Artist");

const getartists = (req, res, next) => {
	Artist.find({}, (error, data) => {
		if (error) {
			next(new BadRequest(error.message));
		}
		res.status(200).json({
			artists: data,
		});
	});
};

const getartistById = async (req, res, next) => {
	const { id } = req.params;
	console.log(id);
	Artist.findById({ _id: id }, (err, data) => {
		res.json({
			data,
		});
	});
};

const createartist = (req, res, next) => {
	const { aid, name } = req.body.artist;

	const artist = new Artist();

	artist.aid = aid;
	artist.name = name;

	artist.save().then(function () {
		return res.json({ artist: artist.toJSON() });
	});
};

const updateartistname = (req, res, next) => {
	const { name } = req.body.artist;
	const id = req.params.id;
	Artist.findOneAndUpdate(
		{ aid: id },
		{ $set: { name } },
		{ new: true },
		(error, artist) => {
			if (error) {
				next(new BadRequest(error.message));
			}
			res.status(200).json({
				artist,
			});
		}
	);
};

const deleteartist = (req, res, next) => {
	const id = req.params.id;
	Artist.findOneAndDelete({ aid: id }, (error, artist) => {
		if (error) {
			next(new BadRequest(error.message));
		}
		res.status(200).json({
			artist,
		});
	});
};

module.exports = {
	getartists,
	getartistById,
	createartist,
	updateartistname,
	deleteartist,
};
