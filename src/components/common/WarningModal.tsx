import { useRef } from "react";

interface Props {
  description: string;
  warning?: string;
  onClick: () => void;
}

function WarningModal({ description, warning = "Delete", onClick }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <dialog id="dialog-warning" ref={dialog}>
      <div className="dialog-warning">
        <p className="dialog-description">{description}</p>
        <div className="dialog-warning-buttons">
          <button onClick={onClick} className="btn-danger">
            {warning}
          </button>
          <button
            onClick={() => dialog.current?.close()}
            className="btn-primary"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default WarningModal;
