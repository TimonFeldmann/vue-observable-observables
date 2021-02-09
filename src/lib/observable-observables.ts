// Most of this file is comprised of mostly hacky code due to the fact that I am using a popup spawned by the main application document
// as a development tool. This implementation was written in such a way where the popup should be able to survive hot-reloads
// initiated by webpack.

import Vue from "vue";
import Popup from "@/views/Popup.vue";
import CopyStyles from "@/lib/copy-styles.ts";
import observedObservablesType from "types/observedObservables";
import { v4 as guid } from "uuid";

export const observedObservables: observedObservablesType = {};

// This plugin does not use Vue.use on purpose. We cannot instantiate this plugin with a function invocation as a function invocation
// would cause the below code to run after all imports containing Vue.observables have already been instantiated.
// We need to let the import execution allow the plugin to get instantiates as this will guarantee that the below code will be run
// before all else.
let initialized = false;

if (initialized === false) {
	let typedPhrase = "";
	let timeoutHandler: null | number = null;

	// Do not initialize this plugin in the actual plugin popup itself
	window.vueObservablePopup = null;

	const baseObservable = Vue.observable;

	Vue.observable = (<T>(obj: T, observableName: string | null = null): T => {
		const observedObject = baseObservable(obj);
		const keyName =
			observableName === null ? `Unnamed-${guid()}` : observableName;

		observedObservables[keyName] = obj;

		return observedObject;
	}) as <T>(obj: T) => T; // Need to cast as original type declaration as the above type does not conform to the parameter
	// declaration defined by the original type.

	// Allow opening the popup by typing "observe" anywhere in the application.
	window.addEventListener("keyup", e => {
		if (["o", "b", "s", "e", "r", "v", "e"].includes(e.key) === true) {
			if (timeoutHandler !== null) {
				clearTimeout(timeoutHandler);
			}

			typedPhrase = `${typedPhrase}${e.key}`;

			if (
				typedPhrase === "observe" &&
				window.vueObservablePopup === null
			) {
				window.observeObservables();
			}

			timeoutHandler = setTimeout(() => {
				typedPhrase = "";
			}, 2000);
		}
	});

	window.observeObservables = () => {
		const popupWidth = parseInt(
			localStorage.getItem("observableToolWidth") || "1200"
		);
		const popupHeight = parseInt(
			localStorage.getItem("observableToolHeight") || "600"
		);

		const popup = window.open(
			"about:blank",
			"vue-observable-observable",
			`height=${popupHeight},width=${popupWidth}`
		);

		// Set Interval as it may take the popup some time to open.
		const popupOpenInterval = setInterval(() => {
			if (popup !== null) {
				clearInterval(popupOpenInterval);

				window.vueObservablePopup = popup;

				// To keep the popup open after hot-reloads.
				localStorage.setItem("observableToolOpen", "true");

				popup.addEventListener("keydown", e => {
					// Prevent refreshing the popup. This breaks state.
					if (e.key === "F5") {
						e.preventDefault();
					}
				});

				// We set an interval as it may take the popup some time to initialize the DOM.
				const popupInitializedInterval = setInterval(() => {
					const html = `<div id="popupPlaceholder"></div>`;
					const body = popup.document.body;

					if (body !== null) {
						// All CSS stylesheets belonging to the popup are actually written to the primary window's document.
						// We need to copy the CSS from the primary window over to the popup window.
						// This is the reason why component styles are not used in this plugin.
						CopyStyles(document, popup.document);

						const appLoaded = body.querySelector(
							"#vueObservableApp"
						);

						if (appLoaded === null) {
							body.innerHTML = html;

							const app = body.querySelector("#popupPlaceholder");

							if (app !== null) {
								clearInterval(popupInitializedInterval);

								new Vue({
									render: h => h(Popup)
								}).$mount(app);
							}
						}
					}
				}, 100);

				popup.onbeforeunload = () => {
					popup.close();

					// We wait 500 ms as hot-reloads also trigger onbeforeunload.
					// We do not want hot-reloads to close the popup.
					setTimeout(() => {
						window.vueObservablePopup = null;

						localStorage.setItem("observableToolOpen", "false");
					}, 500);
				};

				popup.onresize = () => {
					// Cache popup size to retain size on reopen
					localStorage.setItem(
						"observableToolWidth",
						popup.outerWidth.toString()
					);
					localStorage.setItem(
						"observableToolHeight",
						popup.outerHeight.toString()
					);
				};
			}
		}, 100);
	};

	const popupWasOpen = localStorage.getItem("observableToolOpen") === "true";

	if (popupWasOpen === true) {
		// Popup was open before a hot-reload occurred.
		// Reopen the popup so the developer does not have to reopen it themselves
		window.observeObservables();
	}

	initialized = true;
}

export default {
	install: (isDev: boolean) => {
		if (isDev === false) {
			window.observeObservables = () => {
				alert(
					"Observing observables is only possible in development mode."
				);
			};
		}
	}
};
