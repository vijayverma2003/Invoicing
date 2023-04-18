import { AiOutlineEdit } from "react-icons/ai";
import { AppDispatch } from "../../../store/configureStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import WarningModal from "../../common/WarningModal";
import {
  deleteInvoice,
  getFailedRequestError,
  getInvoice,
  loadInvoices,
} from "../../../store/entities/invoices";

function Invoice() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const failedAPIRequestError = useSelector(getFailedRequestError);
  const invoice = useSelector(getInvoice(id));
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadInvoices());
  }, [dispatch]);

  const handleShowWarning = () => {
    const dialog = document.querySelector<HTMLDialogElement>("#dialog-warning");
    if (dialog) dialog.showModal();
  };

  const handleDelete = () => {
    if (id) dispatch(deleteInvoice(id));
    if (failedAPIRequestError) {
      const dialog =
        document.querySelector<HTMLDialogElement>("#dialog-warning");
      if (dialog) dialog.close();
      return;
    }
    navigate("/invoices");
  };
  return (
    <>
      <WarningModal
        onClick={handleDelete}
        description="Are you sure that you want to permanently delete this invoice?"
      />
      <section className="page">
        <header className="page-header">
          <h4>{invoice?.number ? `INV-${invoice.number}` : "Not found"}</h4>

          {invoice && (
            <div className="page-header-icons">
              <Link
                to={`/invoices/create?id=${invoice.id}`}
                className="btn-icon"
              >
                <AiOutlineEdit color="black" size={20} />
              </Link>
              <button onClick={handleShowWarning} className="btn-icon">
                <MdDeleteOutline size={20} color="red" />
              </button>
            </div>
          )}
        </header>

        <div className="page-content">
          {failedAPIRequestError && (
            <p className="alert">{failedAPIRequestError.error}</p>
          )}
          {invoice ? (
            <>
              <p className="page-content-description">
                <strong>Date -</strong> {invoice.date}
              </p>
              <p className="page-content-description">
                <strong>Street Address -</strong> {invoice.due_date}
              </p>
              {typeof invoice.customer !== "string" && (
                <p className="page-content-description">
                  <strong>Customer -</strong> {invoice.customer.name}
                </p>
              )}
              <p className="page-content-description">
                <strong>Total -</strong> {invoice.total_cost}
              </p>
              <p className="page-content-description">
                <strong>Total Tax -</strong> {invoice.total_tax}
              </p>
            </>
          ) : (
            <p className="page-content-description">
              The invoice with given ID was not found!
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export default Invoice;
