import React, { useState, useEffect } from "react";
import "./navbar.css";

const EmpNavbar = ({ userData, toggleSidebar, isSidebarOpen, onFilterChange }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [userInitials, setUserInitials] = useState("");
  const [filterText, setFilterText] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false); 

  const handleLogout = () => {
    // window.localStorage.clear();
    window.location.href = "/";
    
  };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  }

  useEffect(() => {
    const date = new Date();
    const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    setCurrentDate(formattedDate);
    if (userData && userData.uname) {
      const name = userData.uname.trim();
      const nameParts = name.split(" ");

      let initials = "";

      if (nameParts.length > 1) {
        initials = `${nameParts[0][0]}${nameParts[1][0]}`;
      } else {
        const singleWord = nameParts[0];
        initials = `${singleWord[0]}${singleWord[singleWord.length - 1]}`;
      }

      setUserInitials(initials.toUpperCase());
    }
  }, [userData]);

  const handleSearchInputChange = (e) => {
    const searchText = e.target.value;
    setFilterText(searchText);
    onFilterChange(searchText); 
  };

  return (
    <nav className="navbar navbar-expand-md bg-dark text-white w-100 px-2">
      <div className="d-flex justify-content-between align-items-center w-100">
        <div className="d-flex align-items-center">
          <i className={`bi ${isSidebarOpen ? "bi-list" : "bi-x"} list`} onClick={toggleSidebar}></i>
          <form className="d-flex ms-3" onSubmit={e => e.preventDefault()}>
            <div className="input-group">
              <input
                className="form-control"
                type="search"
                placeholder="Search here..."
                aria-label="Search"
                value={filterText}
                onChange={handleSearchInputChange}
              />
              <button
                className="btn btn-outline-secondary search-btn d-flex justify-content-center align-items-center"
                type="submit"
              >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>
        </div>
        <div className="d-flex align-items-center icons">
          <div className="d-flex align-items-center text-white">
            <i className="bi bi-calendar"></i>
            <span className="px-2">{currentDate}</span>
          </div>
          <div className="dropdown ms-3">
            <div className="d-flex align-items-center dropdown-toggle" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
              <div className="user-profile mx-2">
                <p className="profile-initials mx-1">{userInitials}</p>
              </div>
              <span className="me-2">{userData?.uname || "Adison Jack"}</span>
            </div>
            {dropdownOpen && (
              <ul className="dropdown-menu dropdown-menu-end show">
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default EmpNavbar;
