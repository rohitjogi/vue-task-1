import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { API_URL } from "@/common/config";

const ApiService = {
	init() {
		Vue.use(VueAxios, axios);
		Vue.axios.defaults.baseURL = API_URL;
	},

	query(resource, params) {
		return Vue.axios.get(resource, params).catch((error) => {
			throw new Error(`[RWV] ApiService ${error}`);
		});
	},

	get(resource) {
		return Vue.axios.get(`${resource}`).catch((error) => {
			throw new Error(`[RWV] ApiService ${error}`);
		});
	},

	post(resource, params) {
		return Vue.axios.post(`${resource}`, params).catch((error) => {
			throw new Error(`[RWV] ApiService ${error}`);
		});
	},

	update(resource, slug, params) {
		return Vue.axios.put(`${resource}/${slug}`, params);
	},

	put(resource, params) {
		return Vue.axios.put(`${resource}`, params);
	},

	delete(resource) {
		return Vue.axios.delete(resource).catch((error) => {
			throw new Error(`[RWV] ApiService ${error}`);
		});
	},
};

export default ApiService;

export const usersService = {
	get(queryParams = []) {
		let query = "users";
		const queryLen = queryParams.length;

		if (queryLen) query += "?";

		queryParams.forEach((val, index) => {
			if (queryLen == index + 1) {
				query += "q=" + val;
			} else {
				query += "q=" + val + "&";
			}
		});

		return ApiService.get(query);
	},
	updateAlbum(uid, alid, payload) {
		return ApiService.put(`users/${uid}/albums/${alid}`, payload);
	},
	updateAlbums(id, payload) {
		return ApiService.put(`users/${id}/albums`, payload);
	},
	update(id, payload) {
		return ApiService.put(`users/${id}`, payload);
	},
};

export const artistsService = {
	get() {
		return ApiService.get("artists");
	},
	getSingle(id) {
		return ApiService.get(`artists/${id}`);
	},
};

export const AlbumsService = {
	get() {
		return ApiService.get("albums");
	},
	create(payload) {
		return ApiService.post(`albums`, payload);
	},
};
