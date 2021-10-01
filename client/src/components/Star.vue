<template>
	<div @mouseleave="handleMouseLeave">
		<font-awesome-icon
			v-for="index in 5"
			:key="index"
			@mouseover="changeRatingOnHover(index + 1)"
			@click.prevent="saveRating(index + 1)"
			:style="styles"
			:color="currentRating <= index ? 'white ' : 'yellow'"
			icon="star"
		/>
	</div>
</template>

<script>
import {
	SAVE_USER_ALBUM_RATINGS,
	USER_RATINGS_PAGE_FETCH_ALBUMS,
} from "../store/actions.type";
export default {
	name: "Star",
	data() {
		return {
			rateOnHover: 0,
			selectedRating: 0,
			initalStyle: {
				cursor: "pointer",
				stroke: "black",
				"stroke-width": "15px",
			},
		};
	},
	props: ["albumId", "disabled", "rating"],
	computed: {
		//check rating if hover state or saved state
		currentRating() {
			return this.rating
				? this.rating
				: this.rateOnHover
				? this.rateOnHover
				: this.selectedRating;
		},
		styles() {
			return this.disabled
				? {
						...this.initalStyle,
						"pointer-events": "none",
				  }
				: this.initalStyle;
		},
	},
	methods: {
		changeRatingOnHover(rating) {
			this.rateOnHover = rating;
		},
		saveRating(rating) {
			this.selectedRating = rating;
			const payload = { rating: rating - 1, albumId: this.albumId };
			this.$store.dispatch(SAVE_USER_ALBUM_RATINGS, payload);
			this.$store.dispatch(USER_RATINGS_PAGE_FETCH_ALBUMS);
		},
		handleMouseLeave() {
			this.rateOnHover = 0;
		},
	},
};
</script>

<style></style>
