// NB: for some reason, StoryBook can't find this if it's imported as a package,
// so some shared components import this directly -- as a result, any project that
// uses those shared components must provide the same mixin locally
export { default as DateMixin } from './date-mixin'
