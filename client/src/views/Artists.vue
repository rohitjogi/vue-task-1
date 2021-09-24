<template>
	<Wrapper>
		<h1>Artists page</h1>
		<form id="artistForm">
			<label for="aid">Aid : </label>
			<input
				:disabled="artist.data.operation == 'edit'"
				id="aid"
				v-model="artist.data.aid"
				type="text"
				name="aid"
			/>
			<br />
			<label for="name">Name : </label>
			<input
				id="name"
				v-model="artist.data.name"
				type="text"
				name="name"
			/>
			<br />
			<button v-on:click.prevent="onSubmit">
				{{
					artist.data.operation === "edit"
						? "save"
						: "add" | capitalize
				}}
			</button>
		</form>
		<DataTable :data="artists"></DataTable>
	</Wrapper>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Wrapper from "../components/Wrapper.vue";
import DataTable from "../components/DataTable.vue";
import { ADD_ARTIST, EDIT_ARTIST, FETCH_ARTISTS } from "../store/actions.type";
import { ADD, EDIT } from "../constants";
export default {
	name: "Artists",
	computed: {
		...mapGetters(["artists"]),
		...mapState(["artist"]),
	},
	mounted() {
		this.$store.dispatch(FETCH_ARTISTS);
	},
	components: {
		Wrapper,
		DataTable,
	},
	methods: {
		onSubmit() {
			const { operation, aid, name } = this.artist.data;
			if (operation === ADD) {
				this.$store.dispatch(ADD_ARTIST, {
					aid,
					name,
				});
			} else if (operation === EDIT) {
				this.$store.dispatch(EDIT_ARTIST, this.artist.data);
			}
		},
	},
};
</script>

<style>
.artistForm {
	align-items: center;
	flex-direction: column;
	display: flex;
}
</style>
