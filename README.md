# mui-rff-template

> An easy template/generator that allows users to quicky create a responsive form with mui and rff. Uses Yup for validation

[![NPM](https://img.shields.io/npm/v/mui-rff-template.svg)](https://www.npmjs.com/package/mui-rff-template) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save mui-rff-template
```

## Demo

https://codesandbox.io/s/strange-almeida-gogs9

# Docs

This utility allows any user to quickly bootstrap a responsive with minimal overhead.
The validationSchema is written through Yup. The Frontend framework is MaterialUI.

# Form Template

## data (Array) [Required]

An array of objects that represent fields in your form. Each object has subfields:

### name (String) [Required]

Name assigned to the field in your form. This name must match the corresponding keys in defaultValues and validation schema

### type (String) [Required]

The type of your form field. Currently only supports 'text' or 'select'

### label (String) [Required]

The label for the field

### options (Array) [Required: type === 'autocomplete' || 'select' || 'radio' || 'checkbox']

Required if your type is 'select' or 'autocomplete'. This is an array of of objects, where each object is an option in your dropdown. The object must contain EXACTLY 'label' and 'value' keys if the type is checkbox or radio. If the type is autocomplete or select, the keys can be overwritten with the props below. If you do not provide a 'value' key the label key will also be treated as the value.

### optionLabelKey (String) [Required]

Will overwrite the 'label' key for objects in the options array.

```js
#Default

{
...
options: [{ label: 'SomeName', value: 'SomeValue'}]
}

#Using optionLabelKey

{
...
optionLabelKey: 'realName'
options: [{ realName: 'SomeName', value: 'SomeValue'}]
}

```

### optionValueKey (String) [Optional]

Will overwrite the 'value' key for objects in the options array.

```js
#Default

{
...
options: [{ label: 'SomeName', value: 'SomeValue'}]
}

#Using optionValueKey

{
...
optionValueKey: 'realValue'
options: [{ label: 'SomeName', realValue: 'SomeValue'}]
}

```

### multiple (String) [Optional: type === 'autocomplete']

Will allow a multiselect option for autocomplete fields. This requires that the initial autoc0omplete value passed in is an array.
import \* as Yup from 'yup'

const data1 = [
///
[
{
name: 'username',
label: 'Username',
type: 'text'
},
{ name: 'password', label: 'Password', type: 'password' },
{ name: 'date', label: 'Date', type: 'date' }
]
///
]

const data2 = [
///
{ name: 'time', label: 'Time', type: 'time' },
{
name: 'email',
label: 'Email',
type: 'select',
options: [
{
realName: 'skanadian3@gmail.com'
}
],
optionLabelKey: 'realName'
}

///
]

const data3 = [
///
{
name: 'autocomplete',
label: 'Autocomplete',
type: 'autocomplete',
options: [
{ title: 'Movie' },
{ title: 'TV Show' },
{ title: 'Videogame' },
{ title: 'Good TV Show' },
{ title: 'Bad Movie' }
],
optionLabelKey: 'title',
multiple: true
},

{
name: 'checkbox',
type: 'checkbox',
options: [{ label: 'Remember Me?', value: true }]
},
{
name: 'Radio',
type: 'radio',
options: [
{ label: 'Mustard', value: 'Mustard' },
{ label: 'Ketchup', value: 'Ketchup' },
{ label: 'Relish', value: 'Relish' }
]
}
]

export const data = [data1, data2, data3]

const schema1 = Yup.object().shape({
username: Yup.string()
.min(2, 'Too Short! ')
.max(50, 'Too Long! ')
.required('Required'),
password: Yup.string()
.min(2, 'Too Short! ')
.max(50, 'Too Long! ')
.required('Required'),

date: Yup.date().required('Required').nullable()
})

const schema2 = Yup.object().shape({
email: Yup.string().email('Invalid email').required('Required'),
time: Yup.date().required('Required').nullable()
})

const schema3 = Yup.object().shape({
autocomplete: Yup.string().required('Required')
})

export const validationSchema = [schema1, schema2, schema3]

export const initialValues = [
{ username: 'Naveed', password: '', date: null },

{ email: '', time: null },

{ autocomplete: [] }
]

## validationSchema (Object) [Required]

A Yup object that has the same keys as defaultValues and the same names as the objects in the data prop

```js
validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required')
})
```

## cancel [Optional]

Determines whether or not there will be a cancel button. Defaults to true.

## handleSubmit [Required]

A function that is to be executed upon submission of the form.

## handleCancel [Optional]

A function that is to be executed upon canceling the form. If this prop is not provided, it will just reset the form.

## submitButtonLabel [Optional]

The label of the submit button. Defaults to "Submit"

## cancelButtonLabel [Optional]

The label of the cancel button. Defaults to "Cancel"

## cancelDisabled [Optional]

Some boolean condition in which the cancel button should be disabled

## initialValues [Required]

An object of defaultValues to be assigned to the form. This is a REQUIRED prop.
The keys should match up with those in the validationSchema and the names of the objects in the data prop.

```js
{ firstName: "", lastName: "", email: "" }
```

# Basic Example

```js
import * as Yup from 'yup'

