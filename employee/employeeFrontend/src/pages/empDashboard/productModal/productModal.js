import React, { useState, useEffect } from "react";
import "./productModal.css";

const EmpProduct = ({
  show,
  handleClose,
  handleApplyProduct,
  productNames,
  employeeId,
  editMode,
  currentProduct
}) => {
  const [productName, setProductName] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (editMode && currentProduct) {
      setEmployeeName(currentProduct.employeeName);
      setProductName(currentProduct.productName);
      setQuantity(currentProduct.quantity);
    } else {
      setEmployeeName("");
      setProductName("");
      setQuantity("");
    }
  }, [editMode, currentProduct]);

  useEffect(() => {
    console.log('Product names in modal:', productNames); // Debug statement
  }, [productNames]);

  const onSave = () => {
    if (parseInt(quantity, 10) <= 0) {
      alert('Quantity must be greater than 0.');
      return;
    }

    const formData = {
      productName,
      employeeName,
      employeeId,
      quantity: parseInt(quantity, 10),
    };

    handleApplyProduct(formData);
  };

  return (
    <div className={`product-container ${show ? "d-flex" : "d-none"}`}>
      <div className="custom-modal-content">
        <div className="custom-modal-header">
          <h4>{editMode ? 'Edit Product' : 'Apply Product'}</h4>
          <span className="custom-modal-close" onClick={handleClose}>
            &times;
          </span>
        </div>
        <div className="custom-modal-body">
          <form>
            <div className="form-group">
              <label>Employee Name</label>
              <input
                type="text"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                placeholder="Enter the Employee Name"
              />
            </div>
            <div className="form-group">
              <label>Product Name</label>
              <select
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                 className="form-select"
              >
                <option value="">Select Product</option>
                {productNames.map((product, index) => (
                  <option key={index} value={product}>
                    {product}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
              />
            </div>
            <div className="d-flex justify-content-end gap-3">
          <button className="btn btn-secondary" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn btn-success" onClick={onSave}>
            {editMode ? 'Update' : 'Submit'}
          </button>
        </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpProduct;
