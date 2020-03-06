![Tripetto](https://docs.tripetto.com/assets/header.svg)

Tripetto is a full-fledged form kit. Rapidly create and deploy smart flowing forms and surveys. Drop the kit in your codebase and use all of it, or just the parts you need. The visual [**editor**](https://www.npmjs.com/package/tripetto) is for form creation, the [**collector**](https://www.npmjs.com/package/tripetto-collector) for response collection and the [**SDK**](https://docs.tripetto.com/guide/blocks) for developing more form building blocks.

# Text block
[![Status](https://gitlab.com/tripetto/blocks/hidden-field/badges/master/pipeline.svg)](https://gitlab.com/tripetto/blocks/hidden-field/commits/master)
[![Version](https://img.shields.io/npm/v/tripetto-block-hidden-field.svg)](https://www.npmjs.com/package/tripetto-block-hidden-field)
[![License](https://img.shields.io/npm/l/tripetto-block-hidden-field.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dt/tripetto-block-hidden-field.svg)](https://www.npmjs.com/package/tripetto-block-hidden-field)
[![Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/tripetto)

Hidden field action block for the Tripetto editor. Use it to add hidden fields to your form and add logic based on the value of those hidden fields.

[![Try the demo](https://docs.tripetto.com/assets/button-demo.svg)](https://s.codepen.io/tripetto/debug/eqOBPN)
[![View the code](https://docs.tripetto.com/assets/button-codepen.svg)](https://s.codepen.io/tripetto/pen/eqOBPN)

# Get started
You need to install or import this block to use it in Tripetto. If you are using the CLI version of the editor, you can find instructions [here](https://docs.tripetto.com/guide/editor/#cli-configuration). If you are embedding the editor into your own project using the library, take a look [here](https://docs.tripetto.com/guide/editor/#library-blocks).

# Use cases
- Directly in your browser (add `<script src="https://unpkg.com/tripetto-block-hidden-field"></script>` to your HTML);
- In the CLI editor (install the block using `npm i tripetto-block-hidden-field -g` and update your Tripetto [config](https://docs.tripetto.com/guide/editor/#cli-configuration));
- In your editor implementation (just add `import "tripetto-block-hidden-field";` to your code);
- In your collector implementation (simply add `import "tripetto-block-hidden-field/collector";` to your code. By default the `ES5` version is used. Append `/es5` or `/es6` to your import to request a specific version (for example `import "tripetto-block-hidden-field/collector/es6";` for the `ES6` version).

# Support
Run into issues or bugs? Report them [here](https://gitlab.com/tripetto/blocks/hidden-field/issues) and we'll look into them.

For general support contact us at [support@tripetto.com](mailto:support@tripetto.com). We're more than happy to assist you.

# License
Have a blast. [MIT](https://opensource.org/licenses/MIT).

# About us
If you want to learn more about Tripetto or contribute in any way, visit us at [Tripetto.com](https://tripetto.com/).
