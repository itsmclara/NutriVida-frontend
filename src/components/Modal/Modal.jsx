import "./Modal.css";

function Modal({ aberto, onClose, children, className = "" }) {
  if (!aberto) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content ${className}`}
        onClick={(e) => e.stopPropagation()} 
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;