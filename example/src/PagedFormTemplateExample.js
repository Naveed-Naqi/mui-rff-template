import React, { Component } from 'react'
import { Grid, Paper } from '@material-ui/core'
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

  render() {
    return (
      <Grid container justifyContent='center'>
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
