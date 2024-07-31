import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './orderList.css';
import axios from 'axios';

const Order = ({ filterText, onFilterChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const rowsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const employeeId = localStorage.getItem('employeeId');

        if (!employeeId) {
          throw new Error('Employee ID not found in localStorage');
        }

        const response = await axios.get(`http://localhost:3003/appliedProducts?employeeId=${employeeId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setData(response.data);
        } else {
          console.error('Failed to fetch products:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    console.log('Current data state:', data); 
  }, [data]);

  if (!data || !Array.isArray(data)) {
    return <div>Loading...</div>; 
  }

  const filteredData = data.filter((item) =>
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
      <div className="table-responsive mx-3 my-4">
        <table className="table table-striped bordertable-responsive ">
          <thead>
            <tr>
              <th className='py-3'>S/No</th>
              <th className='py-3'>Employee Id</th>
              <th className='py-3'>Employee Name</th>
              <th className='py-3'>Product</th>
              <th className='py-3'>Quantity</th>
              <th className='py-3'>Date</th>
              <th className='py-3'>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={item._id}>
                <td>{startRow + index + 1}</td>
                <td>{item.employeeId}</td>
                <td>{item.employeeName}</td>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
                <td>{item.date}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-container d-flex justify-content-end my-3 mx-3">
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index + 1} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Order;
