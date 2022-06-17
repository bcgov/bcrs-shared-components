# bcrs-shared-components

[![img](https://img.shields.io/badge/Lifecycle-Stable-97ca00)](https://github.com/bcgov/repomountie/blob/master/doc/lifecycle-badges.md)

This library is based on https://github.com/bcgov/entity/blob/master/rfcs/rfc-shared-components.md.

The Storybook (sample) pages for this library are at https://bcgov.github.io/bcrs-shared-components/.

# Workflow

### 1. Clone this repo to your workstation

```
git clone git@github.com:bcgov/bcrs-shared-components.git
cd bcrs-shared-components
```

### 2. If needed, update your local source code

```
git fetch --all
git reset --hard origin/main
```
Warning: this overwrites any uncommitted changes on your branch! Stash first if needed.

### 3. Create a local feature branch

```
git co -b my-feature-branch
```

### 4. Install dependencies

```
npm i                    // if new repo, first use Node < 16, then you can use Node 16
npm i --global lerna     // if you didn't do this previously
```

### 5. Create your component in its own folder (eg, `src/components/MyComponent/MyComponent.vue`)

### 6. Create `package.json file` for your component with version "0.0.0" (see others as examples)

### 7. Update Lerna dependencies

```
lerna bootstrap --hoist
```

This updates the node_modules/ in the sub-folders.

### 8. Create new Storybook file for your component (see others as examples)

### 9. Create unit test file for your component and verify locally

```
npm run test:unit MyComponent
```

### 10. Build Storybook and verify your component

```
npm run storybook:build
npm run storybook
```

Storybook should open in your browser (and will auto-rebuild on code changes).

Note: GitHub Pages are used to serve the Storybook app folder. As this requires a developer to
build before committing, they should ensure that they are building the latest code (ie,
including all other recent changes in the repo).

### 11. Commit your changes to main repo

```
git push --set-upstream origin my-feature-branch
```

### 12. Create a PR from your branch to "main" in GitHub

### 13. After reviews/fixes, merge your PR

### 14. Update your main branch and have Lerna update the versions of the affected components

```
git co main
git fetch origin
git reset --hard origin/main
lerna version --include-merged-tags
```

Note: This step will create new tags and commit them!

### 15. Publish to npm

```
lerna publish from-package
```

Note: For this step, you need to be logged in to NPM (along with permissions on this library)... follow the prompts if applicable.

### 16. You can now import your new component into a Vue project!

# Special Procedures

## How to Create a New Package You Depend on (eg, new "mixins" folder)

If you want, you can create a new shared package for supporting code (eg, "interfaces"). Or,
you can just create a local copy of the files that you need (eg, with only the content that
you need) that your shared component will use when running in Storybook. When your component
is running in your actual app, it would use the app's copy of those files.

Eg, the following will use the bcrs-shared-components files in Storybook, or your app's files
when deployed:
```
import { DateMixin, FilingMixin } from '@/mixins'
```

The only downside to this approach is that the bcrs-shared-components' files need to provide the
same functionality as the app's files -- duplicate code. Also, the bcrs-shared-component's files
will be unversioned. However, in some cases, these are acceptable compromises in order to
maintain clean code.

# References

https://lerna.js.org/

https://storybook.js.org/

https://git-scm.com/

https://www.npmjs.com/
