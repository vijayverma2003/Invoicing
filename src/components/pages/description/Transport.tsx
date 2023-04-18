import { AiOutlineEdit } from "react-icons/ai";
import { AppDispatch } from "../../../store/configureStore";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TransportForm from "../../forms/TransportForm";
import WarningModal from "../../common/WarningModal";
import {
  deleteTransport,
  getTransport,
  loadTransports,
} from "../../../store/entities/transports";

function Transport() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const transport = useSelector(getTransport(id));

  useEffect(() => {
    dispatch(loadTransports());
  }, [dispatch]);

  const handleDelete = () => {
    if (id) dispatch(deleteTransport(id));
    navigate("/transports");
  };

  const handleShowWarning = () => {
    const dialog = document.querySelector<HTMLDialogElement>("#dialog-warning");
    if (dialog) dialog.showModal();
  };

  const handleOpenTransportFormDialog = () => {
    const dialog = document.querySelector<HTMLDialogElement>(
      "#dialog-transport-form"
    );
    if (dialog) dialog.showModal();
  };

  return (
    <>
      <TransportForm transport={transport} />
      <WarningModal
        onClick={handleDelete}
        description="Are you sure that you want to permanently delete this transport?"
      />

      <section className="page">
        <header className="page-header">
          <h4>{transport?.name ?? "Not found"}</h4>

          {transport && (
            <div className="page-header-icons">
              <button
                onClick={handleOpenTransportFormDialog}
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
          {transport ? (
            <>
              <p className="page-content-description">
                <strong>Transporter ID -</strong>{" "}
                {transport.transporter_id
                  ? transport.transporter_id
                  : "Not available"}
              </p>
              <p className="page-content-description">
                <strong>Mode -</strong> {transport.mode}
              </p>
            </>
          ) : (
            <p className="page-content-description">
              The transport with given ID was not found!
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export default Transport;
