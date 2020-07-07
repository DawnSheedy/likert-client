import React from 'react';
import { Navbar, NavbarBrand } from 'react-bootstrap';

const SiteHeader = (userState) => {
    return (
        <Navbar bg="light">
            <NavbarBrand href="">
                {userState.active ? "Hello, " + userState.firstName : "Welcome!"}
            </NavbarBrand>
        </Navbar>
    )
}

function Header (props) {
    const { userState } = props;

    return (
        <SiteHeader userState={userState} />
    )
};

Header.defaultProps = {};

export default Header;