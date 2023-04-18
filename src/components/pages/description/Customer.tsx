import { AiOutlineEdit } from "react-icons/ai";
import { AppDispatch } from "../../../store/configureStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CustomerForm from "../../forms/CustomerForm";
import WarningModal from "../../common/WarningModal";
import {
  deleteCustomer,
  getCustomer,
  getFailedRequestError,
  loadCustomers,
} from "../../../store/entities/customers";

function Customer() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const customer = useSelector(getCustomer(id));
  const failedAPIRequestError = useSelector(getFailedRequestError);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadCustomers());
  }, [dispatch]);

  const handleOpenCustomerFormDialog = () => {
    const dialog = document.querySelector<HTMLDialogElement>(
      "#dialog-customer-form"
    );
    if (dialog) dialog.showModal();
  };

  const handleShowWarning = () => {
    const dialog = document.querySelector<HTMLDialogElement>("#dialog-warning");
    if (dialog) dialog.showModal();
  };

  const handleDelete = () => {
    if (id) dispatch(deleteCustomer(id));

    if (failedAPIRequestError) {
      const dialog =
        document.querySelector<HTMLDialogElement>("#dialog-warning");
      if (dialog) dialog.close();
      return;
    }
    navigate("/customers");
  };

  return (
    <>
      <CustomerForm customer={customer} />

      <WarningModal
        onClick={handleDelete}
        description="Are you sure that you want to permanently delete this customer?"
      />

      <section className="page">
        <header className="page-header">
          <h4>{customer?.name ?? "Not found"}</h4>

          {customer && (
            <div className="page-header-icons">
              <button
                onClick={handleOpenCustomerFormDialog}
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
          {failedAPIRequestError && (
            <p className="alert">{failedAPIRequestError.error}</p>
          )}
          {customer ? (
            <>
              <p className="page-content-description">
                <strong>Phone -</strong> {customer.phone}
              </p>
              <p className="page-content-description">
                <strong>Email -</strong> {customer.email}
              </p>
              <p className="page-content-description">
                <strong>Street Address -</strong>{" "}
                {customer.street ?? "Doesn't exists"}
              </p>
              <p className="page-content-description">
                <strong>City -</strong> {(customer.city, customer.state)},{" "}
                {typeof customer.country !== "string"
                  ? customer.country.name
                  : ""}
              </p>
              <p className="page-content-description">
                <strong>Number of Invoices -</strong>{" "}
                {customer.invoices ? customer.invoices?.length : 0}
              </p>
            </>
          ) : (
            <p className="page-content-description">
              The product with given ID was not found!
            </p>
          )}

          {customer && customer.invoices && customer.invoices.length > 0 && (
            <>
              <h4 className="page-table-heading">Customer's invoices</h4>
              <table className="page-table">
                <thead>
                  <tr>
                    <th>INV</th>
                    <th>Date</th>
                    <th>Sale</th>
                  </tr>
                </thead>
                <tbody>
                  {customer.invoices?.map((invoice) => (
                    <tr key={invoice.id}>
                      <td>
                        <Link
                          className="link-primary"
                          to={`/invoices/${invoice.id}`}
                        >
                          {invoice.number}
                        </Link>
                      </td>
                      <td>{invoice.date}</td>
                      <td>{invoice.total_cost + invoice.total_tax}</td>
                    </tr>
                  ))}
                  <tr>
                    <th>Total</th>
                    <td>-</td>
                    <td>
                      {customer.invoices
                        .reduce((a, b) => (a += b.total_cost), 0)
                        .toFixed(1)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default Customer;
