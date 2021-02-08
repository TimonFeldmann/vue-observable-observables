<template>
	<div class="observable-node-container" ref="root">
		<div
			:class="
				`observable-node-property-container${getPropertyContainerClassModifier(
					propertyName
				)}`
			"
			:key="`${parentName}-${propertyName}-property`"
			v-for="(propertyValue, propertyName) in selectedObservable"
		>
			<div class="observable-node-property-details-container">
				<div class="observable-node-property-details-container__name">
					{{ propertyName }}:
				</div>
				<div
					v-if="propertyIsObject(propertyName) === true"
					class="observable-node-property-details-container__descriptor"
				>
					Object
				</div>
				<input
					v-if="propertyIsInputType(propertyName) === true"
					v-model="selectedObservable[propertyName]"
				/>
			</div>
			<inner-observable-node
				:parentName="propertyName"
				:selectedObservable="selectedObservable[propertyName]"
				:depth="depth + 15"
				v-if="getTypeOfProperty(propertyName) === 'object'"
			></inner-observable-node>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	name: "inner-observable-node",
	methods: {
		getTypeOfProperty(propertyName: string): string {
			console.log("property: ", propertyName);
			console.log("type: ", typeof this.selectedObservable[propertyName]);

			return typeof this.selectedObservable[propertyName];
		},
		propertyIsObject(propertyName: string): boolean {
			return this.getTypeOfProperty(propertyName) === "object";
		},
		propertyIsInputType(propertyName: string): boolean {
			const propertyType = this.getTypeOfProperty(propertyName);

			return propertyType !== 'object' && propertyType !== 'array';
		},
		getPropertyContainerClassModifier(propertyName: string) {
			const propertyType = this.getTypeOfProperty(propertyName);

			switch (propertyType) {
				case "object":
					return "--column";
				default:
					return "";
			}
		}
	},
	mounted() {
		if (this.depth > 0) {
			(this.$refs
				.root as HTMLElement).style.transform = `translateX(${this.depth}px)`;
		}
	},
	props: {
		selectedObservable: {
			required: true,
			type: Object
		},
		parentName: {
			required: true,
			type: String
		},
		depth: {
			required: true,
			type: Number
		}
	}
});
</script>

<style scoped lang="scss">
.observable-node-container {
	.observable-node-property-container,
	.observable-node-property-container--column {
		display: flex;
		margin: 0.5rem 0 0.5rem 0;

		.observable-node-property-details-container {
			display: flex;

			&__name {
				margin-right: 0.5rem;
			}

			&__descriptor {
				color: white;
			}
		}

		&--column {
			flex-direction: column;
			margin: 0;
		}
	}
}
</style>
