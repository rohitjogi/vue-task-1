<template>
	<div class="container">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: "Wrapper",
};
</script>

<style>
.container {
	padding: 20px;
}
</style>
