import React, { useEffect } from "react";
import { AddSVG } from "../common/SVG";
import TransportForm from "../forms/TransportForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { getTransports, loadTransports } from "../../store/entities/transports";

function Transports() {
  const dispatch = useDispatch<AppDispatch>();
  const transports = useSelector(getTransports);

  useEffect(() => {
    dispatch(loadTransports());
  }, [dispatch]);

  const handleOpenTransportFormDialog = () => {
    const dialog = document.querySelector("dialog");
    if (dialog) dialog.showModal();
  };

  return (
    <>
      <TransportForm />
      <section id="main-page" className="page transports-page">
        <header className="page-header">
          <h4>Transports</h4>
          <div className="page-header-icons">
            <button
              onClick={handleOpenTransportFormDialog}
              className="btn-icon"
            >
              <AddSVG />
            </button>
          </div>
        </header>
        <div className="page-content">
          <div>
            {transports.map((transport) => (
              <div key={transport.id} className="list-page-item">
                <div>
                  <h4 className="list-page-item-heading">Rajesh Kumar</h4>
                  <p className="text-lighter list-page-item-description"></p>
                </div>
                <div>
                  <h4 className="list-page-item-heading text-right">
                    #81H81J01000
                  </h4>
                  <p className="text-lighter list-page-item-description text-right">
                    Road
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

export default Transports;
