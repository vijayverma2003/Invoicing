import { useDispatch, useSelector } from "react-redux";
import { AddSVG } from "../common/SVG";
import ProductForm from "../forms/ProductForm";
import { useEffect } from "react";
import { getProducts, productsRequested } from "../../store/products/slice";
import { Product } from "../../models/products";

function Products() {
  const dispatch = useDispatch();
  const products: Product[] = useSelector(getProducts);

  const handleOpenProductFormDialog = () => {
    const dialog = document.querySelector("dialog");
    if (dialog) dialog.showModal();
  };

  useEffect(() => {
    dispatch(productsRequested(null));
  }, []);

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
              <div key={product.id} className="list-page-item">
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
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Products;
