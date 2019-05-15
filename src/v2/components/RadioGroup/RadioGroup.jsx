import React from 'react'
var classNames = require('classnames');

export class RadioGroup extends React.Component {
	render() {
		var fielsetClass = classNames({
			'usa-fieldset-inputs usa-sans': true,
			'usa-checkbox-radio-error': this.props.error
		})
		return(
			<fieldset className={fielsetClass}>
	      <legend>{this.props.legend}</legend>
	      <ul className="usa-unstyled-list">
	        <li>
	        	{this.props.children}
	        </li>
	      </ul>
	    </fieldset>
		)
	}
}

export default RadioGroup