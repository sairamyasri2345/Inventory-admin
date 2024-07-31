import React, { useState, useEffect } from 'react';
import EmpProduct from './productModal/productModal';
import axios from 'axios';

const EmployeeDashboard = ({ filterText }) => {
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [appliedProducts, setAppliedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productNames, setProductNames] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      fetch("http://localhost:3003/layout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            setEmployeeId(data.data.email);
          } else {
            console.error("Error fetching user data:", data.error);
          }
        });
    }
  }, []);

  useEffect(() => {
    const fetchAppliedProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/appliedProducts/${employeeId}`);
        if (response.status === 200) {
          setAppliedProducts(response.data);
        } else {
          console.error('Error fetching applied products:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching applied products:', error);
      }
    };

    if (employeeId) {
      fetchAppliedProducts();
    }
  }, [employeeId]);

  useEffect(() => {
    const fetchProductNames = async () => {
      try {
        const response = await axios.get('http://localhost:3001/products');
        console.log('Response data:', response.data); 
        if (response.data && Array.isArray(response.data.data)) {
          setProductNames(response.data.data.map(product => product.productName));
        } else {
          console.error('Expected an array in response.data.data but got:', response.data);
        }
      } catch (error) {
        console.error('Error fetching product names:', error);
      }
    };

    fetchProductNames();
  }, []);

  useEffect(() => {
    if (filterText) {
      const filtered = appliedProducts.filter(product =>
        product.productName?.toLowerCase().includes(filterText.toLowerCase()) ||
        product.employeeId?.toLowerCase().includes(filterText.toLowerCase()) ||
        product.employeeName?.toLowerCase().includes(filterText.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(appliedProducts);
    }
  }, [appliedProducts, filterText]);

  const handleClose = () => {
    setShow(false);
    setEditMode(false);
    setCurrentProduct(null);
  };

  const handleShow = () => setShow(true);

  const handleApplyProduct = async (formData) => {
    try {
      let response;
      if (editMode) {
        response = await axios.put(`http://localhost:3003/updateProduct/${currentProduct._id}`, formData);
        setAppliedProducts(appliedProducts.map(product => product._id === currentProduct._id ? response.data : product));
      } else {
        response = await axios.post('http://localhost:3003/applyProduct', formData);
        setAppliedProducts([...appliedProducts, response.data]);
      }
      handleClose();
    } catch (error) {
      console.error('Error applying product:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3003/deleteProduct/${id}`);
      setAppliedProducts(appliedProducts.filter(product => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setEditMode(true);
    setShow(true);
  };

  return (
    <div>
      <div className="d-flex justify-content-end mx-3 my-3">
        <button onClick={handleShow} className="btn btn-success mb-4">
          <i className="bi bi-plus-lg px-2"></i>
          Apply Product
        </button>
      </div>
      <div className="table-responsive mx-3 my-3">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.employeeId}</td>
                <td>{product.employeeName}</td>
                <td>{product.productName}</td>
                <td>{product.quantity}</td>
                <td>{new Date(product.date).toLocaleDateString('en-GB')}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm mx-1"
                    onClick={() => handleEdit(product)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-sm mx-1"
                    onClick={() => handleDelete(product._id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EmpProduct
        show={show}
        handleClose={handleClose}
        handleApplyProduct={handleApplyProduct}
        productNames={productNames}
        employeeId={employeeId}
        editMode={editMode}
        currentProduct={currentProduct}
      />
    </div>
  );
};

export default EmployeeDashboard;
