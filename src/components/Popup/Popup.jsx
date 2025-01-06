function Popup({ message, buttons = [], onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <p className="popup-message">{message}</p>
        <div className="popup-buttons">
          {buttons.length > 0 ? (
            buttons.map((button, index) => (
              <button
                key={index}
                className="popup-button"
                onClick={button.onClick}
              >
                {button.text}
              </button>
            ))
          ) : (
            <button className="popup-close-button" onClick={onClose}> Close </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Popup;
