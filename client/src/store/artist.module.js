import ApiService from "../common/api.service";
import {
	ADD_ARTIST_TO_DATATABLE,
	CLEAR_ARTIST_INPUT,
	REMOVE_ARTIST_TO_DATATABLE,
	SET_ERROR,
} from "./mutations.type";
import {
	ADD_ARTIST,
	DELETE_ARTIST,
	EDIT_ARTIST,
	SELECT_ARTIST,
	UPDATE_ARTIST_IN_DATATABLE,
} from "./actions.type";
import { ADD } from "../constants";

const state = {
	errors: {},
	data: {
		aid: "",
		name: "",
		operation: ADD,
	},
};

const getters = {};

const actions = {
	[EDIT_ARTIST](context, payload) {
		// context.commit(CLEAR_ARTIST_INPUT);
		return new Promise((resolve, reject) => {
			ApiService.put(`/artists/${payload.aid}`, { artist: payload })
				.then(({ data }) => {
					context.commit(CLEAR_ARTIST_INPUT);
					context.commit(UPDATE_ARTIST_IN_DATATABLE, payload);
					// const { artistss } = this.$store.state.home;
					// const artistsToEdit = artistss.find((artist) => artist.aid === aid);
					// TODO: update datatable
					resolve(data);
				})
				.catch((err) => {
					// #todo SET_ERROR cannot work in multiple states
					context.commit(SET_ERROR, err);
					reject(err);
				});
		});
	},
	[DELETE_ARTIST](context, payload) {
		return new Promise((resolve, reject) => {
			ApiService.delete(`/artists/${payload.aid}`)
				.then(({ data }) => {
					context.commit(CLEAR_ARTIST_INPUT);
					context.commit(REMOVE_ARTIST_TO_DATATABLE, data);
					resolve(data);
				})
				.catch((err) => {
					// #todo SET_ERROR cannot work in multiple states
					context.commit(SET_ERROR, err);
					reject(err);
				});
		});
	},
	[ADD_ARTIST](context, payload) {
		return new Promise((resolve, reject) => {
			ApiService.post("artists ", { artist: payload })
				.then(({ data }) => {
					context.commit(CLEAR_ARTIST_INPUT);
					context.commit(ADD_ARTIST_TO_DATATABLE, data);
					resolve(data);
				})
				.catch((err) => {
					// #todo SET_ERROR cannot work in multiple states
					context.commit(SET_ERROR, err);
					reject(err);
				});
		});
	},
};

const mutations = {
	[SET_ERROR](state, error) {
		state.errors = error;
	},
	[CLEAR_ARTIST_INPUT](state) {
		state.data = {
			aid: "",
			name: "",
			operation: ADD,
		};
	},
	[SELECT_ARTIST](state, payload) {
		state.data = { ...payload.artist, operation: payload.operation };
	},
};

export default {
	state,
	actions,
	mutations,
	getters,
};
