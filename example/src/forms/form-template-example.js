import * as Yup from 'yup'

export const data = [
  [
    {
      name: 'username',
      label: 'Username',
      type: 'text'
    },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'date', label: 'Date', type: 'date' }
  ],

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
  autocomplete: []
}
