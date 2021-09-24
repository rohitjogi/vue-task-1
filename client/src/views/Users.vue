<template>
	<Wrapper>
		<h1>Users Details</h1>
		<form id="userForm">
			<label for="uid">Uid : </label>
			<input
				:disabled="user.data.operation == 'edit'"
				id="uid"
				v-model="user.data.uid"
				type="text"
				name="uid"
			/>
			<br />
			<label for="name">Name : </label>
			<input id="name" v-model="user.data.name" type="text" name="name" />
			<br />
			<button v-on:click.prevent="onSubmit">
				{{
					user.data.operation === "edit" ? "save" : "add" | capitalize
				}}
			</button>
		</form>
		<DataTable :data="users"></DataTable>
	</Wrapper>
</template>

<script>
import Wrapper from "../components/Wrapper.vue";
import DataTable from "../components/DataTable.vue";
import { ADD_USER, EDIT_USER, FETCH_USERS } from "../store/actions.type";
import { mapGetters, mapState } from "vuex";
import { ADD, EDIT } from "../constants";

export default {
	name: "Users",
	computed: {
		...mapGetters(["users"]),
		...mapState(["user"]),
		// isInputDisabled: function() {
		// 	const { operation } = this.user.data;
		// 	return {
		// 		uid: operation == "edit" || operation == "delete",
		// 		name: operation == "delete",
		// 	};
		// },
	},
	mounted() {
		this.$store.dispatch(FETCH_USERS);
	},
	components: {
		Wrapper,
		DataTable,
	},
	methods: {
		onSubmit() {
			const { operation, uid, name } = this.user.data;
			if (operation === ADD) {
				this.$store.dispatch(ADD_USER, {
					uid,
					name,
				});
			} else if (operation === EDIT) {
				this.$store.dispatch(EDIT_USER, this.user.data);
			}
		},
	},
};
</script>

<style>
.userForm {
	align-items: center;
	flex-direction: column;
	display: flex;
}
</style>
