<template>
	<div class="home">
		<Sidebar class="flex-item"></Sidebar>
		<router-view class="flex-item" />
	</div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";

export default {
	name: "Home",
	components: { Sidebar },
};
</script>

<style scoped>
.home {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-content: stretch;
	align-items: flex-start;
	gap: 15px;
	height: 90vh;
}

.flex-item:nth-child(1) {
	order: 0;
	flex: 0 1 auto;
	align-self: center;
	text-align: left;
}

.flex-item:nth-child(2) {
	order: 0;
	flex: 1 1 auto;
	align-self: center;
}
</style>
