import React, { Component } from 'react'
import { FormTemplate } from 'mui-rff-template'
import { Paper, Grid } from '@material-ui/core'
import {
  data,
  validationSchema,
  initialValues
} from './forms/form-template-example'
import PagedFormTemplateExample from './PagedFormTemplateExample'

class FormTemplateExample extends Component {
  handleSubmit = async (data) => {
    console.log(data)
  }

  render() {
    return (
      <div>
        <h1>Form Template Example</h1>
        <Grid container justifyContent='center'>
          <Paper style={{ padding: 16, width: '50%' }}>
            <FormTemplate
              data={data}
              handleSubmit={this.handleSubmit}
              validationSchema={validationSchema}
              initialValues={initialValues}
            />
          </Paper>
        </Grid>

        <h1>Paged Form Template Example</h1>
        <PagedFormTemplateExample />
      </div>
    )
  }
}

export default FormTemplateExample
