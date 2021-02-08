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
					@click="toggleChildNodeCollapse(propertyName)"
					class="observable-node-property-details-container__caret-right"
					v-if="
						propertyIsObject(propertyName) &&
							childNodeIsExpanded(propertyName) === true
					"
				></caret-right-svg>
				<caret-down-svg
					@click="toggleChildNodeCollapse(propertyName)"
					class="observable-node-property-details-container__caret-down"
					v-if="
						propertyIsObject(propertyName) &&
							childNodeIsExpanded(propertyName) === false
					"
				></caret-down-svg>
				<div
					@click="toggleChildNodeCollapse(propertyName)"
					class="observable-node-property-details-container__name"
				>
					{{ propertyName }}:
				</div>
				<div
					@click="toggleChildNodeCollapse(propertyName)"
					v-if="propertyIsObject(propertyName) === true"
					class="observable-node-property-details-container__descriptor"
				>
					{{ getObjectDescriptorText(propertyName) }}
				</div>
				<input
					v-if="propertyIsInputType(propertyName) === true"
					@input="inputFilter(propertyName, $event)"
					:value="selectedObservable[propertyName]"
				/>
			</div>
			<inner-observable-node
				:parentName="propertyName"
				:selectedObservable="selectedObservable[propertyName]"
				:depth="depth + 15"
				v-if="
					getTypeOfProperty(propertyName) === 'object' &&
						childNodeIsExpanded(propertyName) === true
				"
			></inner-observable-node>
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
			expandedChildNodes: [] as string[]
		};
	},
	methods: {
		inputFilter(propertyName: string, event: InputEvent) {
			if (event.currentTarget) {
				// Allows setting property values to arrays / objects.
				const evalValue = eval(
					`(${(event.currentTarget as HTMLInputElement).value})`
				);

				this.$set(this.selectedObservable, propertyName, evalValue);
			}
		},
		getTypeOfProperty(propertyName: string): string {
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
		childNodeIsExpanded(propertyName: string): boolean {
			return this.expandedChildNodes.includes(propertyName);
		},
		toggleChildNodeCollapse(propertyName: string) {
			const childNodeIndex = this.expandedChildNodes.findIndex(
				x => x === propertyName
			);

			if (childNodeIndex !== -1) {
				this.expandedChildNodes.splice(childNodeIndex);
			} else {
				this.expandedChildNodes.push(propertyName);
			}
		},
		getObjectDescriptorText(propertyName: string): string {
			const property = this.selectedObservable[propertyName];

			if (Array.isArray(property)) {
				return `Array(${property.length})`;
			} else {
				return "Object";
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
			type: [Object, Array]
		},
		parentName: {
			required: true,
			type: [String, Number]
		},
		depth: {
			required: true,
			type: Number
		}
	}
});
</script>

<style lang="scss">
.slide-enter-active,
.slide-leave-active {
	transition: max-height 0.5s ease-in-out;
}

.slide-enter-to,
.slide-leave {
	overflow: hidden;
	max-height: 1000px;
}

.slide-enter,
.slide-leave-to {
	overflow: hidden;
	max-height: 0;
}
</style>

<style scoped lang="scss">
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
