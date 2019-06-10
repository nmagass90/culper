/**
 * HOC that wraps a form input inside of the FormField layout
 */

import React from 'react'

import FormField from 'components/v2/FormField'
import styles from './FormField.module.scss'

const newGuid = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }

  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`
}

const withFormField = (Component) => {
  class FormFieldInput extends React.Component {
    uuid = newGuid()

    state = {
      showHelp: false,
    }

    toggleHelp = () => {
      const { showHelp } = this.state
      this.setState({
        showHelp: !showHelp,
      })
    }

    render() {
      const { modifiers } = this.props
      const { showHelp } = this.state

      return (
        <FormField
          {...this.props}
          inputId={this.uuid}
          showHelp={showHelp}
          toggleHelp={this.toggleHelp}
        >
          <Component
            {...this.props}
            inputId={this.uuid}
          />
          {modifiers && (
            <div className={styles.modifiers}>{modifiers}</div>
          )}
        </FormField>
      )
    }
  }

  FormFieldInput.defaultProps = {
    modifiers: [],
  }

  return FormFieldInput
}

export default withFormField


/**
 * 
 * <InputFormField
 *    {...props} />
 * 
 * <FormField {...props}>
 *  <Input {...props}>
 * </FormField>
 * 
 */