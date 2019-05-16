import React from 'react'

export class Checkbox extends React.Component {
	constructor(props) {
    super(props)
  }
	render() {
		return(
			<div>
				<input 
					id={this.props.id} 
					type="checkbox"
					name={this.props.name}
					disabled={this.props.disabled}
				/>
	      <label htmlFor={this.props.id}><span>{this.props.label}</span></label>
			</div>
		)
	}
}

export default Checkbox	          