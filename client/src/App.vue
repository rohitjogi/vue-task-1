<template>
	<div id="app">
		<router-view />
	</div>
</template>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
}
.formContainer {
	text-align: left;
	display: flex;
	align-items: center;
	justify-content: center;
}
input[type="text"] {
	padding: 10px;
	border-radius: 5px;
	margin: 10px 0;
	font-size: larger;
}

select {
	width: 150px;
	padding: 5px;
	border-radius: 4px;
	margin: 10px 0;
}

.formSubmit {
	/* remove default behavior */
	appearance: none;
	-webkit-appearance: none;
	font-size: large;
	padding: 10px;
	border: none;
	background-color: #3f51b5;
	color: #fff;
	font-weight: 600;
	border-radius: 5px;
	width: 100%;
}
</style>
