import React from 'react'
import PropTypes from 'prop-types'

import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'

import FormTemplate from './FormTemplate'

export default class PagedFormTemplate extends React.Component {
  constructor(props) {
    super(props)

    const { data } = this.props
    this.state = {
      currPage: 0,
      values: {},
      size: data ? data.length - 1 : 0
    }
  }

  next = (values) => {
    console.log(values)

    this.setState((state) => ({
      currPage: Math.min(state.currPage + 1, state.size),
      values: { ...state.values, ...values }
    }))
  }

  previous = () =>
    this.setState((state) => ({
      currPage: Math.max(state.currPage - 1, 0)
    }))

  submitHelper = (values) => {
    const { handleSubmit } = this.props
    const { currPage, size } = this.state
    const isLastPage = currPage === size
    if (isLastPage) {
      return handleSubmit({ ...this.state.values, ...values })
    } else {
      this.next(values)
    }
  }

  isSubset = (values, initialValues) => {
    if (!initialValues) {
      return false
    }

    const keys = Object.keys(initialValues)

    for (const key of keys) {
      if (!values[key]) {
        return false
      }
    }

    return true
  }

  getStepContent = (index) => {
    const { data, validationSchema, initialValues } = this.props
    const { size, values } = this.state

    const hasValues = this.isSubset(values, initialValues[index])

    return (
      <FormTemplate
        data={data[index]}
        validationSchema={validationSchema[index]}
        initialValues={hasValues ? values : initialValues[index]}
        handleSubmit={this.submitHelper}
        submitButtonLabel={index === size ? 'Finish' : 'Next >>'}
        handleCancel={this.previous}
        cancelButtonLabel={'<< Back'}
        cancelDisabled={index === 0}
      />
    )
  }

  render() {
    const { labels } = this.props
    const { currPage, size } = this.state
    const actualLabels = labels || new Array(size + 1).fill('')

    return (
      <div>
        <Stepper activeStep={currPage} alternativeLabel>
          {actualLabels.map((label, index) => {
            return (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>

        {this.getStepContent(currPage)}
      </div>
    )
  }
}

PagedFormTemplate.propTypes = {
  data: PropTypes.array.isRequired,
  validationSchema: PropTypes.any.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.any.isRequired,
  labels: PropTypes.array
}
