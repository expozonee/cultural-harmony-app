import "./Popup.css";

function Popup({
  message,
  onConfirm,
  onCancel,
  hasCloseButton,
  hasConfirmButtons,
}) {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        {hasCloseButton && (
          <button
            className="popup-close-button"
            onClick={onCancel}
            aria-label="Close"
          >
            ×
          </button>
        )}
        <p className="popup-message">{message}</p>
        {!hasConfirmButtons && (
          <div className="popup-actions">
            <button className="popup-confirm-button" onClick={onConfirm}>
              Yes
            </button>
            <button className="popup-cancel-button" onClick={onCancel}>
              No
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Popup;
