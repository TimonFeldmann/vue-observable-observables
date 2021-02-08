import Vue from 'vue';

declare module "vue/types/vue" {
	interface VueConstructor<V extends Vue = Vue> {
		observable<T>(obj: T, observableName: string | null): T;
	}
}
