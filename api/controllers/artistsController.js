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

const getartistById = (req, res, next) => {
	const id = parseInt(req.params.id);
	pool.query(
		"SELECT * FROM artists where id = $1",
		[id],
		(error, results) => {
			if (!results) {
				next(new NotFound("artist not found"));
			} else {
				res.status(200).json(results.rows[0]);
			}
		}
	);
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
	const { artistname } = req.body;
	const id = parseInt(req.params.id);
	pool.query(
		" update artists u set artistname = $1 where u.id  = $2  RETURNING id",
		[artistname, id],
		(error, results) => {
			if (!results.rows.length) {
				next(new BadRequest("Approved artist cant be edited"));
			} else res.status(200).send(`artist modified with ID: ${id}`);
		}
	);
};

const deleteartist = (req, res, next) => {
	const id = parseInt(req.params.id);
	pool.query("DELETE FROM artists WHERE id = $1", [id], (error, results) => {
		if (error) {
			next(new NotFound(error.message));
		} else res.status(200).send(`artist deleted with ID: ${id}`);
	});
};

module.exports = {
	getartists,
	getartistById,
	createartist,
	updateartistname,
	deleteartist,
};
