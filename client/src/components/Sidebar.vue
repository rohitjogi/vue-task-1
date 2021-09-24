<template>
	<div id="sidebarContainer">
		<ul v-for="(route, index) in routes" :key="index">
			<router-link :to="route.link">{{ route.name }}</router-link>
		</ul>
	</div>
</template>

<script>
export default {
	name: "Sidebar",
	data() {
		return {
			routes: [
				{
					name: "Users",
					link: "/users",
				},
				{ name: "Artists", link: "/artists" },
				{ name: "Albums", link: "/albums" },
				{ name: "Users Rating", link: "/users-rating" },
				{ name: "Albums Rating", link: "/albums-rating" },
			],
		};
	},
};
</script>

<style>
ul {
	list-style: none;
}
</style>
