import React from 'react'

export class Radio extends React.Component {
	constructor(props) {
    super(props)
  }
	render() {
		return(
			<div styleName='v2-radio'>
				<input 
					id={this.props.id} 
					type="radio"
					name={this.props.name}
					disabled={this.props.disabled}
				/>
	      <label htmlFor={this.props.id}><span>{this.props.label}</span></label>
			</div>
		)
	}
}

export default Radio	          