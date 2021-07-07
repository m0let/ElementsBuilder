import React, { useContext } from 'react'
import { FormContext } from '../context/FormContext'

const Select = ({ field: fieldName, options, ...rest }) => {
    const { handleOnChange } = useContext(FormContext)
    return (
        <select name="options" className="form-select" selected onChange={e => handleOnChange(rest.id, e)}>
            <option value={''}>Open this select menu</option>
            {options.length > 0 ? options.map((option, i) =>
                <option value={option.value} key={i}>{option.label}</option>
            ) : null}
        </select>
    )
}
export default Select