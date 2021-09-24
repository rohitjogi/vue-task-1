const { pool } = require("../utils/pgconnect");
const { BadRequest, NotFound } = require("../utils/errors");

const getartists = (req, res, next) => {
	pool.query("SELECT * FROM artists ORDER BY id ASC", (error, results) => {
		if (error) {
			next(new BadRequest(error.message));
		}
		res.status(200).json(results.rows);
	});
};

const getAlbumRatingsById = (req, res, next) => {
	const id = parseInt(req.params.id);
	pool.query(
		`    select userid , rating from userratings u2 where u2.albumid = $1;`,
		[id],
		(error, results) => {
			if (error) {
				next(new BadRequest(error.message));
			} else {
				res.status(200).json(results.rows);
			}
		}
	);
};
module.exports = {
	getartists,
	getAlbumRatingsById,
};
