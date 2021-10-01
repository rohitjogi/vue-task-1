<template>
	<wrapper center="true">
		<table class="dataTable">
			<tr>
				<th>{{ tableHeader }}</th>
				<th>Name</th>
				<th v-if="currentRouteName === 'albums'">Artist Name</th>
				<th>Edit</th>
				<th>Delete</th>
			</tr>

			<tr v-for="item in items" :key="item.id">
				<td>{{ item.id }}</td>
				<td>{{ item.name }}</td>
				<td v-if="currentRouteName === 'albums'">
					{{ item.artist.name }}
				</td>
				<td>
					<font-awesome-icon
						@click.prevent="selectItem(item.id)"
						style="cursor : pointer;"
						icon="edit"
					/>
				</td>
				<td>
					<font-awesome-icon
						@click.prevent="deleteItem(item.id)"
						style="cursor : pointer;"
						icon="trash"
					/>
				</td>
			</tr>
		</table>
	</wrapper>
</template>

<script>
import {
	DELETE_ARTIST,
	DELETE_USER,
	SELECT_ARTIST,
	SELECT_USER,
} from "../store/actions.type";
import {
	ALBUMS_ROUTE,
	ARTISTS_ROUTE,
	EDIT,
	USERS_ROUTE,
} from "../constants/index";
import Wrapper from "./Wrapper.vue";
// TODO: find better solution for resuseability across diff routes
export default {
	components: { Wrapper },
	name: "DataTable",
	props: ["data"],
	computed: {
		items: function() {
			//update data for resuseability
			const cleansedData = this.data.map((i) => {
				return {
					...i,
					id: i.uid || i.aid || i.alid,
					name: i.name,
				};
			});

			return cleansedData;
		},
		currentRouteName() {
			return this.$route.name;
		},
		tableHeader() {
			let text =
				this.currentRouteName === USERS_ROUTE
					? "Uid"
					: this.currentRouteName === ARTISTS_ROUTE
					? "Aid"
					: this.currentRouteName === ALBUMS_ROUTE
					? "Alid"
					: "";

			return text;
		},
	},
	methods: {
		selectItem(id) {
			if (this.currentRouteName === USERS_ROUTE) {
				const { users } = this.$store.state.home;
				const ItemToEdit = users.find((item) => item.uid === id);
				this.$store.commit(SELECT_USER, {
					user: ItemToEdit,
					operation: EDIT,
				});
			} else if (this.currentRouteName === ARTISTS_ROUTE) {
				const { artists } = this.$store.state.home;
				const ItemToEdit = artists.find((item) => item.aid === id);
				this.$store.commit(SELECT_ARTIST, {
					artist: ItemToEdit,
					operation: EDIT,
				});
			} else if (this.currentRouteName === ALBUMS_ROUTE) {
				const { albums } = this.$store.state.home;
				const ItemToEdit = albums.find((item) => item.alid === id);
				console.log(ItemToEdit);
				// this.$store.commit(SELECT_ARTIST, {
				// 	artist: ItemToEdit,
				// 	operation: EDIT,
				// });
			}
		},
		deleteItem(id) {
			if (this.currentRouteName === USERS_ROUTE) {
				this.$store.dispatch(DELETE_USER, {
					uid: id,
				});
			} else if (this.currentRouteName === ARTISTS_ROUTE) {
				this.$store.dispatch(DELETE_ARTIST, {
					aid: id,
				});
			}
		},
	},
};
</script>

<style>
.dataTable {
	font-family: arial, sans-serif;
	border-collapse: collapse;
	width: 700px;

	margin: 10px;
}

.dataTable td,
th {
	border: 2px solid #000000;
	text-align: center;
	font-size: 17px;
	padding: 8px;
	width: 10%;
	text-transform: capitalize;
}

.dataTable tr:nth-child(even) {
	background-color: #d2d8d8;
}
</style>
