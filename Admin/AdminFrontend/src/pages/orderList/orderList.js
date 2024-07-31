import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./orderList.css";
import axios from "axios";

const Order = ({ filterText, onFilterChange }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusOptions] = useState(["Pending", "Approved", "Not Available"]);
  const rowsPerPage = 8;

  // Define fetchProducts function
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3003/appliedProducts");
      if (response.status === 200) {
        console.log("Fetched products:", response.data);
        setProducts(response.data);
      } else {
        console.error("Error fetching products:", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleStatusChange = async (productId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:3003/appliedProducts/${productId}`, { status: newStatus });
      if (response.status === 200) {
        console.log('Status updated successfully:', response.data);
        // Optionally, refetch products or update the state to reflect changes
        fetchProducts();
      } else {
        console.error('Error updating status:', response.data.error);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  
  

  

  const filteredData = products.filter(
    (item) =>
      item.employeeId.includes(filterText) ||
      item.employeeName.toLowerCase().includes(filterText.toLowerCase()) ||
      item.date.includes(filterText) ||
      item.status.toLowerCase().includes(filterText.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startRow = (currentPage - 1) * rowsPerPage;
  const currentData = filteredData.slice(startRow, startRow + rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="d-flex justify-content-between my-3 mx-3">
        <div>
          <h4>Inventory Items</h4>
        </div>
        <form className="d-flex ms-3 " onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <input
              className="form-control"
              type="search"
              placeholder="Search here..."
              aria-label="Search"
              value={filterText}
              onChange={(e) => onFilterChange(e.target.value)}
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
      <div className="table-responsive mx-3">
        <table className="table table-striped border">
          <thead>
            <tr>
              <th className="py-3">S/No</th>
              <th className="py-3">Employee Id</th>
              <th className="py-3">Employee Name</th>
              <th className="py-3">Product</th>
              <th className="py-3">Quantity</th>
              <th className="py-3">Date</th>
              <th className="py-3">Status</th>
            </tr>
          </thead>
       
<tbody>
  {products.map((item,index) => (
    <tr key={item._id}>
         <td>{startRow + index + 1}</td>
      <td>{item.employeeId}</td>
      <td>{item.employeeName}</td>
      <td>{item.productName}</td>
      <td>{item.quantity}</td>
      <td>{new Date(item.date).toLocaleDateString('en-GB')}</td>
      <td>
        <select
          value={item.status}
          onChange={(e) => handleStatusChange(item._id, e.target.value)}
        >
          {statusOptions.map((status, idx) => (
            <option key={idx} value={status}>
              {status}
            </option>
          ))}
        </select>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-3 mx-3">
        <span className="Typography_Heading_H5">
          Showing {startRow + 1} to {startRow + currentData.length} of {filteredData.length} entries
        </span>
        <div>
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i className="bi bi-chevron-left Typography_Heading_H5"></i>
          </button>
          <span className="Typography_Heading_H5">
            {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-outline-secondary ms-2"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <i className="bi bi-chevron-right Typography_Heading_H5"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
