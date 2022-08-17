import React, { Fragment } from 'react';
import { Link, Outlet } from 'react-router-dom';

import './Navbar.styles.scss';
import { ReactComponent as CrwnLogo } from '../../assets/Logo-crown.svg';

const Navbar = () => {
  return (
    <Fragment>
      <nav className="nav__container">
        <Link to="/" className="nav__logo">
          <CrwnLogo className="nav__logo-img" />
        </Link>
        <div className="nav__menu">
          <Link to="/sign-in" className="nav__link">
            login
          </Link>
          <Link to="/shop" className="nav__link">
            shop
          </Link>
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
};

export default Navbar;
