import React from 'react'

export class DateControl extends React.Component {
	constructor(props) {
    super(props)
  }
	render() {
		return(
			<fieldset>
				<legend>Provide your date of birth</legend>
				<div className="dateControl-container">
					<div className="dateControl-month">
						<label htmlFor="month">Month</label>
						<input maxLength='2' type="text"/>
					</div>
					<div className="dateControl-day" style={this.props.dayHide ? {display: 'none'} : {}}>
						<label htmlFor="day">Day</label>
						<input maxLength='2' type="text"/>
					</div>
					<div className="dateControl-year">
						<label htmlFor="year">Year</label>
						<input maxLength='4' type="text"/>
					</div>
				</div>
			</fieldset>
		)
	}
}

export default DateControl