import React, { useContext } from 'react'
import { FormContext } from '../context/FormContext'

const Checkbox = ({ field: fieldName, value: isChecked = false, ...rest }) => {
    const { handleOnChange } = useContext(FormContext)
    return (
        <div className="mb-3 form-check">
            <input
                type="checkbox"
                className="form-check-input"
                checked={isChecked}
                onChange={e => handleOnChange(rest.id, e)}
            />
            <label className="form-check-label">
                {fieldName}
            </label>
        </div>
    )
}
export default Checkbox