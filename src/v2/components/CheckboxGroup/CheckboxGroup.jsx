import React from 'react'
import Checkbox from '../Checkbox/Checkbox'

var classNames = require('classnames');

export class CheckboxGroup extends React.Component {
	render() {
		var fielsetClass = classNames({
			'usa-fieldset-inputs usa-sans': true,
			'usa-checkbox-radio-error': this.props.error
		})
		return(
			<fieldset className={fielsetClass}>
	      <legend>{this.props.legend}</legend>
	      <ul className="usa-unstyled-list">
	        {this.props.option.map((option) =>
		        <li>
		        	<Checkbox
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

export default CheckboxGroup