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
				<caret-right-svg
					@click="toggleChildNodeCollapse"
					class="observable-node-property-details-container__caret-right"
					v-if="
						propertyIsObject(propertyName) &&
							childNodeCollapsed === true
					"
				></caret-right-svg>
				<caret-down-svg
					@click="toggleChildNodeCollapse"
					class="observable-node-property-details-container__caret-down"
					v-if="
						propertyIsObject(propertyName) &&
							childNodeCollapsed === false
					"
				></caret-down-svg>
				<div
					@click="toggleChildNodeCollapse"
					class="observable-node-property-details-container__name"
				>
					{{ propertyName }}:
				</div>
				<div
					@click="toggleChildNodeCollapse"
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
			<transition name="slide">
				<inner-observable-node
					:parentName="propertyName"
					:selectedObservable="selectedObservable[propertyName]"
					:depth="depth + 15"
					v-if="
						getTypeOfProperty(propertyName) === 'object' &&
							childNodeCollapsed === false
					"
				></inner-observable-node>
			</transition>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import caretRightSvg from "@/assets/svg/caret-right-solid.svg";
import caretDownSvg from "@/assets/svg/caret-down-solid.svg";

export default Vue.extend({
	name: "inner-observable-node",
	components: {
		caretRightSvg,
		caretDownSvg
	},
	data() {
		return {
			childNodeCollapsed: true
		};
	},
	methods: {
		getTypeOfProperty(propertyName: string): string {
			// console.log("property: ", propertyName);
			// console.log("type: ", typeof this.selectedObservable[propertyName]);

			return typeof this.selectedObservable[propertyName];
		},
		propertyIsObject(propertyName: string): boolean {
			return this.getTypeOfProperty(propertyName) === "object";
		},
		propertyIsInputType(propertyName: string): boolean {
			const propertyType = this.getTypeOfProperty(propertyName);

			return propertyType !== "object" && propertyType !== "array";
		},
		getPropertyContainerClassModifier(propertyName: string) {
			const propertyType = this.getTypeOfProperty(propertyName);

			switch (propertyType) {
				case "object":
					return "--column";
				default:
					return "";
			}
		},
		toggleChildNodeCollapse() {
			this.childNodeCollapsed = !this.childNodeCollapsed;
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
@use 'src/styles/slide-animation.scss';

.observable-node-container {
	.observable-node-property-container,
	.observable-node-property-container--column {
		display: flex;
		margin: 0.5rem 0 0.5rem 0;

		.observable-node-property-details-container {
			display: flex;
			position: relative;

			svg {
				position: absolute;
				height: 1rem;
			}

			&__caret-down {
				top: 2px;
				left: -0.8rem;
			}

			&__caret-right {
				left: -0.5rem;
				top: 2px;
			}

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
