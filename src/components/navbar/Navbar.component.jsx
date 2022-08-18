import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { userSignOut } from '../../utils/firebase/firebase.config';

import './Navbar.styles.scss';
import { ReactComponent as CrwnLogo } from '../../assets/Logo-crown.svg';
import { UserContext } from '../../contexts/User.context';

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    currentUser && setIsAuth(true);
  }, [currentUser]);

  const handleOnSignOut = async (e) => {
    e.preventDefault();
    try {
      await userSignOut();
      console.log('user sign out');

      setIsAuth(false);
      setTimeout(() => {
        navigate('/');
      }, 250);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Fragment>
      <nav className="nav__container">
        <Link to="/" className="nav__logo">
          <CrwnLogo className="nav__logo-img" />
        </Link>
        <div className="nav__menu">
          <Link to="/shop" className="nav__link">
            shop
          </Link>
          {!isAuth ? (
            <Link to="/sign-in" className="nav__link">
              login
            </Link>
          ) : (
            <button className="btn btn__logout" onClick={handleOnSignOut}>
              logout
            </button>
          )}
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
};

export default Navbar;
