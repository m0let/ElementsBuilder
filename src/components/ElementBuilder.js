import React from 'react'
import Input from './elements/Input'
import Checkbox from './elements/Checkbox'
import Select from './elements/Select'

const ElementBuilder = ({ field }) => {
    switch (field.type) {
        case 'input':
        case 'number': return <Input {...field} />
        case 'options': return <Select {...field} />
        case 'checkbox': return <Checkbox {...field} />
        default:
            return null //<div>Wrong component type : {field.type}. <br /> Please provide correct type!</div>
    }
}
export default ElementBuilder