import Vue from "vue";
import Vuex from "vuex";
import user from "./user.module";
import artist from "./artist.module";
import home from "./home.module";
import album from "./album.module";
import usersratings from "./usersratings.module";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		home,
		user,
		artist,
		album,
		usersratings,
	},
});
