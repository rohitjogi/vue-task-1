import {
	AlbumsService,
	artistsService,
	usersService,
} from "../common/api.service";
import {
	FETCH_ALBUMS,
	FETCH_ARTISTS,
	FETCH_USERS,
	UPDATE_ARTIST_IN_DATATABLE,
} from "./actions.type";
import {
	FETCH_START,
	FETCH_END,
	SET_USERS,
	SET_ARISTS,
	SET_ALBUMS,
	ADD_USER_TO_DATATABLE,
	REMOVE_USER_FROM_DATATABLE,
	UPDATE_USER_IN_DATATABLE,
	ADD_ARTIST_TO_DATATABLE,
	REMOVE_ARTIST_TO_DATATABLE,
} from "./mutations.type";
import { updateTableData } from "./utils";

const state = {
	users: [],
	artists: [],
	albums: [],
	isLoading: true,
};

const getters = {
	users(state) {
		return state.users;
	},
	artists(state) {
		return state.artists;
	},

	albums(state) {
		return state.albums;
	},
};

const actions = {
	[FETCH_ALBUMS]({ commit }) {
		// commit(FETCH_START);
		return AlbumsService.get()
			.then(({ data }) => {
				commit(SET_ALBUMS, data);
				// commit(FETCH_END, data);
			})
			.catch((error) => {
				throw new Error(error);
			});
	},
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
	[SET_ALBUMS](state, { albums }) {
		state.albums = albums;
	},
	[ADD_USER_TO_DATATABLE](state, payload) {
		const { user } = payload;
		state.users = [...state.users, user];
	},
	[ADD_ARTIST_TO_DATATABLE](state, payload) {
		const { artist } = payload;
		state.artists = [...state.artists, artist];
	},
	[REMOVE_ARTIST_TO_DATATABLE](state, { artist }) {
		const { aid } = artist;
		state.artists = state.artists.filter((i) => {
			return i.aid !== aid;
		});
		// console.log(state.artists, aid);
	},
	[REMOVE_USER_FROM_DATATABLE](state, payload) {
		const { uid } = payload;
		state.users = state.users.filter((i) => i.uid !== uid);
	},
	[UPDATE_USER_IN_DATATABLE](state, payload) {
		state.users = updateTableData(state.users, payload);
	},
	[UPDATE_ARTIST_IN_DATATABLE](state, payload) {
		state.artists = updateTableData(state.artists, payload);
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
