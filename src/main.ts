import Vue from "vue";

import ObservableObservables from "@/lib/observable-observables";

ObservableObservables.install(true);


const sampleObject1 = {
	someProperty1: 5,
	someProperty2: 10
};

const sampleObject2 = {
	someProperty3: 15,
	someProperty4: 20,
	someNullProperty1: null,
	object1: {
		innerProperty1: 50,
		innerArray1: [
			1,
			2,
			3,
			"4s",
			"5s",
			"6s",
			{
				a: 1,
				b: 2
			}
		],
		innerProperty2: 100,
		innerObject1: {
			innerInnerProperty1: 200,
			innerInnerProperty2: 300,
			innerInnerProperty3: 400,
			innerInnerProperty4: 500,
			innerInnerProperty5: 600
		}
	},
	someProperty5: 25,
	someProperty6: 30
};

const sampleObject3 = {
	someProperty5: 25,
	someProperty6: 30,
	someProperty7: 25,
	someProperty8: 30,
	someProperty9: 25,
	someProperty10: 30,
	someProperty11: 25,
	someProperty12: 30,
	someProperty13: 25,
	someProperty14: 30,
	someProperty15: 25,
	someProperty16: 30,
	someProperty17: 25,
	someProperty18: 30,
	someProperty19: 25,
	someProperty20: 30,
	someProperty21: 25,
	someProperty22: 30,
	someProperty23: 25,
	someProperty24: 30
};
////
const sampleObservable1 = Vue.observable(sampleObject1, "sampleObject1");
const sampleObservable2 = Vue.observable(sampleObject2, "sampleObject2");
const sampleObservable3 = Vue.observable(sampleObject3);

setInterval(() => sampleObservable1.someProperty1++, 100);
setInterval(
	() => sampleObservable2.object1.innerObject1.innerInnerProperty1++,
	100
);
setInterval(
	() =>
		Vue.set(
			sampleObservable2.object1.innerArray1,
			2,
			// @ts-ignore
			sampleObject2.object1.innerArray1[2] + 1
		),
	100
);

Vue.config.productionTip = false;
