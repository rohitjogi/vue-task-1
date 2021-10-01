import { AlbumsService, usersService } from "../common/api.service";
import {
	SAVE_USER_ALBUM_RATINGS,
	USER_RATINGS_PAGE_FETCH_ALBUMS,
	USER_RATINGS_PAGE_FETCH_USERS,
	USER_RATINGS_PAGE_FILTER_ALBUMS,
} from "./actions.type";
import {
	FILTER_USER_ALBUMS,
	USER_RATINGS_PAGE_SET_ALBUMS,
	USER_RATINGS_PAGE_SET_USERS,
} from "./mutations.type";

const state = {
	users: [],
	albums: [],
	displayedAlbums: [],
	selectedUser: "",
	isLoading: true,
};

const getters = {
	getUserData(state) {
		return (name) => {
			return state.users.find((user) => user.name === name);
		};
	},
	getAllAlbums(state) {
		return state.albums;
	},
};

const actions = {
	[USER_RATINGS_PAGE_FETCH_USERS]({ commit }) {
		// commit(FETCH_START);
		return usersService
			.get(["getAlbums"])
			.then(({ data }) => {
				commit(USER_RATINGS_PAGE_SET_USERS, data);
				// commit(FETCH_END, data);
			})
			.catch((error) => {
				throw new Error(error);
			});
	},
	[USER_RATINGS_PAGE_FETCH_ALBUMS]({ commit }) {
		// commit(FETCH_START);
		return AlbumsService.get()
			.then(({ data }) => {
				commit(USER_RATINGS_PAGE_SET_ALBUMS, data);
				// commit(FETCH_END, data);
			})
			.catch((error) => {
				throw new Error(error);
			});
	},
	[SAVE_USER_ALBUM_RATINGS]({ state, commit, getters }, payload) {
		const user = getters.getUserData(state.selectedUser);
		return usersService.updateAlbum(user._id, payload.albumId, payload);
	},
};

const mutations = {
	[USER_RATINGS_PAGE_SET_USERS](state, { users }) {
		state.users = users;
	},
	[USER_RATINGS_PAGE_SET_ALBUMS](state, { albums }) {
		state.albums = albums;
		state.displayedAlbums = albums;
	},
	[FILTER_USER_ALBUMS](state, { userAlbums }) {
		// const allAlbumsIds = userAlbums.
		const userRatedAlbumsIds = userAlbums.map(({ album }) => {
			return album._id;
		});
		const filteredAlbums = state.albums
			.map((album) => {
				const userAlbumIndex = userRatedAlbumsIds.indexOf(album._id);
				if (userAlbumIndex !== -1) {
					return {
						...album,
						rating: userAlbums[userAlbumIndex].rating,
					};
				} else return {};
			})
			.filter((i) => Object.keys(i).length);
		state.displayedAlbums = filteredAlbums;
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
