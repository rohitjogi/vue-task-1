import Vue from "vue";
import VueRouter from "vue-router";
import {
	ALBUMS_ROUTE,
	ARTISTS_ROUTE,
	USERS_ROUTE,
	USER_RATINGS_ROUTE,
} from "../constants";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		component: () => import("../views/Home.vue"),
		children: [
			{
				path: "/users",
				name: USERS_ROUTE,
				component: () => import("../views/Users.vue"),
			},
			{
				path: "/artists",
				name: ARTISTS_ROUTE,
				component: () => import("../views/Artists.vue"),
			},
			{
				path: "/albums",
				name: ALBUMS_ROUTE,
				component: () => import("../views/Albums.vue"),
			},
			{
				path: "/users-ratings",
				name: USER_RATINGS_ROUTE,
				component: () => import("../views/UserRatings.vue"),
			},
		],
	},
];

const router = new VueRouter({
	routes,
});

export default router;
