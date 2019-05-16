import React from 'react'
import Radio from '../Radio/Radio'

var classNames = require('classnames');

export class RadioGroup extends React.Component {
	render() {
		var fielsetClass = classNames({
			'usa-fieldset-inputs usa-sans': true,
			'usa-checkbox-radio-error': this.props.error
		})

		var radioLayout = classNames({
			'usa-unstyled-list': true,
			'usa-list-inline usa-list-inline-justified': this.props.branch
		})
		return(
			<fieldset className={fielsetClass}>
	      <legend>{this.props.legend}</legend>
	      <ul className={radioLayout}>
	        {this.props.option.map((option) =>
		        <li>
		        	<Radio
		        		id={option.id} 
								name={option.name}
								disabled={option.disabled}
								label={option.label}
		        	/>
		        </li>
      		)}
	      </ul>
	    </fieldset>
		)
	}
}

export default RadioGroup