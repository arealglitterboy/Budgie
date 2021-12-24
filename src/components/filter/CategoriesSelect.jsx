import React from 'react'

import { categoryOptions } from './options';

import InputMultiSelect from '../InputMultiSelect';

const CategoriesSelect = (props) => (
    <InputMultiSelect
        label="Categories"
        id="categories"
        className="categories-select"
        onChange={props.setCategories}
        value={props.categories.map((val) => categories.find((({value}) => value === val)))}
        options={categoryOptions}
    />
)
export default CategoriesSelect
