import FormTemplate from './FormTemplate'
import PagedFormTemplate from './PagedFormTemplate'

// export Foo and Bar as named exports
export { FormTemplate, PagedFormTemplate }

// alternative, more concise syntax for named exports
// export { default as Foo } from './Foo'

// you can optionally also set a default export for your module
export default { FormTemplate, PagedFormTemplate }
