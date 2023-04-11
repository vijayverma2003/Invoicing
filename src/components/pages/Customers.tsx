import { AppDispatch } from "../../store/configureStore";
import { getCustomers, loadCustomers } from "../../store/entities/customers";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CustomerForm from "../forms/CustomerForm";

function Customers(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const customers = useSelector(getCustomers);

  useEffect(() => {
    dispatch(loadCustomers());
  }, [dispatch]);

  const handleOpenCustomerFormDialog = () => {
    const dialog = document.querySelector("dialog");
    if (dialog) dialog.showModal();
  };

  return (
    <>
      <CustomerForm />
      <section className="page products-page">
        <header className="page-header">
          <h4>Customers</h4>
          <div className="page-header-icons">
            <button onClick={handleOpenCustomerFormDialog} className="btn-icon">
              <IoMdAddCircleOutline size={20} color="black" />
            </button>
          </div>
        </header>
        <div className="page-content page-grid">
          <div>
            {customers.map((customer) => (
              <Link
                to={`/customers/${customer.id}`}
                key={customer.id}
                className="list-page-item"
              >
                <div>
                  <h4 className="list-page-item-heading">{customer.name}</h4>
                  <p className="text-lighter list-page-item-description">
                    {customer.email}
                  </p>
                </div>
                <div>
                  <h4 className="list-page-item-heading text-right">
                    {customer.phone}
                  </h4>
                  <p className="text-lighter list-page-item-description text-right">
                    {(customer.street ? customer.street + ", " : "") +
                      `${customer.city}, ${customer.state}, ${
                        typeof customer.country !== "string"
                          ? customer.country.name
                          : ""
                      }`}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Customers;
