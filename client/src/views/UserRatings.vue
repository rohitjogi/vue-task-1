<template>
	<wrapper>
		<h1>User ratings</h1>
		<label for="users">User : </label>
		<select name="users" id="users" v-model="usersratings.selectedUser">
			<option value="" selected disabled hidden>Choose User</option>
			<option
				v-for="user in usersratings.users"
				:key="user.uid"
				:value="user.name"
				>{{ user.name }}
			</option>
		</select>
		<div id="albumContainer">
			<div
				id="album"
				v-for="album in usersratings.displayedAlbums"
				:key="album.alid"
			>
				<div class="albumCover">
					<img :src="album.albumArt" :alt="album.name" />
				</div>
				<div class="albumInfo">
					<div class="albumName">
						<b>{{ album.name }}</b>
						<br />

						<small>{{ album.artist.name }}</small>
					</div>
					<div class="rating">
						<Star
							:disabled="!usersratings.selectedUser.length"
							:albumId="album._id"
							:rating="album.rating"
						></Star>
					</div>
				</div>
			</div>
		</div>
	</wrapper>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Wrapper from "../components/Wrapper.vue";
import Star from "../components/Star.vue";
import {
	USER_RATINGS_PAGE_FETCH_ALBUMS,
	USER_RATINGS_PAGE_FETCH_USERS,
	USER_RATINGS_PAGE_FILTER_ALBUMS,
} from "../store/actions.type";
import { FILTER_USER_ALBUMS } from "../store/mutations.type";
export default {
	name: "UserRatings",
	components: { Wrapper, Star },
	computed: {
		...mapGetters(["getAllAlbums"]),
		...mapState(["usersratings"]),
	},
	mounted() {
		this.$store.dispatch(USER_RATINGS_PAGE_FETCH_USERS);
		this.$store.dispatch(USER_RATINGS_PAGE_FETCH_ALBUMS);
	},
	watch: {
		"usersratings.selectedUser": function(newVal) {
			const data = this.usersratings.users
				.filter((user) => user.name === newVal)
				.map((user) => user.ratings)[0];
			this.$store.commit(FILTER_USER_ALBUMS, { userAlbums: data });
		},
	},
};
</script>

<style>
#albumContainer {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 1.2rem;
	padding: 10px;
	justify-content: space-evenly;
}

.albumInfo {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-evenly;
	align-content: stretch;
	align-items: flex-start;
}
.albumCover img {
	width: 250px;
	height: 250px;
}
</style>
