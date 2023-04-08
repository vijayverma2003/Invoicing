import { AddSVG } from "../common/SVG";
import { AppDispatch } from "../../store/configureStore";
import { getTransports, loadTransports } from "../../store/entities/transports";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import TransportForm from "../forms/TransportForm";

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
      <section className="page transports-page">
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
              <Link
                id={transport.id.toString()}
                key={transport.id}
                to={`/transports/${transport.id}`}
              >
                <div className="list-page-item">
                  <div>
                    <h4 className="list-page-item-heading">{transport.name}</h4>
                    <p className="text-lighter list-page-item-description">
                      {transport.mode}
                    </p>
                  </div>
                  <div>
                    <h4 className="list-page-item-heading text-right">
                      {transport.transporter_id}
                    </h4>
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

export default Transports;
