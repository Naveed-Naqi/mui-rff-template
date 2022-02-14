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
        <Grid container justifyContent='center'>
          <Paper style={{ padding: 16, width: '50%' }}>
            <FormTemplate
              pages={true}
              data={data}
              handleSubmit={this.handleSubmit}
              validationSchema={validationSchema}
              initialValues={initialValues}
            />
          </Paper>
        </Grid>

        <PagedFormTemplateExample />
      </div>
    )
  }
}

export default FormTemplateExample
