import { artistsService, usersService } from "../common/api.service";
import { FETCH_ARTISTS, FETCH_USERS } from "./actions.type";
import {
	FETCH_START,
	FETCH_END,
	SET_USERS,
	SET_ARISTS,
} from "./mutations.type";

const state = {
	users: [],
	artists: [],
	isLoading: true,
};

const getters = {
	users(state) {
		return state.users;
	},
	artists(state) {
		return state.artists;
	},
};

const actions = {
	[FETCH_USERS]({ commit }) {
		commit(FETCH_START);
		return usersService
			.get()
			.then(({ data }) => {
				commit(SET_USERS, data);
				commit(FETCH_END, data);
			})
			.catch((error) => {
				throw new Error(error);
			});
	},
	[FETCH_ARTISTS]({ commit }) {
		commit(FETCH_START);
		return artistsService
			.get()
			.then(({ data }) => {
				commit(SET_ARISTS, data);
				commit(FETCH_END, data);
			})
			.catch((error) => {
				throw new Error(error);
			});
	},
};

const mutations = {
	[FETCH_START](state) {
		state.isLoading = true;
	},
	[FETCH_END](state) {
		state.isLoading = false;
	},
	[SET_USERS](state, { users }) {
		state.users = users;
	},
	[SET_ARISTS](state, { artists }) {
		state.artists = artists;
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
