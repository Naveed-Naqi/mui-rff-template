import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'

import { Form } from 'react-final-form'
import {
  TextField,
  Checkboxes,
  Radios,
  Select,
  DatePicker,
  TimePicker,
  Autocomplete,
  makeValidate
} from 'mui-rff'
import { Grid, Button, MenuItem, LinearProgress } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'

import PagedFormTemplate from './PagedFormTemplate'

const useStyles = makeStyles((theme) => ({
  centerItem: {
    height: '100px',
    textAlign: 'center'
  }
}))

export default function FormTemplate({
  data,
  handleSubmit,
  validationSchema,
  initialValues,
  handleCancel,
  cancel,
  submitButtonLabel,
  cancelButtonLabel,
  cancelDisabled
}) {
  const classes = useStyles()

  const getMultiColFormComponent = (formComponentData) => {
    const length = formComponentData.length

    return formComponentData.map((elem, index) => {
      return (
        <Grid
          item
          xs={12}
          sm={12 / length}
          className={classes.centerItem}
          key={index}
        >
          {getFormComponentHelper(elem)}
        </Grid>
      )
    })
  }

  const getFormComponentHelper = (formComponentData) => {
    const {
      label,
      name,
      type,
      options,
      optionLabelKey,
      optionValueKey,
      style
    } = formComponentData

    const valueKey = optionValueKey || optionLabelKey

    switch (type) {
      case 'text':
      case 'password':
        return (
          <TextField
            label={label}
            name={name}
            variant='outlined'
            type={type}
            style={style}
          />
        )
      case 'select':
        return (
          <Select name={name} label={label} variant='outlined' style={style}>
            {options.map((option, index) => {
              return (
                <MenuItem
                  value={option[valueKey]}
                  key={`${option[optionLabelKey]}-${index}`}
                >
                  {option[optionLabelKey]}
                </MenuItem>
              )
            })}
          </Select>
        )
      case 'time':
        return (
          <TimePicker
            name={name}
            label={label}
            dateFunsUtils={DateFnsUtils}
            inputVariant='outlined'
          />
        )
      case 'date':
        return (
          <DatePicker
            name={name}
            label={label}
            dateFunsUtils={DateFnsUtils}
            inputVariant='outlined'
          />
        )
      case 'autocomplete':
        return (
          <Autocomplete
            name={name}
            options={options}
            variant='outlined'
            getOptionValue={(option) => option[valueKey]}
            getOptionLabel={(option) => option[optionLabelKey]}
            textFieldProps={{ variant: 'outlined', label: label }}
            multiple={
              formComponentData.multiple ? formComponentData.multiple : false
            }
          />
        )
      case 'checkbox':
        return (
          <Checkboxes
            name={name}
            formGroupProps={{ row: true }}
            data={options}
          />
        )
      case 'radio':
        return (
          <Radios
            label={label}
            name={name}
            radioGroupProps={{ row: true }}
            data={options}
          />
        )
      default:
        return null
    }
  }

  const getFormComponent = (formComponentData) => {
    return Array.isArray(formComponentData) ? (
      <Grid
        item
        container
        direction='row'
        justify='space-between'
        alignItems='center'
        spacing={2}
      >
        {getMultiColFormComponent(formComponentData)}
      </Grid>
    ) : (
      <Grid item xs={12} className={classes.centerItem}>
        {getFormComponentHelper(formComponentData)}
      </Grid>
    )
  }

  const sleep = () => new Promise((resolve) => setTimeout(resolve, 100))

  return (
    <Form
      onSubmit={async (data) => {
        await sleep()
        handleSubmit(data)
      }}
      initialValues={initialValues}
      validate={makeValidate(validationSchema)}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Grid container direction='row' justify='center' alignItems='center'>
            {data.map((formComponentData, index) => {
              const { name } = formComponentData

              return (
                <Fragment key={`${name} ${index}`}>
                  {getFormComponent(formComponentData)}
                </Fragment>
              )
            })}

            <Grid
              item
              container
              direction='row'
              justify='center'
              alignItems='center'
              spacing={2}
            >
              <Fragment>
                {cancel && (
                  <Grid item>
                    <Button
                      variant='contained'
                      color='secondary'
                      onClick={handleCancel || form.reset}
                      disabled={submitting || cancelDisabled}
                    >
                      {cancelButtonLabel || 'Cancel'}
                    </Button>
                  </Grid>
                )}

                <Grid item>
                  {submitting && <LinearProgress />}
                  <Button
                    disabled={submitting}
                    type='submit'
                    color='primary'
                    variant='contained'
                  >
                    {submitButtonLabel || 'Submit'}
                  </Button>
                </Grid>
              </Fragment>
            </Grid>
          </Grid>
        </form>
      )}
    />
  )
}

FormTemplate.propTypes = {
  data: PropTypes.array.isRequired,
  validationSchema: PropTypes.any.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.any.isRequired,
  handleCancel: PropTypes.func
}

FormTemplate.defaultProps = {
  cancel: true
}

export const PagedFormTemplate
