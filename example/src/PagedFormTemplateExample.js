import React, { Component } from 'react'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import { PagedFormTemplate } from 'mui-rff-template'

import {
  data,
  validationSchema,
  initialValues
} from './forms/paged-form-template-example'

class PagedFormTemplateExample extends Component {
  handleSubmit = (data) => {
    console.log(data)
  }

  onSubmit = (data) => {
    console.log(data)
  }

  render() {
    return (
      <Grid container justify='center'>
        <Paper style={{ padding: 16, width: '50%' }}>
          <PagedFormTemplate
            handleSubmit={this.handleSubmit}
            data={data}
            validationSchema={validationSchema}
            initialValues={initialValues}
          />
        </Paper>
      </Grid>
    )
  }
}

export default PagedFormTemplateExample
