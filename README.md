# Vue Observable Observables

<img src="https://raw.githubusercontent.com/TimonFeldmann/vue-observable-observables/master/readme-assets/Observable-Observables.png" width="480" height="270"/>



Vue Observable Observables is an extension-less development tool for Vue allowing the observing and modification of all Vue.observables registered by your application.

No browser extension is required for this development tool.

# Sample

<img src="https://raw.githubusercontent.com/TimonFeldmann/vue-observable-observables/master/readme-assets/Sample.gif" width="100%" height="50%"/>


# Install

1. `npm install vue-observable-observables`
2. Place the following code at the very top of your application's entry file:

`import VueObservableObservable from 'vue-observable-observables';
import 'vue-observable-observables/dist/vue-observable-observables.css';

VueObservableObservable.install(true);`

VueObservableObservable.install takes a single parameter: DevMode. If DevMode is set to true, the dev tool will be useable.

# Usage

You may have to allow popups in order for this tool to function.

To open the dev tool:

1. Type "observe" anywhere in your application.
2. Execute `console.observeObservables()` in console.
3. Select your observable on the left of the popup and observe / modify the corresponding properties on the right.

This tool adds a second **optional** parameter to the Vue.observable() method which identifies the observable object in the development tool. No modifications are required to your existing Vue.observable() calls; however if you would like to identify your observables easily in the dev tool, provide a name as the second parameter to Vue.observable().

TypeScript typings are provided for this parameter modification to Vue.observable().

# FAQ

- Why create a popup development tool instead of creating a browser extension, isn't that insane?
  - I wanted to see if it would be possible to develop a Vue development tool without requiring additional extensions. It turns out that with some hacks to deal with hot-reloading and style acquisitions across domains, it is very possible!

  On top of just doing it for fun, my place of work also does not allow developers to install their own extensions so this was a neat workaround :)

- How does this tool work?
  - This tool works by overriding Vue.observable and caching a reference of all objects passed to it. When the tool is invoked, the main document creates a new window, grabs a handle of the popup window's document object, and begins mounting DOM elements to it and copying styles from the main document to the popup document.

  The cached references to the Observable objects are then imported into the popup and rendered into a Vue component where they are recursively v-modeled to editable input elements.

  Finally, a state of the popup is kept in localStorage so when a hot-reload happens, we can ensure the popup will not close or take you away from your observable.

- Are you supposed to use popups like this? Isn't overwriting methods from other libraries a bad practice?
  - No and Yes. I made this development tool because I needed the tool myself for work and I thought it would be fun to make it without requiring a browser extension.

- Why build this when Vue 3 already has DevTool support for reactive methods?
  - See above. Many organizations will likely stick with Vue 2 for some time until dependent frameworks have also migrated to Vue 3.0.

- What if I have an issue?
  - I have no idea if anyone will use this tool. However, if you use the tool and run into an issue, please submit an issue request and I'll look into it.

# To-Do List
1. More testing across different projects
2. It is already possible to add new objects / arrays to properties. It should also be possible to redefine existing arrays / objects.
3. Add an animation to node collapses / expands - **EXTREMELY** important
   1. Removed from release because animations seem to break on hot-reload. I have not identified the cause.