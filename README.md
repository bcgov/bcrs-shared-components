# bcrs-shared-components

See https://github.com/bcgov/entity/blob/master/rfcs/rfc-shared-components.md.

How to publish new or upgraded component to npm?

- run `lerna bootstrap --hoist` to update depencency

- run `lerna version` and select a version

- run `lerna publish from-package` to publish to npm
