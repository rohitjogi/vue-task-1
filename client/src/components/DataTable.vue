<template>
	<div>
		<table class="dataTable">
			<tr>
				<th>{{ tableHeader }}</th>
				<th>Name</th>
				<th>Edit</th>
				<th>Delete</th>
			</tr>

			<tr v-for="item in items" :key="item.id">
				<td>{{ item.id }}</td>
				<td>{{ item.name }}</td>
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
	</div>
</template>

<script>
import { DELETE_USER, SELECT_ARTIST, SELECT_USER } from "../store/actions.type";
import { ARTISTS_ROUTE, EDIT, USERS_ROUTE } from "../constants/index";
// TODO: find better solution for resuseability across diff routes
export default {
	name: "DataTable",
	props: ["data"],
	computed: {
		items: function() {
			//update data for resuseability
			const cleansedData = this.data.map((i) => {
				return {
					id: i.uid || i.aid,
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
					: "";

			return text;
		},
	},
	methods: {
		selectItem(id) {
			const { users } = this.$store.state.home;
			const { artists } = this.$store.state.home;
			const items =
				this.currentRouteName === USERS_ROUTE ? users : artists;
			const ItemToEdit = items.find((item) => item.id === id);
			if (this.currentRouteName === USERS_ROUTE) {
				this.$store.commit(SELECT_USER, {
					user: ItemToEdit,
					operation: EDIT,
				});
			} else if (this.currentRouteName === ARTISTS_ROUTE) {
				this.$store.commit(SELECT_ARTIST, {
					user: ItemToEdit,
					operation: EDIT,
				});
			}
		},
		deleteItem(id) {
			this.$store.dispatch(DELETE_USER, {
				uid: id,
			});
		},
	},
};
</script>

<style>
.dataTable {
	font-family: arial, sans-serif;
	border-collapse: collapse;
	width: 100%;
}

.dataTable td,
th {
	border: 1px solid #434cce;
	text-align: left;
	padding: 8px;
}

.dataTable tr:nth-child(even) {
	background-color: #dddddd;
}
</style>
