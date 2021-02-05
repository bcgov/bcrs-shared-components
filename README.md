# bcrs-shared-components

This library is based on https://github.com/bcgov/entity/blob/master/rfcs/rfc-shared-components.md.

The Storybook (sample) pages for this library are at https://bcgov.github.io/bcrs-shared-components/.

## How to Publish New or Upgraded Component to npm?

- run `lerna bootstrap --hoist` to update depencency (for local development)
- run `lerna version --include-merged-tags` and select a version (Do not run this from fork. It depends on git tags to identify changes)
- run `lerna publish from-package` to publish to npm

# Workflow

### 1. Clone this repo to your workstation

```
git clone git@github.com:bcgov/bcrs-shared-components.git
cd bcrs-shared-components
```

### 2. If needed, update your local source code

```
git fetch --all
git reset --all bcgov/master
```
Warning: this overwrites any uncommitted changes on your branch

### 3. Create a local feature branch

```
git co -b my-feature-branch
```

### 4. Install dependencies

```
npm i
npm i --global lerna     // if you didn't do this previously
```

### 5. Create your component in its own folder (eg, `src/components/MyComponent/MyComponent.vue`)

### 6. Create `package.json file` for your component (see others as examples)

### 7. Create new Storybook file for your component (see others as examples)

### 8. Create create unit test file for your component and verify locally

```
npm run test:unit MyComponent
```

### 9. Build Storybook and verify your component

```
npm run storybook:build     // only required the first time per feature
npm run storybook
```

Storybook should open in your browser (and will auto-rebuild on code changes).

Note: GitHub Pages are used to serve the Storybook app folder. As this requires a developer to build before committing, they should ensure that they are building
the latest code (ie, including all other recent changes in the repo).

### 10. Update lerna dependencies

```
lerna bootstrap --hoist
```

### 11. Push your changes to main repo

```
git push --set-upstream origin my-feature-branch
```

### 12. Create a PR from your branch to "master" in GitHub

### 13. Once PR is approved, have Lerna update the versions

```
lerna version --include-merged-tags
```

### 14. Publish to npm

```
lerna publish from-package
```

### 15. Commit the new changes (ie, package versions)

### 16. Merge the PR

### 17. You can now import your new component into a Vue project!

# Special Procedures

## How to Create a New Package You Depend on (eg, new "mixins" folder)

If you want, you can create a new shared package for supporting code (eg, "interfaces"). Or,
you can just create a local copy of the files that you need (eg, with only the content that
you need) that your shared component will use when running in Storybook. When your component is running in your actual app, it would use the app's copy of those files.

Eg, the following will use the bcrs-shared-components files in Storybook, or your app's files
when deployed:
```
import { DateMixin, FilingMixin } from '@/mixins'
```

The only downside to this approach is that the bcrs-shared-components' files need to provide the
same functionality as the app's files -- duplicate code. Also, the bcrs-shared-component's files
will be unversioned. However, in some cases, these are acceptable compromises in order to
maintain clean code.

## How to Update an Existing Package

_future_

# References

https://lerna.js.org/

https://storybook.js.org/

https://git-scm.com/
