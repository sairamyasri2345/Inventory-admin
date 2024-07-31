import React, { useState, useEffect } from "react";
import "./product.css";
import ProductModal from "./productModal/productModal";

const Product = ({ onAddProduct, filterText }) => {
  const [show, setShow] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch initial products
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/products");
        const data = await response.json();
        const productsWithDate = data.data.map(product => ({
          ...product,
          date: new Date().toLocaleDateString()
        }));
        setProducts(productsWithDate);
        console.log("GET", response.status, data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleClose = () => {
    setShow(false);
    setEditIndex(null);
  };

  const handleShow = () => setShow(true);

  const handleSave = async (product) => {
    if (editIndex !== null) {
      // Edit existing product
      const productId = products[editIndex]._id;
      try {
        const response = await fetch(`http://localhost:3001/products/${productId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });

        if (!response.ok) {
          throw new Error("Failed to update product");
        }

        const data = await response.json();
        console.log("Put", response.status, data);

        const updatedProducts = [...products];
        updatedProducts[editIndex] = {
          ...data.data,
          date: new Date().toLocaleDateString() 
        };
        setProducts(updatedProducts);
      } catch (error) {
        console.error("Error updating product:", error);
      }
    } else {
      // Add new product
      try {
        const response = await fetch("http://localhost:3001/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...product,
            date: new Date().toLocaleDateString() 
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save product");
        }

        const data = await response.json();
        console.log("post",response.status, data);

        setProducts([
          ...products,
          {
            ...data.data,
            date: new Date().toLocaleDateString() 
          }
        ]);
      } catch (error) {
        console.error("Error saving product:", error);
      }
    }
    handleClose();
  };

  const handleDelete = async (index) => {
    const productId = products[index]._id;
    const deletedProduct = products[index];
    try {
      const response = await fetch(`http://localhost:3001/products/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      console.log("DELETE", response.status, deletedProduct);

      const newProducts = products.filter((_, i) => i !== index);
 
      setProducts(newProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setShow(true);
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div>
      <div className="card m-3">
        <div className="card-body">
          <div className="d-flex justify-content-end">
            <button onClick={handleShow} className="btn btn-success mb-4">
              <i className="bi bi-plus-lg px-2"></i>
              Add Product
            </button>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{product.productName}</td>
                    <td>{product.quantity}</td>
                    <td>{product.date}</td>
                    <td>
                      <button
                        className="btn btn-primary me-2 btn-sm"
                        onClick={() => handleEdit(index)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-danger me-2 btn-sm"
                        onClick={() => handleDelete(index)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ProductModal
        show={show}
        handleClose={handleClose}
        handleSave={handleSave}
        product={editIndex !== null ? products[editIndex] : null}
      />
    </div>
  );
};

export default Product;
