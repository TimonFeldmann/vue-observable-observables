import Vue, { VueConstructor } from "vue";

declare module "vue/types/vue" {
	interface VueConstructor<V extends Vue = Vue> {
		observable<T>(obj: T, observableName: string | null): T;
	}
}

export default {
	install: (isDev: boolean) => {}
}
