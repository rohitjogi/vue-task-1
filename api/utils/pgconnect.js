const Pool = require("pg").Pool;
exports.pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "music",
	password: "ihatepasswords",
	port: 5432,
});
