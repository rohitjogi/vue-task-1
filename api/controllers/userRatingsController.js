const { pool } = require("../utils/pgconnect");
const { BadRequest, NotFound } = require("../utils/errors");

const getAlbumUserRatingsById = (req, res, next) => {
	const id = parseInt(req.params.id);
	pool.query(
		"select * from userratings u where u.userid = $1",
		[id],
		(error, results) => {
			if (!results) {
				next(new NotFound(error.message));
			} else {
				res.status(200).json(results.rows);
			}
		}
	);
};

const createUserRating = (req, res, next) => {
	const id = parseInt(req.params.id);
	const { rating, albumid } = req.body;
	pool.query(
		`UPDATE userratings u SET rating = $2  WHERE u.userid=$1 and albumid=$3  `,
		[id, rating, albumid],
		() => {
			pool.query(
				`INSERT INTO userratings (userid , rating , albumid)
select $1, $2, $3 WHERE NOT EXISTS (SELECT 1 FROM userratings u WHERE u.userid = $1 and u.albumid=$3)`,
				[id, rating, albumid],
				(error, results) => {
					if (error) {
						next(new BadRequest(error.message));
					} else {
						const uid = results.rows;
						res.status(201).json(uid);
					}
				}
			);
		}
	);
};
module.exports = {
	getAlbumUserRatingsById,
	createUserRating,
};
