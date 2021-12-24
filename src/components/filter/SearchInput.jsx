import React from 'react'

import { Input } from '../Input'

const SearchInput = (props) => (
    <Input
        className="search"
        label="Search"
        id="search-term"
        type="search"
        value={props.search}
        onChange={props.setSearch}
    />
);

export default SearchInput;