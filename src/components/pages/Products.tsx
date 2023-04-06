import { useDispatch, useSelector } from "react-redux";
import { AddSVG } from "../common/SVG";
import ProductForm from "../forms/ProductForm";
import { useEffect } from "react";
import { getProducts, loadProducts } from "../../store/entities/products";
import { Product } from "../../models/products";
import { AppDispatch } from "../../store/configureStore";
import { Link } from "react-router-dom";

function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const products: Product[] = useSelector(getProducts);

  const handleOpenProductFormDialog = () => {
    const dialog = document.querySelector("dialog");
    if (dialog) dialog.showModal();
  };

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  return (
    <>
      <ProductForm />
      <section id="main-page" className="page products-page">
        <header className="page-header">
          <h4>Products</h4>
          <div className="page-header-icons">
            <button onClick={handleOpenProductFormDialog} className="btn-icon">
              <AddSVG />
            </button>
          </div>
        </header>
        <div className="page-content page-grid">
          <div>
            {products.map((product) => (
              <Link to={`/products/${product.id}`} key={product.id}>
                <div className="list-page-item">
                  <div>
                    <h4 className="list-page-item-heading">{product.name}</h4>
                    <p className="text-lighter list-page-item-description">
                      Sales - $20,000
                    </p>
                  </div>
                  <div>
                    <h4 className="list-page-item-heading text-right">
                      ${product.price}/{product.unit}
                    </h4>
                    <p className="text-lighter list-page-item-description text-right">
                      Stock - 48
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Products;
