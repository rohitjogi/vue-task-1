var mongoose = require("mongoose");

var UserAlbumRatingSchema = new mongoose.Schema({
	album: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Album",
	},
	rating: {
		type: Number,
		default: 0,
	},
});
var UserSchema = new mongoose.Schema(
	{
		uid: {
			type: String,
			lowercase: true,
			unique: true,
			required: [true, "can't be blank"],
			index: true,
		},
		name: {
			type: String,
			lowercase: true,
			unique: true,
			required: [true, "can't be blank"],
			index: true,
		},
		ratings: [UserAlbumRatingSchema],
	},
	{ timestamps: true }
);

UserSchema.methods.toJSON = function () {
	return this.toObject();
	// return {
	// 	_id: this._id,
	// 	uid: this.uid,
	// 	name: this.name,
	// };
};

mongoose.model("User", UserSchema, "users");
