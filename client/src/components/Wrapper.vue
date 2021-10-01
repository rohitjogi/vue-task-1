<template>
	<div class="container" :style="center ? styles : ''">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: "Wrapper",
	props: ["center"],
	data() {
		return {
			styles: {
				display: "flex",
				"justify-content": "center",
			},
		};
	},
};
</script>

<style>
.container {
	padding: 20px;
}
</style>
