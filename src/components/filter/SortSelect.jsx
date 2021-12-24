import React from 'react'

import InputSelect from '../InputSelect'

const SortSelect = (props) => (
    <InputSelect
        label="Sort"
        id="sort"
        className="sort-select"
        onChange={props.setSortBy}
        value={props.options.find(({value}) => value === props.sortBy)}
        isSearchable={false}
        isClearable={false}
        options={props.options}
    />
)

export default SortSelect