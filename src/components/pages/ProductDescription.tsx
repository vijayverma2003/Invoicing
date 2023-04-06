import { AiOutlineEdit } from "react-icons/ai";
import { AppDispatch } from "../../store/configureStore";
import {
  deleteProduct,
  getProduct,
  loadProducts,
} from "../../store/entities/products";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../forms/ProductForm";
import WarningModal from "../common/WarningModal";

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

  const handleShowWarning = () => {
    const dialog = document.querySelector<HTMLDialogElement>("#dialog-warning");
    if (dialog) dialog.showModal();
  };

  const handleDelete = () => {
    if (id) dispatch(deleteProduct(id));
    window.location.replace("/products");
  };

  return (
    <>
      <ProductForm product={product} />
      <WarningModal
        onClick={handleDelete}
        description="Are you sure that you want to permanently delete this product?"
      />
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
              <button onClick={handleShowWarning} className="btn-icon">
                <MdDeleteOutline size={20} color="red" />
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
