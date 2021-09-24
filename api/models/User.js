var mongoose = require("mongoose");

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
		albums: [{ type: mongoose.Schema.Types.ObjectId, ref: "Album" }],
	},
	{ timestamps: true }
);

UserSchema.methods.toJSON = function () {
	return {
		uid: this.uid,
		name: this.name,
	};
};

mongoose.model("User", UserSchema, "users");
