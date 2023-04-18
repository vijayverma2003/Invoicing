import { AiOutlineEdit } from "react-icons/ai";
import { AppDispatch } from "../../../store/configureStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProductForm from "../../forms/ProductForm";
import WarningModal from "../../common/WarningModal";
import {
  deleteProduct,
  getProduct,
  loadProducts,
} from "../../../store/entities/products";

function Product() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector(getProduct(id));
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  const handleOpenProductFormDialog = () => {
    const dialog = document.querySelector<HTMLDialogElement>(
      "#dialog-product-form"
    );
    if (dialog) dialog.showModal();
  };

  const handleShowWarning = () => {
    const dialog = document.querySelector<HTMLDialogElement>("#dialog-warning");
    if (dialog) dialog.showModal();
  };

  const handleDelete = () => {
    if (id) dispatch(deleteProduct(id));
    navigate("/products");
  };

  return (
    <>
      <ProductForm product={product} />

      <WarningModal
        onClick={handleDelete}
        description="Are you sure that you want to permanently delete this product?"
      />

      <section className="page">
        <header className="page-header">
          <h4>{product?.name ?? "Not found"}</h4>

          {product && (
            <div className="page-header-icons">
              <button
                onClick={handleOpenProductFormDialog}
                className="btn-icon"
              >
                <AiOutlineEdit color="black" size={20} />
              </button>
              <button onClick={handleShowWarning} className="btn-icon">
                <MdDeleteOutline size={20} color="red" />
              </button>
            </div>
          )}
        </header>

        <div className="page-content">
          {product ? (
            <>
              <p className="page-content-description">
                <strong>Price -</strong> {product.price} /{" "}
                {product.unit.toLowerCase()}
              </p>
              <p className="page-content-description">
                <strong>Tax -</strong> {product.tax}%
              </p>
              <p className="page-content-description">
                <strong>HSN -</strong> {product.hsn ?? "Doesn't exists"}
              </p>
            </>
          ) : (
            <p className="page-content-description">
              The product with given ID was not found!
            </p>
          )}

          {product && product.invoice_items && (
            <>
              <h4 className="page-table-heading">Sales of product</h4>
              <table className="page-table">
                <thead>
                  <tr>
                    <th>S No.</th>
                    <th>Price</th>
                    <th>Qty.</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {product.invoice_items?.map((item, index) => (
                    <tr key={item.invoice}>
                      <td>{index + 1}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>{item.quantity * item.price}</td>
                      <td>
                        <Link
                          className="link-primary"
                          to={`/invoices/${item.invoice}`}
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <th>Total</th>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      {product.invoice_items
                        .reduce((a, b) => (a += b.price * b.quantity), 0)
                        .toFixed(1)}
                    </td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>
              <p className="note text-warning">
                Note that product can't be deleted because it is associated with
                one or more invoice items.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default Product;
