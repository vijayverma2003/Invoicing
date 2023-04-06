import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../store/configureStore";
import { useEffect } from "react";
import { getProduct, loadProducts } from "../../store/entities/products";
import { AiOutlineEdit } from "react-icons/ai";
import ProductForm from "../forms/ProductForm";

function ProductDescription() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector(getProduct(Number(id)));

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  const handleOpenProductFormDialog = () => {
    const dialog = document.querySelector("dialog");
    if (dialog) dialog.showModal();
  };

  return (
    <>
      <ProductForm product={product} />
      {product && (
        <section id="main-page" className="page">
          <header className="page-header">
            <h4>{product.name}</h4>
            <div className="page-header-icons">
              <button
                onClick={handleOpenProductFormDialog}
                className="btn-icon"
              >
                <AiOutlineEdit size={20} />
              </button>
            </div>
          </header>
          <div className="page-content">
            <p className="page-content-description">
              <strong>Price -</strong> {product.price} /{" "}
              {product.unit.toLowerCase()}
            </p>
            <p className="page-content-description">
              <strong>Tax -</strong> {product.tax}
            </p>
            <p className="page-content-description">
              <strong>HSN -</strong> {product.hsn ?? "Doesn't exists"}
            </p>
          </div>
        </section>
      )}
    </>
  );
}

export default ProductDescription;
