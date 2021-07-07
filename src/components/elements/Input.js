import React, { useContext } from 'react'
import { FormContext } from '../context/FormContext'
import { isNumber } from 'util';
const Input = ({ field: fieldName, value = "", type = "text", readOnly, textSelectable, cursor, ...rest }) => {
    const { handleOnChange } = useContext(FormContext)
    return (
        <div className="mb-3">
            <label className="form-label">
                {fieldName}
            </label>
            <input
                type={type}
                value={value}
                onChange={e => handleOnChange(rest.id, e)}
                readOnly={readOnly}
                className="form-control"
                placeholder={isNumber(value) ? parseFloat(value) : ''}
            />
            <div className="form-text">Some text below inputs</div>
        </div>
    )
}
export default Input