export const data = [
  {
    name: 'username',
    label: 'Username',
    type: 'text'
  },
  { name: 'password', label: 'Password', type: 'password' },
  { name: 'date', label: 'Date', type: 'date' },
  { name: 'time', label: 'Time', type: 'time' },
  {
    name: 'email',
    label: 'Email',
    type: 'select',
    options: [
      {
        realName: 'skanadian3@gmail.com'
      }
    ],
    optionLabelKey: 'realName'
  },
  {
    name: 'autocomplete',
    label: 'Autocomplete',
    type: 'autocomplete',
    options: [
      { title: 'Movie' },
      { title: 'TV Show' },
      { title: 'Videogame' },
      { title: 'Good TV Show' },
      { title: 'Bad Movie' }
    ],
    optionLabelKey: 'title'
  },

  {
    name: 'checkbox',
    type: 'checkbox',
    options: [{ label: 'Remember Me?', value: true }]
  },
  {
    name: 'Radio',
    type: 'radio',
    options: [
      { label: 'Mustard', value: 'Mustard' },
      { label: 'Ketchup', value: 'Ketchup' },
      { label: 'Relish', value: 'Relish' }
    ]
  }
]

export const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short! ')
    .max(50, 'Too Long! ')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short! ')
    .max(50, 'Too Long! ')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  date: Yup.date().required('Required').nullable(),
  time: Yup.date().required('Required').nullable(),
  autocomplete: Yup.string().required('Required')
})

export const initialValues = {
  username: '',
  password: '',
  email: '',
  date: null,
  time: null,
  autocomplete: ''
}
```

```js
import React, { Component } from 'react'
import FormTemplate from './FormTemplate'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import {
  data,
  validationSchema,
  initialValues
} from './forms/form-template-example'

class FormTemplateExample extends Component {
  handleSubmit = (data) => {
    console.log(data)
  }

  render() {
    return (
      <Grid container justify='center'>
        <Paper style={{ padding: 16, width: '50%' }}>
          <FormTemplate
            data={data}
            handleSubmit={this.handleSubmit}
            validationSchema={validationSchema}
            initialValues={initialValues}
          ></FormTemplate>
        </Paper>
      </Grid>
    )
  }
}

export default FormTemplateExample
```

# PagedFormTemplate

## data (Array) [Required]

An array of arrays. Each element of the array is the same as the data prop for an individual Form Template, and it represents one page of the form.

## validationSchema (Array) [Required]

An array of validation schemas. Each element of the array is the same as the validationSchema prop for an individual Form Template, it validates one page of the form.

## handleSubmit (Func) [Required]

A function that is to be executed upon submission of the form.

## initialValues (Array) [Required]

An array of initial values. Each element of the array is the same as the initialValues prop for an individual Form Template, and represents one page of the form

## labels (Array) [Optional]

An array of strings, where each elemen is a label of each page.

# PagedFormTemplate Example

```js
import * as Yup from 'yup'

const data1 = [
  ///
  [
    {
      name: 'username',
      label: 'Username',
      type: 'text'
    },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'date', label: 'Date', type: 'date' }
  ]
  ///
]

const data2 = [
  ///
  { name: 'time', label: 'Time', type: 'time' },
  {
    name: 'email',
    label: 'Email',
    type: 'select',
    options: [
      {
        realName: 'skanadian3@gmail.com'
      }
    ],
    optionLabelKey: 'realName'
  }

  ///
]

const data3 = [
  ///
  {
    name: 'autocomplete',
    label: 'Autocomplete',
    type: 'autocomplete',
    options: [
      { title: 'Movie' },
      { title: 'TV Show' },
      { title: 'Videogame' },
      { title: 'Good TV Show' },
      { title: 'Bad Movie' }
    ],
    optionLabelKey: 'title',
    multiple: true
  },

  {
    name: 'checkbox',
    type: 'checkbox',
    options: [{ label: 'Remember Me?', value: true }]
  },
  {
    name: 'Radio',
    type: 'radio',
    options: [
      { label: 'Mustard', value: 'Mustard' },
      { label: 'Ketchup', value: 'Ketchup' },
      { label: 'Relish', value: 'Relish' }
    ]
  }
]

export const data = [data1, data2, data3]

const schema1 = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short! ')
    .max(50, 'Too Long! ')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short! ')
    .max(50, 'Too Long! ')
    .required('Required'),

  date: Yup.date().required('Required').nullable()
})

const schema2 = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  time: Yup.date().required('Required').nullable()
})

const schema3 = Yup.object().shape({
  autocomplete: Yup.string().required('Required')
})

export const validationSchema = [schema1, schema2, schema3]

export const initialValues = [
  { username: 'Naveed', password: '', date: null },

  { email: '', time: null },

  { autocomplete: [] }
]
```

## License

MIT © [Naveed-Naqi](https://github.com/Naveed-Naqi)
