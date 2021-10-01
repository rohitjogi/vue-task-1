const mongoose = require("mongoose");
const { BadRequest, NotFound } = require("../utils/errors");
const Album = mongoose.model("Album");

const getalbums = (req, res, next) => {
	Album.find({})
		.populate("artist")
		.exec()
		.then(function (data) {
			res.json({ albums: data });
		});
};

const getalbumById = async (req, res, next) => {
	const alid = req.params.id;
	const album = await Album.findOne({ alid: "alid1" });
	//  (error, data) => {
	// 	const art = data.art;
	// 	res.json({
	// 		data,
	// 	});
	// });
	// Album.findOne({ alid: "alid1" }, (err, data) => {
	// 	if (err) {
	// 		res.json({
	// 			message: err.message,
	// 		});
	// 	}
	// 	res.json({
	// 		data,
	// 	});
	// });
	// .populate("Artist")
	// .exec(function (err, album) {
	// 	if (err) {
	// 		res.json({
	// 			message: err.message,
	// 		});
	// 		return;
	// 	}
	// 	res.json({ album });
	// });
};

const createalbum = (req, res, next) => {
	const { name, albumArt, alid } = req.body.formData;
	const { _id: artistId } = req.body.artist;

	const album = new Album();

	album.alid = alid;
	album.name = name;
	album.albumArt = albumArt;
	album.artist = artistId;

	album.save().then(function (album) {
		res.json({ album });
		// return res.json({ artist: artist.toJSON() });
	});
};

const updatealbumname = (req, res, next) => {
	const { albumname, albumart } = req.body;
	const id = parseInt(req.params.id);
	pool.query(
		" update albums u set albumname = $1 , albumart = $2 where u.id  = $3  RETURNING id",
		[albumname, albumart, id],
		(error, results) => {
			if (!results.rows.length) {
				next(new BadRequest("Approved album cant be edited"));
			} else res.status(200).send(`album modified with ID: ${id}`);
		}
	);
};

const deletealbum = (req, res, next) => {
	const id = parseInt(req.params.id);
	pool.query("DELETE FROM albums WHERE id = $1", [id], (error, results) => {
		if (error) {
			next(new NotFound(error.message));
		}
		res.status(200).send(`album deleted with ID: ${id}`);
	});
};

module.exports = {
	getalbums,
	getalbumById,
	createalbum,
	updatealbumname,
	deletealbum,
};
