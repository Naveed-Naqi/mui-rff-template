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
    name: 'rating',
    type: 'rating',
    label: 'Rating'
  },
  { name: 'files', label: 'Upload Image', type: 'file', multiple: false }
]

const fileSizeCheck = (files) => {
  let valid = true
  Array.from(files).map((file) => {
    let size = file.size
    if (size > 10000000) {
      valid = false
    }
  })
  return valid
}

const fileTypeCheck = (files) => {
  let valid = true
  Array.from(files).map((file) => {
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      valid = false
    }
  })

  return valid
}

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
  autocomplete: Yup.string().required('Required'),
  rating: Yup.number().required('Required'),
  files: Yup.mixed()
    .test('file-size', 'File size must be less than 100mb. ', fileSizeCheck)
    .test('file-type', 'File must be of type jpeg or png. ', fileTypeCheck)
})

export const initialValues = {
  username: '',
  password: '',
  email: '',
  files: [],
  date: null,
  time: null,
  autocomplete: [],
  rating: 0,
  files: []
}
