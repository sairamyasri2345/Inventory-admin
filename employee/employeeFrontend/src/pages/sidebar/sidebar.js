import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const sidebarContent = [
    { icon: "bi-speedometer2", text: "Dashboard" },
    { icon: "bi-table", text: "Orders" },
    { icon: "bi-key", text: "ChangePassword" },
  ];

  const isOnlyIcons = sidebarContent.every((item) => !item.text);

  return (
    <div
    className={`bg-dark min-vh-100 d-flex flex-column justify-content-between px-2 py-1 ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}
    style={{ width: isOpen ? '200px' : '60px' }}
  >
    <div>
      <a className="text-decoration-none text-white d-flex mt-2" href="#">
        <span className="ms-1 fs-4">
          <img
            src="https://atmoslifestyle.com/wp-content/uploads/2023/05/Atmos-Beige-Logo-1-1.png"
            alt="logo"
            className="Atmos-logo mt-2 mb-4"
          />
        </span>
      </a>
      <ul className={`list-unstyled ${isOnlyIcons ? 'd-flex flex-column align-items-center' : 'd-md-flex flex-column justify-content-center gap-4'}`}>
        {sidebarContent.map((item, index) => (
          <li key={index} className="px-3">
            <Link className="nav-link text-white fs-5 my-3 py-3 py-sm-0 d-flex align-items-center" to={`/layout${item.text ? `/${item.text.toLowerCase()}` : ''}`}>
              <i className={`bi ${item.icon}`}></i>
              {isOpen && <span className={`ms-${isOnlyIcons ? '1' : '2'} d-none d-sm-inline Typography_Heading_H6`}>{item.text}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
    <div className={`d-flex justify-content-center mt-auto ${isOpen ? 'mb-3' : 'mt-3'} ${isOpen ? 'd-flex flex-row gap-2 mx-2 my-3' : 'flex-column'}`}>
      {isOpen && (
        <>
          <hr className="text-secondary d-none d-sm-block" />
          <div className="d-flex flex-row gap-5 mx-2 my-3">
            <i className="bi bi-bell text-white"></i>
            <i className="bi bi-person text-white"></i>
            <svg
              width="25"
              className="mt-2"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              x="0px"
              y="0px"
              viewBox="0 0 100 125"
            >
              <g>
                <path d="M26.1,77.7C32.5,84,41,87.5,50,87.5c0,0,0,0,0,0c9,0,17.5-3.5,23.9-9.8c6.4-6.3,9.9-14.7,9.9-23.7c0-8.9-3.5-17.4-9.9-23.7 c-1.6-1.6-4.3-1.6-5.9,0c-1.6,1.6-1.6,4.3,0,5.9c4.8,4.7,7.4,11,7.4,17.7c0,6.7-2.6,13-7.4,17.7c-9.9,9.8-26,9.8-36,0 c-4.8-4.7-7.4-11-7.4-17.7c0-6.7,2.6-13,7.4-17.7c1.6-1.6,1.7-4.3,0-5.9c-1.6-1.6-4.3-1.7-5.9,0c-6.4,6.3-9.9,14.7-9.9,23.7 C16.2,63,19.7,71.4,26.1,77.7z" />
                <path d="M45.8,16.7v35.2c0,2.3,1.9,4.2,4.2,4.2s4.2-1.9,4.2-4.2V16.7c0-2.3-1.9-4.2-4.2-4.2S45.8,14.4,45.8,16.7z" />
              </g>
            </svg>
          </div>
        </>
      )}
    </div>
  </div>
  );
};

export default Sidebar;
