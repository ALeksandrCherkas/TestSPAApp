import { BsFillTrashFill } from "react-icons/bs";
const Modal = ({isOpen, onClose, onConfirm, itemName}) => {
    if(!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>X</button>
                <h2 className="modal__header">Вы уверены, что хотите удалить этот приход?</h2>
                <div className="modal__info">
                    <p>Название: {itemName}</p>
                </div>
                <div className="modal-buttons">
                    <button className="cancel-btn" onClick={onClose}>отменить</button>
                    <button className="confirm-btn" onClick={onConfirm}><BsFillTrashFill /> удалить</button>
                </div>
            </div>
        </div>
    )

}

export default Modal;