import { AiOutlineLogout } from "react-icons/ai";
import { logout } from "../../services/auth";
import WarningModal from "../common/WarningModal";
import Logo from "../common/Logo";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { useEffect } from "react";
import { getUser, loadUser } from "../../store/user-info/user";
import { getFirm } from "../../store/user-info/firm";
import { Link } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";

function Settings() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(getUser);
  const firm = useSelector(getFirm);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  function handleLogout() {
    logout();
    window.location.href = "/login";
  }

  function openLogoutWarningModal() {
    const dialog = document.querySelector<HTMLDialogElement>("#dialog-warning");
    if (dialog) dialog.showModal();
  }

  return (
    <>
      <WarningModal
        onClick={handleLogout}
        description="Are you sure you want to logout?"
        warning="Logout"
        heading="Logout"
      />

      <section className="page settings">
        <header className="page-header">
          <h4>Settings</h4>
          <div className="page-header-icons">
            <button onClick={openLogoutWarningModal} className="btn-icon">
              <AiOutlineLogout color="red" size={20} />
            </button>
          </div>
        </header>
        <div className="page-content">
          <header className="settings-header">
            <Link to="/firm/logo">
              <Logo className="firm-logo" />
            </Link>
            <div>
              <p>@{user.username}</p>
              <p className="settings-text">{user.email}</p>
            </div>
          </header>

          {firm && (
            <>
              <div className="settings-info-container">
                <header>
                  <h3 className="settings-info-heading">Firm</h3>
                  <Link to="/firm">
                    <MdModeEdit color="black" size={20} />
                  </Link>
                </header>
                <p className="settings-info-description">
                  <strong>Name -</strong> {firm.name}
                </p>
                {firm.address && (
                  <p className="settings-info-description">
                    <strong>Address -</strong> {firm.address?.street}
                    {firm.address?.street ? ", " : ""} {firm.address?.city},{" "}
                    {firm.address?.state},{" "}
                    {typeof firm.address.country !== "string"
                      ? firm.address.country.name
                      : ""}
                  </p>
                )}
              </div>

              {firm.bank && (
                <div className="settings-info-container">
                  <header>
                    <h3 className="settings-info-heading">Bank details</h3>
                    <Link to="/firm/bank">
                      <MdModeEdit color="black" size={20} />
                    </Link>
                  </header>
                  <p className="settings-info-description">
                    <strong>Name -</strong> {firm.bank.name}
                  </p>
                  <p className="settings-info-description">
                    <strong>A/c -</strong> {firm.bank.acc}
                  </p>
                  <p className="settings-info-description">
                    <strong>IFSC -</strong> {firm.bank.ifsc}
                  </p>
                  <p className="settings-info-description">
                    <strong>Branch -</strong> {firm.bank.branch}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default Settings;
