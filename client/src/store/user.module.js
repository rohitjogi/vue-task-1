import ApiService from "../common/api.service";
import {
	CLEAR_USER_INPUT,
	SET_ERROR,
	ADD_USER_TO_DATATABLE,
	REMOVE_USER_FROM_DATATABLE,
	UPDATE_USER_IN_DATATABLE,
} from "./mutations.type";
import { ADD_USER, DELETE_USER, EDIT_USER, SELECT_USER } from "./actions.type";
import { ADD } from "../constants";

const state = {
	errors: {},
	data: {
		uid: "",
		name: "",
		operation: ADD,
	},
};

const getters = {};

const actions = {
	[EDIT_USER](context, payload) {
		// context.commit(CLEAR_USER_INPUT);
		return new Promise((resolve, reject) => {
			ApiService.put(`/users/${payload.uid}`, { user: payload })
				.then(({ data }) => {
					context.commit(CLEAR_USER_INPUT);
					context.commit(UPDATE_USER_IN_DATATABLE, payload);
					// const { users } = this.$store.state.home;
					// const userToEdit = users.find((user) => user.uid === uid);
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
	[DELETE_USER](context, payload) {
		return new Promise((resolve, reject) => {
			ApiService.delete(`/users/${payload.uid}`)
				.then(({ data }) => {
					context.commit(CLEAR_USER_INPUT);
					context.commit(REMOVE_USER_FROM_DATATABLE, payload);
					resolve(data);
				})
				.catch((err) => {
					// #todo SET_ERROR cannot work in multiple states
					context.commit(SET_ERROR, err);
					reject(err);
				});
		});
	},
	[ADD_USER](context, payload) {
		return new Promise((resolve, reject) => {
			ApiService.post("users ", { user: payload })
				.then(({ data }) => {
					context.commit(CLEAR_USER_INPUT);
					context.commit(ADD_USER_TO_DATATABLE, data);
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
	[CLEAR_USER_INPUT](state) {
		state.data = {
			uid: "",
			name: "",
			operation: ADD,
		};
	},
	[SELECT_USER](state, payload) {
		state.data = { ...payload.user, operation: payload.operation };
	},
};

export default {
	state,
	actions,
	mutations,
	getters,
};
