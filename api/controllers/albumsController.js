const { pool } = require("../utils/pgconnect");
const { BadRequest, NotFound } = require("../utils/errors");

const getalbums = (req, res, next) => {
	pool.query(
		"select a.id as id , a2.id as artistid , albumname ,albumart , a2.artistname from albums a join artists a2 on a.artistid =  a2.id  order  by a.id ",
		(error, results) => {
			if (error) {
				next(new BadRequest(error.message));
			} else {
				res.status(200).json(results.rows);
			}
		}
	);
};

const getalbumById = (req, res, next) => {
	const id = parseInt(req.params.id);
	pool.query(
		"SELECT a.id as id , albumname ,albumart ,artistid ,artistname  FROM albums a  join artists a2 on  a.artistid = a2.id where a.id = $1",
		[id],
		(error, results) => {
			if (!results) {
				next(new NotFound("album not found"));
			} else {
				res.status(200).json(results.rows[0]);
			}
		}
	);
};

const createalbum = (req, res, next) => {
	const { albumname, albumart, artistid } = req.body;
	pool.query(
		"INSERT INTO albums(albumname, albumart, artistid) VALUES ($1  , $2 ,$3 ) RETURNING id",
		[albumname, albumart, artistid],
		(error, results) => {
			if (error) {
				next(new BadRequest(error.message));
			} else {
				const uid = results.rows[0].id;
				res.status(201).json(uid);
			}
		}
	);
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
