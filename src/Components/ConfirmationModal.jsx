import React from "react";
import ReactModal from "react-modal";
import { FiAlertTriangle } from "react-icons/fi";
const ConfirmationModal = ({
  bodyText,
  isModalOpen,
  setIsModalOpen,
  onClickAction,
}) => {
  return (
    <div className="confirmation-modal">
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <div className="confirm-heading ">
          <div className="confirm-icon">
            <FiAlertTriangle />{" "}
          </div>
          <div> Confirm Action</div>
        </div>

        <div className="horizontal-line" />
        <div className="bottom-wrapper">
          <div className="text-question">
            {`Are you sure you want to ${bodyText} ?`}{" "}
          </div>
          <div className="confirmation-button-wrapper">
            <button className="secondary-btn">Cancel</button>
            <button
              className="primary-btn"
              onClick={() => {
                onClickAction();
                setIsModalOpen(false);
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};
export default ConfirmationModal;
