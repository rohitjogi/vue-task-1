import {
	AlbumsService,
	artistsService,
	usersService,
} from "../common/api.service";
import { ALBUM_ADD } from "../constants";
import {
	ALBUMS_PAGE_FETCH_ARTISTS,
	ALBUMS_PAGE_FETCH_USERS,
	CREATE_ALBUM,
	CLEAR_ALBUM_DATA,
	ALBUMS_PAGE_FETCH_ALBUMS,
} from "./actions.type";
import {
	FETCH_START,
	FETCH_END,
	ALBUMS_PAGE_SET_USERS,
	ALBUMS_PAGE_SET_ARISTS,
	ALBUMS_PAGE_SET_ALBUMS,
} from "./mutations.type";

const state = {
	artists: [],
	users: [],
	formData: {
		name: "",
		alid: "",
		selectedUser: "",
		selectedArtist: "",
		albumArt: "",
	},
	isLoading: true,
	operation: ALBUM_ADD,
};

const getters = {
	albums_users(state) {
		return state.users;
	},
	albums_artists(state) {
		return state.artists;
	},
	getUser(state) {
		return (name) => {
			return state.users.find((user) => user.name === name);
		};
	},
	getArtist(state) {
		return (name) => {
			return state.artists.find((artist) => artist.name === name);
		};
	},
};

const actions = {
	[ALBUMS_PAGE_FETCH_USERS]({ commit }) {
		// commit(FETCH_START);
		return usersService
			.get()
			.then(({ data }) => {
				commit(ALBUMS_PAGE_SET_USERS, data);
				// commit(FETCH_END, data);
			})
			.catch((error) => {
				throw new Error(error);
			});
	},

	[CREATE_ALBUM]({ commit, getters }, payload) {
		// commit(FETCH_START);
		const { formData } = payload;
		const artist = getters.getArtist(formData.selectedArtist);
		const user = getters.getUser(formData.selectedUser);
		return new Promise((resolve, reject) => {
			AlbumsService.create({ formData, artist })
				.then(({ data }) => {
					resolve(data);
					console.log(data);
					usersService
						.updateAlbums(user._id, { albumId: data.album._id })
						.then(() => {
							console.log(data);
						});
				})
				.catch((error) => {
					throw new Error(error);
				})
				.finally(() => {
					commit(CLEAR_ALBUM_DATA);
				});
		});
	},
	[ALBUMS_PAGE_FETCH_ARTISTS]({ commit }) {
		// commit(FETCH_START);
		return artistsService
			.get()
			.then(({ data }) => {
				commit(ALBUMS_PAGE_SET_ARISTS, data);
				// commit(FETCH_END, data);
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
	[ALBUMS_PAGE_SET_USERS](state, { users }) {
		state.users = users;
	},
	[ALBUMS_PAGE_SET_ARISTS](state, { artists }) {
		state.artists = artists;
	},
	[CLEAR_ALBUM_DATA](state) {
		state.formData = {
			name: "",
			alid: "",
			selectedUser: "",
			selectedArtist: "",
			albumArt: "",
		};
		state.operation = ALBUM_ADD;
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
