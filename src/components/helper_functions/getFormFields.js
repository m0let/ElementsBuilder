export const getFormFields = (formFields = [], i) => {
    return formFields.map((field, j) => {
        return {
            ...field,
            id: `${field.field}_${j}_${i}`
        }
    })
}
