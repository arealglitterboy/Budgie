import React from 'react';

import { NavLink } from 'react-router-dom';

const Header = (props) => (
    <header className="page-header--outer">
        <div className="page-header">
            <h2 className="page-header__title"><NavLink className="page-header__title--link" to="/" exact>Budgie</NavLink></h2>
            <nav className="page-header__nav">
                <NavLink to="/" className="page-header__nav__link" exact activeClassName="page-header__nav__link--active">Dashboard</NavLink>
                <NavLink to="/create" className="page-header__nav__link" activeClassName="page-header__nav__link--active">Create</NavLink>
                <NavLink to="/modal" className="page-header__nav__link" activeClassName="page-header__nav__link--active">Modal</NavLink>
                <NavLink to="/contacts" className="page-header__nav__link" activeClassName="page-header__nav__link--active">Contacts</NavLink>
                <NavLink to="/help" className="page-header__nav__link" activeClassName="page-header__nav__link--active">Help</NavLink>
            </nav>
        </div>
    </header>
);

export default Header;