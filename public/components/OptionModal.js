import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (
    <Modal
        isOpen={!!props.selectedOption}
        contentLabel="SelectedOption"
        onRequestClose={props.handleClearSelectedOption}
        closeTimeoutMS={200}
        className="modal"
    >
        <h3 className="modal__header">How About This?</h3>
        <hr className="modal__line" />
        <p className="modal__body">{props.selectedOption}</p>
        <button
            className="modal__button action-button"
            onClick={props.handleClearSelectedOption}
        >
            Okay
        </button>
    </Modal>
);

export default OptionModal;