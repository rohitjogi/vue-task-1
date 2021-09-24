const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/task1");
require("./models/User");
require("./models/Artist");
const usersRoute = require("./routes/userRoutes");
const artistsRoute = require("./routes/artistsRoutes");
// const albumsRoute = require("./routes/albumsRoute");
// const userRatingsRoute = require("./routes/userRatingsRoutes");
// const albumsRatingsRoute = require("./routes/albumsRatingsRoutes");
const cors = require("cors");
const handleErrors = require("./middleware/errorhandler");

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRoute);
app.use("/api/artists", artistsRoute);
// app.use("/api/albums", albumsRoute);
// app.use("/api/userratings", userRatingsRoute);
// app.use("/api/albumsratings", albumsRatingsRoute);

app.use(handleErrors);

const PORT = 4000;

app.listen(PORT, () => {
	console.log("listening on port 4000");
});
