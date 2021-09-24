import ApiService from "../common/api.service";
import { CLEAR_INPUT, SET_ERROR } from "./mutations.type";
import {
	ADD_ARTIST,
	DELETE_ARTIST,
	EDIT_ARTIST,
	SELECT_ARTIST,
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
		// context.commit(CLEAR_INPUT);
		return new Promise((resolve, reject) => {
			ApiService.put(`/artistss/${payload.aid}`, { artist: payload })
				.then(({ data }) => {
					context.commit(CLEAR_INPUT);
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
			ApiService.delete(`/artistss/${payload.aid}`)
				.then(({ data }) => {
					context.commit(CLEAR_INPUT);
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
					context.commit(CLEAR_INPUT);
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
	[CLEAR_INPUT](state) {
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
