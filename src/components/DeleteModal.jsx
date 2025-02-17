export default function DeleteModal({ isOpen, onClose, onDelete }) {
  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Are you sure you want to delete this task?</h2>
          <div className="form-actions">
            <button onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button onClick={onDelete} className="btn-delete">
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  );
}

