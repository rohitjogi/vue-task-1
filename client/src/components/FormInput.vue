<template>
	<div id="formInputContainer">
		<label :for="name">{{ name | capitalize }}: </label>
		<input :id="name" :type="type" :name="name" v-model="inputValue" />
	</div>
</template>

<script>
export default {
	name: "FormInput",
	props: ["inputType", "inputName", "value"],
	computed: {
		type: function() {
			return this.inputType;
		},
		name: function() {
			return this.inputName;
		},
		inputValue: {
			get() {
				return this.value;
			},
			set(value) {
				this.$store.commit("updateMessage", value);
			},
		},
	},
};
</script>

<style></style>
