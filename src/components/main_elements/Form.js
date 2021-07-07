import React, { useState, useContext } from 'react'
import ElementBuilder from '../ElementBuilder'
import { FormContext, FormContextData } from '../context/FormContext'

const Form = (props) => {
    const [, setElements] = useState([])
    const { formFields, updateTableData, baseUrl } = useContext(FormContextData)

    const handleSubmit = (e) => {
        e.preventDefault();
        /* Here we can do whatever we want with the submitted values */
        let formObjectValues = {}
        formFields.forEach((element) => {
            if (element.field) {
                formObjectValues[element.field] = element.value
                element.value = ''
            }
        })
        /* Just for demo add the new obj to the table */
        updateTableData(formObjectValues)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ formObjectValues })
        };
        fetch(baseUrl, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json')
                const data = isJson && await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                /* do something with data */
            })
            .catch(error => {
                console.error('Fetch error in Form component', error);
            });
    }
    const handleOnChange = (id, event) => {
        const newElements = [...formFields]
        newElements.forEach((field) => {
            const { id: fieldId } = field
            if (id === fieldId) {
                switch (field.type) {
                    case 'checkbox':
                        field.value = event.target.checked
                        break;
                    default:
                        field.value = event.target.value
                        break;
                }
            }
        })
        setElements(newElements)
    }

    return (
        <FormContext.Provider value={{ handleOnChange }}>
            <form>
                {formFields?.map((element, i) => <ElementBuilder key={i} field={element} />)}
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" onClick={handleSubmit} className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                </div>
            </form>
        </FormContext.Provider>
    )
}

export default Form