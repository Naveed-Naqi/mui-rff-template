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
