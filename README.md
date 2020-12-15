# bcrs repository for shared components
![Lifecycle](https://img.shields.io/badge/Lifecycle-Stable-97ca00)


## bcrs-shared-components

See https://github.com/bcgov/entity/blob/master/rfcs/rfc-shared-components.md.

How to publish new or upgraded component to npm?

- run `lerna bootstrap --hoist` to update depencency (for local development)

- run `lerna version --include-merged-tags` and select a version (Do not run this from fork. It depends on git tags to identify changes)

- run `lerna publish from-package` to publish to npm
