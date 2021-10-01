<template>
	<Wrapper>
		<h1>Albums page</h1>
		<div class="formContainer artistPageForm">
			<div id="selectSource">
				<label for="users">User : </label>
				<br />
				<select
					name="users"
					id="users"
					v-model="album.formData.selectedUser"
				>
					<option value="" selected disabled hidden
						>Choose User</option
					>
					<option
						v-for="user in album.users"
						:key="user.uid"
						:value="user.name"
						>{{ user.name }}
					</option>
				</select>
				<br />
				<label for="aid">Aid : </label>
				<br />
				<select
					name="aid"
					id="aid"
					v-model="album.formData.selectedArtist"
				>
					<option value="" selected disabled hidden
						>Choose Artist</option
					>
					<option
						v-for="artist in album.artists"
						:key="artist.aid"
						:value="artist.name"
						>{{ artist.name }}
					</option>
				</select>
			</div>
			<form id="albumsForm">
				<label for="alid">Alid : </label>
				<br />
				<input
					id="alid"
					v-model="album.formData.alid"
					type="text"
					name="alid"
					:disabled="optionsSelected"
				/>
				<br />
				<label for="name">Name : </label>
				<br />
				<input
					id="name"
					v-model="album.formData.name"
					type="text"
					name="name"
					:disabled="optionsSelected"
				/>
				<br />
				<label for="albumArt">AlbumArt Url: </label>
				<br />
				<input
					id="albumArt"
					v-model="album.formData.albumArt"
					type="text"
					name="albumArt"
					:disabled="optionsSelected"
				/>
				<br />
				<button class="formSubmit " v-on:click.prevent="onSubmit">
					Add
				</button>
			</form>
		</div>
		<DataTable :data="albums"></DataTable>
	</Wrapper>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Wrapper from "../components/Wrapper.vue";
import DataTable from "../components/DataTable.vue";
import { ALBUM_ADD } from "../constants";
import {
	ALBUMS_PAGE_FETCH_ALBUMS,
	ALBUMS_PAGE_FETCH_ARTISTS,
	ALBUMS_PAGE_FETCH_USERS,
	CREATE_ALBUM,
	FETCH_ALBUMS,
} from "../store/actions.type";
export default {
	name: "Albums",
	computed: {
		...mapGetters(["albums_users", "albums_artists", "albums"]),
		...mapState(["album"]),
		optionsSelected() {
			return (
				this.album.formData.selectedUser.length &&
				this.album.formData.selectedArtist.length
			);
		},
	},
	components: {
		Wrapper,
		DataTable,
	},
	mounted() {
		this.$store.dispatch(ALBUMS_PAGE_FETCH_USERS);
		this.$store.dispatch(ALBUMS_PAGE_FETCH_ARTISTS);
		this.$store.dispatch(FETCH_ALBUMS);
	},
	methods: {
		onSubmit() {
			const { formData, operation } = this.album;
			if (operation === ALBUM_ADD) {
				this.$store.dispatch(CREATE_ALBUM, {
					formData,
				});
			}
		},
	},
};
</script>

<style scoped>
.artistPageForm {
	justify-content: space-evenly !important;
}
</style>
