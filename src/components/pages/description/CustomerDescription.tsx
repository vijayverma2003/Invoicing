import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteCustomer,
  getCustomer,
  loadCustomers,
} from "../../../store/entities/customers";
import { AppDispatch } from "../../../store/configureStore";
import CustomerForm from "../../forms/CustomerForm";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import WarningModal from "../../common/WarningModal";

function CustomerDescription() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const customer = useSelector(getCustomer(id));

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
    // window.location.replace("/customers");
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
            </>
          ) : (
            <p className="page-content-description">
              The product with given ID was not found!
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export default CustomerDescription;
