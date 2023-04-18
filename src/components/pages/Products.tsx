import { AppDispatch } from "../../store/configureStore";
import { getProducts, loadProducts } from "../../store/entities/products";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { Product } from "../../models/products";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProductForm from "../forms/ProductForm";

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
      <section className="page products-page">
        <header className="page-header">
          <h4>Products</h4>
          <div className="page-header-icons">
            <button onClick={handleOpenProductFormDialog} className="btn-icon">
              <IoMdAddCircleOutline size={20} color="black" />
            </button>
          </div>
        </header>

        <div className="page-content page-grid">
          <div>
            {products.map((product) => (
              <Link
                id={product.id!.toString()}
                to={`/products/${product.id}`}
                key={product.id}
              >
                <div className="list-page-item">
                  <div>
                    <h4 className="list-page-item-heading">{product.name}</h4>
                    <p className="text-lighter list-page-item-description">
                      Sales -{" "}
                      {product.invoice_items &&
                        product.invoice_items.reduce(
                          (a, b) => (a += b.price * b.quantity),
                          0
                        )}
                    </p>
                  </div>
                  <div>
                    <h4 className="list-page-item-heading text-right">
                      {product.price}/{product.unit}
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
