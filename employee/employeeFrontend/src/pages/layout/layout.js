import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../sidebar/sidebar";
import Dashboard from "../empDashboard/empDashboard";
import Order from "../orderList/orderList";
import EmpNavbar from "../navbar/navbar";
import "./layout.css";
import ChangePassword from "../changePassword/changePassword";

const Layout = () => {
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userData, setUserData] = useState(null);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = window.localStorage.getItem("token");
        const employeeId=window.localStorage.getItem("employeeId")
        const response = await fetch("http://localhost:3003/layout", { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ token , employeeId}),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        console.log("User data fetched:", data);
        setUserData(data.data); 
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleFilterChange = (text) => {
    setFilterText(text); 
  }

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const handleViewProduct = (productId) => {
    console.log("Viewing product:", productId);
  };

  return (
    <div className="container-fluid p-0 d-flex">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="w-100">
        <EmpNavbar
          toggleSidebar={toggleSidebar}
          userData={userData}
          isSidebarOpen={isSidebarOpen}
          onFilterChange={handleFilterChange} 
        />
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/layout/dashboard" />} />
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  products={products}
                  onDelete={handleDeleteProduct}
                  onEdit={handleEditProduct}
                  onView={handleViewProduct}
                  filterText={filterText}
                  
                />
              }
            />
          <Route
              path="/orders"
              element={<Order filterText={filterText} />}
            />
            <Route path="/changepassword" element={<ChangePassword  filterText={filterText}/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Layout;
