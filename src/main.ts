import Vue from "vue";

import ObservableObservables from "@/lib/observable-observables";

ObservableObservables.install(true);

Vue.observable(
	{
		a: 5
	},
	"Test"
);

Vue.config.productionTip = false;
