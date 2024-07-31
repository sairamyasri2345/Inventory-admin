import React from "react";
import "./Dashboard.css";

const Dashboard = ({ products }) => {
  return (
    <div>
      <div className="container-fluid mt-4">
        <div className="">
          <h2 className="p-3 Typography_Heading_H2">Inventory Status</h2>
          <div className="row">
            <div className="col-md-3 col-sm-6 col-6 mx-3 card bg-info">
              <div className="d-flex p-4 gap-3 text-white">
                <i className="bi bi-cart4"></i>
                <div>
                  <h4 className="Typography_Heading_H4">Total Products</h4>
                  <h4 className="Typography_Heading_H4">{products.length}</h4>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-6 card bg-danger mx-3">
              <div className="d-flex p-4 gap-3 text-white">
                <div>
                  <i className="bi bi-cart-x"></i>
                </div>
                <div>
                  <h4 className="Typography_Heading_H4">Out Of Stock</h4>
                  <h4 className="Typography_Heading_H4">{products.length}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
