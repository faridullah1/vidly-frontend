import React from 'react';

const Select = ({ name, label, options, error, ...rest }) => {
	return (
		<div className="mb-3">
			<label htmlFor={name}>{ label }</label>

			<select {...rest} id={name} name={name} className="form-control">
				<option value="" />
				{ options.map(opt => <option key={opt._id} value={opt._id}>{opt.name}</option>)}
			</select>
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	);
}
 
export default Select;