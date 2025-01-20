import React from 'react'
import { Modal, Button } from 'flowbite-react'
import { HiOutlineCurrencyDollar } from "react-icons/hi";

export function ModalClient(props) {

    const { show, size = 'md', title = 'Modal', onClose, onCloseText, onConfirm, onConfirmText } = props

    return (
        <Modal show={show} size={size} onClose={onClose} popup>
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <HiOutlineCurrencyDollar className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        {title}
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button color="info" onClick={onConfirm}>
                            {onConfirmText || 'Aceptar'}
                        </Button>
                        <Button color="success" onClick={onClose}>
                            {onCloseText || 'Cancelar'}
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}
