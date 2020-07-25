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
