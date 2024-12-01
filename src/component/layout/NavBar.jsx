import React from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../../utils/UserService.jx";
import { FaHome, FaUser } from "react-icons/fa";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { isAdmin } from "../../utils/UserService.jx";

const Navbar = () => {
    function handleLogout() {
        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            logout();
        }
    }

    // Kiểm tra nếu người dùng đã đăng nhập
    const isLoggedIn = !!localStorage.getItem('token') && !!localStorage.getItem('role');

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow sticky-top">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to={"/"}>
                    <FaHome /> Online Quiz App
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        {isAdmin() && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/admin/user-management">
                                    User Management
                                </NavLink>
                            </li>
                        )}
                        {isAdmin() && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to={"/admin"}>
                                    Admin
                                </NavLink>
                            </li>
                        )}
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/quiz-stepper"}>
                                Take Quiz
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/admin"}>
                                admin
                            </NavLink>
                        </li>

                    </ul>
                </div>
            </div>
            <DropdownButton id="dropdown-basic-button" title={<span><FaUser /> Tài khoản</span>}>
                {/* Hiển thị nút Register và Login nếu chưa đăng nhập */}
                {!isLoggedIn && (
                    <>
                        <Dropdown.Item as="li">
                            <NavLink className="nav-link" to="/register">
                                Register
                            </NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item as="li">
                            <NavLink className="nav-link" to="/login">
                                Login
                            </NavLink>
                        </Dropdown.Item>
                    </>
                )}
                {/* Hiển thị Profile và Logout nếu đã đăng nhập */}
                {isLoggedIn && (
                    <>
                        <Dropdown.Item as="li">
                            <NavLink className="nav-link" to="/profile">
                                Profile
                            </NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item as="li">
                            <NavLink onClick={handleLogout} className="nav-link" to="/">
                                Logout
                            </NavLink>
                        </Dropdown.Item>
                    </>
                )}
            </DropdownButton>
        </nav>
    );
};

export default Navbar;
