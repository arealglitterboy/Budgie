import React, { useState } from 'react'
import ReactModal from 'react-modal';

import ExpenseForm from './ExpenseForm';

const ModalTest = () => {
    const [isOpen, setModalOpen] = useState(false); 
    ReactModal.setAppElement('#app');

    const onSubmit = () => {
        setModalOpen(false);
    };

    return (
        <>
            <button onClick={() => setModalOpen(true)}>Open Modal</button>
            <ReactModal
                isOpen={isOpen}
                className="modal modal--clear modal--center"
                onClick={(e) => console.log(e)}
            >
                <section className="modal__body">
                    <ExpenseForm
                        onSubmit={onSubmit}
                    />
                </section>
            </ReactModal>
        </>
)};

export default ModalTest
