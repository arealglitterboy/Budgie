import React from 'react';

import { NavLink } from 'react-router-dom';

const Header = (props) => (
    <header>
        <h1>Expensify</h1>
        <NavLink to="/" className="main-header__link" exact activeClassName="main-header__link--active">Dashboard</NavLink>
        <NavLink to="/create" className="main-header__link" activeClassName="main-header__link--active">Create</NavLink>
        <NavLink to="/help" className="main-header__link" activeClassName="main-header__link--active">Help</NavLink>
    </header>
);

export default Header;