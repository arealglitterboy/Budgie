import React from 'react';

import { NavLink } from 'react-router-dom';

const Header = (props) => (
    <header className="page-header">
        <h1 className="page-header__title">Budgie</h1>
        <nav className="page-header__nav">
            <NavLink to="/" className="page-header__nav__link" exact activeClassName="page-header__nav__link--active">Dashboard</NavLink>
            <NavLink to="/create" className="page-header__nav__link" activeClassName="page-header__nav__link--active">Create</NavLink>
            <NavLink to="/help" className="page-header__nav__link" activeClassName="page-header__nav__link--active">Help</NavLink>
        </nav>
    </header>
);

export default Header;