![Tripetto](https://docs.tripetto.com/assets/header.svg)

Tripetto is a full-fledged form kit. Rapidly create and deploy smart flowing forms and surveys. Drop the kit in your codebase and use all of it, or just the parts you need. The visual [**editor**](https://www.npmjs.com/package/tripetto) is for form creation, the [**collector**](https://www.npmjs.com/package/tripetto-collector) for response collection and the [**SDK**](https://docs.tripetto.com/guide/blocks) for developing more form building blocks.

# Boilerplate for creating blocks
[![Status](https://gitlab.com/tripetto/blocks/boilerplate/badges/master/pipeline.svg)](https://gitlab.com/tripetto/blocks/boilerplate/commits/master)
[![Styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Docs](https://img.shields.io/badge/docs-website-blue.svg)](https://docs.tripetto.com/guide/blocks)
[![Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/tripetto)

Perhaps one of the best things about Tripetto is that you can create your own building blocks. This boilerplate shows you how to do that. Use it as a starting point for your creativity.

# Get started
1. [Download](https://gitlab.com/tripetto/blocks/boilerplate/repository/master/archive.zip) or clone the [repository](https://gitlab.com/tripetto/blocks/boilerplate) to your local machine:
```bash
$ git clone https://gitlab.com/tripetto/blocks/boilerplate.git
```

2. Run `npm install` inside the downloaded/cloned folder:
```bash
$ npm install
```

3. Start the editor and load the block in developer (test) mode:
```bash
$ npm test
```

This command will start the local editor server and tries to open the URL `http://localhost:3333` in your default browser. If no browser opens, just open the browser of your choice and navigate to this [URL](http://localhost:3333). By default the [form definition](https://docs.tripetto.com/guide/editor/#definitions) located at `./test/example.json` is loaded.

Next, open your favorite code editor/IDE and start working on your block. When a source code change is detected, the block should automatically recompile and the Tripetto editor in the browser should refresh.

# Publish your block
When your block is done, you may want to publish it. Make sure you update the name and description in `package.json` before doing so. Also set the `private` property to `false` (currently it is set to `true` to preserve unwanted publication).

Next, run the following command to increment the package version number, do a production build and publish the package to the [npm](https://www.npmjs.com/) registry.

```bash
$ npm run publish:patch
```

When your block is published, other people can install it and start using it inside the Tripetto editor. All details on how to do that can be found [here](https://docs.tripetto.com/guide/editor/).

# Documentation
The complete documentation can be found at [docs.tripetto.com](https://docs.tripetto.com).

Detailed **blocks** documentation is found [here](https://docs.tripetto.com/guide/blocks/).

# Support
Run into issues or bugs? Report them [here](https://gitlab.com/tripetto/blocks/boilerplate/issues) and we'll look into them.

For general support contact us at [support@tripetto.com](mailto:support@tripetto.com). We're more than happy to assist you.

# License
Have a blast. [MIT](https://opensource.org/licenses/MIT).

# Community
We hope other enthusiasts will also start to develop and share collectors and blocks for Tripetto. We have a [repository](https://github.com/tripetto/community) where we collect a list of community driven blocks and collectors. Did you build something? Submit a [PR](https://github.com/tripetto/community/pulls) and add yours to the list. We appreciate it!

# About us
If you want to learn more about Tripetto or contribute in any way, visit us at [Tripetto.com](https://tripetto.com/).
