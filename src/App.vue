<template>
	<div id="vueObservableApp">
		<popup></popup>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Popup from "@/views/Popup.vue";

export default Vue.extend({
	components: {
		Popup
	},
	data() {
		return {};
	},
	mounted() {
		const src = new Image().src;
	}
});
</script>

<style scoped lang="scss">
#vueObservableApp {
	color: white;
}
</style>
