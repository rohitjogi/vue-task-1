import Vue from "vue";
import VueRouter from "vue-router";
import { ARTISTS_ROUTE, USERS_ROUTE } from "../constants";

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
		],
	},
];

const router = new VueRouter({
	routes,
});

export default router;
