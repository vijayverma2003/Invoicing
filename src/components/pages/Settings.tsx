import { AiOutlineLogout } from "react-icons/ai";
import { logout } from "../../services/auth";
import WarningModal from "../common/WarningModal";

function Settings() {
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

      <section className="page">
        <header className="page-header">
          <h4>Settings</h4>
          <div className="page-header-icons">
            <button onClick={openLogoutWarningModal} className="btn-icon">
              <AiOutlineLogout color="red" size={20} />
            </button>
          </div>
        </header>
      </section>
    </>
  );
}

export default Settings;
